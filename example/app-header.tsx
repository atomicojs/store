import { c, css } from "atomico";
import { Button, Dropdown } from "formilk";
import { Cart } from "./app-cart";
import Store from "./store";
import { useStore } from "../src/hooks";
import tokens from "formilk/tokens";

function appHeader() {
  const store = useStore(Store);
  return (
    <host shadowDom>
      <svg xmlns="http://www.w3.org/2000/svg" width="81" height="30" staticNode>
        <path
          d="M2.5 0A2.5 2.5 0 0 1 5 2.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 2.5 0ZM25 5a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5m0-5a10 10 0 1 1-10 10A10 10 0 0 1 25 0Z"
          fill="#fd2c88"
        />
        <g fill="#fd2c88">
          <path d="M48 30h-5a2.5 2.5 0 0 1 0-5h5a5.006 5.006 0 0 0 5-5v-3.125A8.532 8.532 0 0 0 56.5 10c0-.166 0-.334-.014-.5h1.5c.014.174.014.342.014.5v10a10.012 10.012 0 0 1-10 10Z" />
          <path d="M48 5a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5m0-5a10 10 0 1 1-10 10A10 10 0 0 1 48 0Z" />
        </g>
        <path
          d="M71 5a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5m0-5a10 10 0 1 1-10 10A10 10 0 0 1 71 0ZM12 17.5A2.5 2.5 0 0 1 9.5 20h-7a2.5 2.5 0 0 1 0-5h7a2.5 2.5 0 0 1 2.5 2.5Z"
          fill="#fd2c88"
        />
      </svg>
      <div class="app-header_actions">
        <strong>
          {store.state.total ? `Total: $ ${store.state.total}` : ""}
        </strong>
        <Button rounded href="https://github.com/atomicojs/store">
          Github
        </Button>
        <Dropdown showWithOver>
          <Button slot="action" color="primary" rounded>
            Cart (
            {Object.values(store.state.cart).reduce(
              (currentTotal, { total }) => currentTotal + total,
              0
            )}
            )
          </Button>
          <Cart></Cart>
        </Dropdown>
      </div>
    </host>
  );
}

appHeader.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10%;
      box-sizing: border-box;
    }
    .app-header_actions {
      display: flex;
      gap: var(--size-s);
      align-items: center;
    }
  `,
];

export const AppHeader = c(appHeader);

customElements.define("app-header", AppHeader);
