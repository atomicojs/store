import { c } from "atomico";
import { createStore, useStore } from "../../src";

const CounterStore = createStore({ counter: 0 });

const CounterApp = c(
  ({ counter }) => {
    return (
      <host shadowDom>
        <CounterStore state={{ counter }}>
          <slot />
        </CounterStore>
      </host>
    );
  },
  {
    props: { counter: { type: Number, value: 0 } },
  }
);

const CounterValue = c(() => {
  const store = useStore(CounterStore);
  return (
    <host>
      <h1>counter:{store?.counter}</h1>
    </host>
  );
});

const CounterIncrement = c(() => {
  const store = useStore(CounterStore);
  return (
    <host>
      <button onclick={() => store.counter++}>
        Increment({store?.counter} + 1)
      </button>
    </host>
  );
});

customElements.define("counter-store", CounterStore);
customElements.define("counter-app", CounterApp);
customElements.define("counter-increment", CounterIncrement);
customElements.define("counter-value", CounterValue);
