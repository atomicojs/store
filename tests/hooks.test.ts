import { describe, it, expect } from "vitest";
import { createHooks } from "atomico/test-hooks";
import { Store } from "../src/store";
import { useStore, useActionObserver, useActionFromForm } from "../src/hooks";
import { useRef } from "atomico";

describe("context", () => {
  it("context", () => {
    const hostParent = document.createElement("div");
    const hooksParent = createHooks(() => {}, hostParent);

    const hostChild = document.createElement("div");
    const hooksChild = createHooks(() => {}, hostChild);

    hostParent.appendChild(hostChild);

    const store = new Store({ count: 0 });

    const scopeStore = hooksParent.load(() =>
      useStore(store, {
        count: 1,
      })
    );

    hooksParent.cleanEffects()();

    expect(hooksChild.load(() => useStore(store))).toEqual(scopeStore);
  });
});

describe("useActionObserver", () => {
  it("cycle", async () => {
    const values = [];
    const valuesExpect = ["", "pending", "fulfilled"];

    let lastCycle: Promise<any>;

    const spy = () => {
      const cycle = store.actions.increment();

      lastCycle = cycle;

      return cycle;
    };

    const load = () => {
      const [action, status] = useActionObserver(spy);
      values.push(status);
      return action;
    };

    const hooks = createHooks(() => {
      hooks.load(load);
    });

    const store = new Store(
      { count: 0 },
      {
        actions: {
          async increment({ count }) {
            await new Promise((resolve) => setTimeout(resolve, 50)); //TICK
            return { count: count + 1 };
          },
        },
      }
    );

    const action = hooks.load(load);

    action(null);
    action(null); // concurrency lock
    action(null); // concurrency lock

    hooks.cleanEffects()();

    await lastCycle;

    expect(values).toEqual(valuesExpect);
  });
});

describe("useActionFromForm", () => {
  it("cycle", async () => {
    const values = [];
    const valuesExpect = ["", "pending", "fulfilled"];

    const hooks = createHooks(() => {
      hooks.load(load);
    });

    const form = document.createElement("form");

    const store = new Store(
      { loading: false },
      {
        actions: {
          send(state, form: HTMLFormElement) {},
        },
      }
    );

    let firstCycle: Promise<any>;

    const spy = (form: HTMLFormElement) => {
      const cycle = store.actions.send(form);

      firstCycle = firstCycle || cycle;

      return cycle;
    };

    const load = () => {
      const ref = useRef(form);
      const [status, action] = useActionFromForm(ref, spy);
      values.push(status);
      return action;
    };

    const action = hooks.load(load);

    hooks.cleanEffects()();

    form.dispatchEvent(new Event("submit"));
    action(form); // concurrency lock

    await firstCycle;

    expect(values).toEqual(valuesExpect);
  });
});
