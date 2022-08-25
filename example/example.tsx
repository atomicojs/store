import { c, css } from "atomico";
import { createStore, useStore, useAction } from "../src/core";

const rootStore = createStore(0, {
  async increment(value) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return value + 100;
  },
});

function parent() {
  const { state, actions } = useStore(rootStore, (state) => state);

  const action = useAction(actions.increment);

  return (
    <host shadowDom>
      {state}
      <button onclick={action}>Click {action.loading && `⌛`}</button>
      <slot></slot>
    </host>
  );
}
parent.styles = css`
  :host {
    border: 1px solid red;
    padding: 2rem;
    display: grid;
  }
`;

function child() {
  const store = useStore(rootStore);

  return (
    <host shadowDom>
      {store.state}
      <button onclick={store.actions.increment}>Click</button>
    </host>
  );
}

child.styles = css`
  :host {
    background: #f1f1f9;
    padding: 1rem;
    border: 1px solid black;
  }
`;

customElements.define("c-parent", c(parent));
customElements.define("c-child", c(child));
