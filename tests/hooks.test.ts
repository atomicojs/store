import { describe, it, expect } from "vitest";
import { createHooks } from "atomico/test-hooks";
import { useStore, createStore } from "../src/core";

describe("useStore", () => {
  it("Case 1", () => {
    const host = document.createElement("div");
    const update = () => {};
    const hooks = createHooks(update, host);
    const store = createStore(0);

    const result = hooks.load(() => useStore(store));

    expect(result.state).toEqual(0);
  });

  it("Case 2, context", () => {
    const host = document.createElement("div");
    const parent = document.createElement("div");

    parent.append(host);

    const update = () => {};
    const hooksParent = createHooks(update, parent);
    const hooksChild = createHooks(update, host);
    const store = createStore(0);

    const resultParent = hooksParent.load(() => useStore(store, () => 2));

    const resultChild = hooksChild.load(() => useStore(store));

    expect(resultChild.state).toEqual(resultParent.state);

    expect(store.state).toEqual(0);
  });
});
