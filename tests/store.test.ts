import { expect } from "@esm-bundle/chai";
import { Store } from "../src/store";

describe("Store", () => {
  it("case 1: initialState as object", () => {
    const initialState = {
      count: 1,
    };
    const store = new Store(initialState);

    expect(store.state.count).to.deep.equal(initialState.count);

    store.state.count = 100;

    expect(store.state.count).to.deep.equal(initialState.count);
  });

  it("case 2: initialState as function", () => {
    const initialState = () => ({
      count: 1,
    });
    const store = new Store(initialState);

    expect(store.state.count).to.deep.equal(initialState().count);

    store.state.count = 100;

    expect(store.state.count).to.deep.equal(initialState().count);
  });

  it("case 3: getters", () => {
    const initialState = {
      count: 1,
    };

    const getters = {
      double: ({ count }) => count * 2,
    };

    const store = new Store(initialState, {
      getters,
    });

    expect(store.state.double).to.deep.equal(getters.double(initialState));
  });

  it("case 4: action async", async () => {
    const initialState = {
      count: 1,
    };

    const store = new Store(initialState, {
      actions: {
        increment({ count }) {
          return {
            count: count + 1,
          };
        },
      },
    });

    expect(store.state.count).to.equal(1);

    await store.actions.increment();

    expect(store.state.count).to.equal(2);

    await store.actions.increment();
    await store.actions.increment();
    await store.actions.increment();

    expect(store.state.count).to.equal(5);
  });

  it("case 5: action async * and on", async () => {
    const initialState = {
      count: 0,
    };

    const states = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9];

    const store = new Store(initialState, {
      actions: {
        *increment({ count }, steps) {
          for (let i = 0; i < steps; i++) {
            yield { count: i };
          }

          return {
            ...(yield),
          };
        },
      },
    });

    store.on(({ count }) => {
      expect(count).to.equal(states.shift());
    });

    await store.actions.increment(10);
  });

  it("case 6: .clone()", async () => {
    const initialState = {
      count: 0,
    };

    const store = new Store(initialState);

    expect(store.clone()).to.instanceOf(Store);
  });

  it("case 7: .clone()", async () => {
    const initialState = {
      count: 0,
    };

    const store = new Store(initialState);

    const store2 = store.clone({ count: 10 });

    expect(store2.state.count).to.equal(10);
  });
});
