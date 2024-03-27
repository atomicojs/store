import { Type, c, Any, useMemo } from "atomico";
import { useProvider, useConsumer, useContext } from "atomico/src/context";

export const useStore = (Store) => {
  return useContext(Store);
};

interface ActionCollection<State> {
  [index: string | symbol]: (...args: any[]) => (state: State) => State;
}

const createStore = <State extends any, Actions = ActionCollection<State>>(
  state: State,
  actions: Actions
) => {
  const proxy = {};
  for (const prop in actions) {
    const action = actions[prop];
    proxy[prop] = (argument) => {
      const result = action(argument);
    };
  }
  const Store = c(
    ({ state, actions }) => {
      const context = useMemo(
        () => [state, actions] as [State, Actions],
        [state, actions]
      );
      useProvider(Store, context);
      return <host></host>;
    },
    {
      props: {
        state: {
          type: Any,
          value: state,
        },
        actions: {
          type: Object,
          value: actions,
        },
        value: {
          type: Object,
          event: { type: "UpdatedValue" },
        },
      },
      base: class extends HTMLElement {
        static state = state;
        static actions = actions;
      },
    }
  );

  return Store;
};

const MyStore = createStore<{ list: string[] }>(
  { list: [] },
  {
    add: (value: string) => (state) => ({ ...state, list: [value] }),
  }
);

const MyApp = c(() => {
  return (
    <host>
      <MyStore
        state={{
          list: [],
        }}
        actions={{
          increment: (value) => (state) => ({ ...state, ...value }),
        }}
      >
        <div></div>
      </MyStore>
    </host>
  );
});

customElements.define("my-store", MyStore);
