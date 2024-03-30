import { c } from "atomico";
import { createStore, useStore } from ".";

function actionCheck(state: { id: number }) {}

const Store = createStore({
  id: 0,
  checked: false,
});

const List = c(() => {
  const { state } = useStore(Store);

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
