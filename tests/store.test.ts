import { describe, it, expect, vi } from "vitest";
import { createStore } from "../src/core";

describe("Store", () => {
  it("case 1: initialState as object", () => {
    const initialState = 0;

    const store = createStore(0);

    expect(store.state).toEqual(initialState);

    const fn = vi.fn().mockReturnValueOnce(100);

    const off = store.on(fn);

    store.state = 100;

    expect(store.state).toEqual(100);

    expect(fn.mock.calls).toEqual([[100]]);

    off();

    store.state = 101;

    expect(fn.mock.calls).toEqual([[100]]);
  });

  it("case 2: sync", async () => {
    const store = createStore(1, {
      increment(state) {
        return state + 1;
      },
    });

    expect(store.state).toEqual(1);

    const fn = vi.fn().mockReturnValueOnce(100);

    store.on(fn);

    store.actions.increment();

    expect(store.state).toEqual(2);

    store.actions.increment();
    store.actions.increment();
    store.actions.increment();

    expect(store.state).toEqual(5);

    expect(fn.mock.calls).toEqual([[2], [3], [4], [5]]);
  });

  it("case 3: action async", async () => {
    const store = createStore(
      { value: 0 },
      {
        async increment(state) {
          return { value: 100 };
        },
      }
    );

    await store.actions.increment();

    expect(store.state).toEqual({ value: 100 });
  });

  it("case 4: action async*", async () => {
    const store = createStore(0, {
      async *increment(state) {
        yield 1;
        yield 2;
        yield 3;
        return 4;
      },
    });

    const fn = vi.fn();

    store.on(fn);

    await store.actions.increment();

    expect(fn.mock.calls).toEqual([[1], [2], [3], [4]]);
  });
});
