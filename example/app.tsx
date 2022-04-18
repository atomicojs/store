import { css, c, useEffect } from "atomico";
import Store from "./store";
import {
  useActionObserver,
  useCloneStore,
  useStoreProvider,
} from "../src/hooks";
import { Button, Scroll, Dropdown } from "formilk";
import tokens from "formilk/tokens";
import { Product } from "./components/product";
import { Cart } from "./components/cart";

function app() {
  const store = useCloneStore(Store, {
    api: "https://gist.githubusercontent.com/UpperCod/88f8ca5d8a43a59632124ebaf3aa08df/raw/db019d98c63d7310e8fb1444eb45cc1ffd46c698/canopy.json",
    cart: {},
    products: [],
  });

  useStoreProvider(store);

  const [actionGet, status] = useActionObserver(store.actions.get);

  useEffect(actionGet, []);

  return (
    <host shadowDom>
      <header class="app-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="30"
          staticNode
        >
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
      </header>
      <Scroll>
        <div class="app-grid">
          {store.state.products.map((product) => (
            <Product
              title={product.name}
              image={product.image}
              uid={product.id}
              price={product.price}
              onIncrement={() => {
                store.actions.calc({
                  id: product.id,
                  value: 1,
                });
              }}
              disabled={!!store.state.cart?.[product.id]?.disabled}
              loading={!!store.state.cart?.[product.id]?.loading}
            ></Product>
          ))}
        </div>
      </Scroll>
    </host>
  );
}

app.styles = [
  tokens,
  css`
    :host {
      display: grid;
      position: relative;
      height: 100%;
      grid-template: 80px 1fr/ 1fr;
    }
    .app-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10%;
      box-sizing: border-box;
    }
    .app-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--size-s);
      padding: 0px 10%;
      box-sizing: border-box;
    }
    .app-header_actions {
      display: flex;
      gap: var(--size-s);
    }
  `,
];

customElements.define("my-app", c(app));
