import { useEffect } from "atomico";
import { expect } from "@esm-bundle/chai";
import { createHooks } from "atomico/test-hooks";
import { Store } from "../src/store";
import {
  useStoreProvider,
  useStoreConsumer,
  useActionObserver,
} from "../src/hooks";

describe("useStoreProvider and useStoreConsumer", () => {
  it("context", () => {
    const hostParent = document.createElement("div");
    const hooksParent = createHooks(() => {}, hostParent);

    const hostChild = document.createElement("div");
    const hooksChild = createHooks(() => {}, hostChild);

    hostParent.appendChild(hostChild);

    const store = new Store({ count: 0 });

    hooksParent.load(() => {
      useStoreProvider(store);
    });

    hooksParent.cleanEffects()();

    expect(hooksChild.load(() => useStoreConsumer())).to.equal(store);
  });
});

describe("useActionObserver", () => {
  it("cycle", async () => {
    const values = [];
    const valuesExpect = ["", "pending", "fulfilled"];

    const load = () => {
      const [action, status] = useActionObserver(store.actions.increment);
      useEffect(action, []);
      values.push(status);
    };

    const hooks = createHooks(() => {
      hooks.load(load);
    });

    const store = new Store(
      { count: 0 },
      {
        actions: {
          increment({ count }) {
            return { count: count + 1 };
          },
        },
      }
    );

    hooks.load(load);

    hooks.cleanEffects()();

    await new Promise((resolve) => setTimeout(resolve, 50)); //TICK

    expect(values).to.deep.equal(valuesExpect);
  });
});
