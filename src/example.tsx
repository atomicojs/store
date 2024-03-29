import { c } from "atomico";
import { createStore, useStore } from ".";

interface StateTodo {
  checked: boolean;
  key: number;
  label: string;
  loading?: boolean;
}
interface State {
  list: StateTodo[];
}

const Store = createStore({ list: [] } as State, {
  async *update(next: StateTodo) {
    yield ({ list }) => ({
      list: list.map((prev) =>
        prev.key === next.key
          ? {
              loading: true,
              ...next,
            }
          : prev
      ),
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return ({ list }) => ({
      list: list.map((prev) => (prev.key === next.key ? next : prev)),
    });
  },
});

const List = c(() => {
  const { state, actions } = useStore(Store);
  return (
    <host shadowDom>
      <li>
        {state.list.map(({ checked, label, key, loading }) => (
          <ol>
            <label key={key}>
              {label} {loading && "(Loading...)"}
              <input
                type="checkbox"
                checked={checked}
                disabled={loading}
                onchange={() => {
                  actions.update({
                    checked: !checked,
                    label,
                    key,
                  });
                }}
              />
            </label>
          </ol>
        ))}
      </li>
    </host>
  );
});

const App = c(() => {
  return (
    <host shadowDom>
      <Store
        state={{
          list: [
            {
              key: Date.now(),
              label: "First task",
              checked: false,
            },
            {
              key: Date.now() + 1,
              label: "Second task",
              checked: false,
            },
          ],
        }}
      >
        <List />
      </Store>
    </host>
  );
});

customElements.define("todo-store", Store);
customElements.define("todo-app", App);
customElements.define("todo-list", List);
