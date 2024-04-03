import { describe, it, expect } from "vitest";
import { createHooks } from "atomico/test-hooks";
import { createStore } from "../src/core";

describe("createStore", () => {
  it("Case subscribe", () => {
    const store = createStore({ count: 0 });

    store.subscribe((state) => expect(state.count).equal(store.state.count));

    store.state.count++;
  });
  it("Case unsubscribe", () => {
    const store = createStore({ count: 0 });

    const unsubscribe = store.subscribe((state) =>
      expect(state.count).equal(store.state.count)
    );

    store.state.count++;

    unsubscribe();

    store.state.count++;
  });
});
