import { c, css } from "atomico";
import Store from "./store";
import { useStore } from "../src/hooks";
import { Product } from "./components/product";
import tokens from "formilk/tokens";

function appProducts() {
  const store = useStore(Store);
  return (
    <host shadowDom>
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
    </host>
  );
}

appProducts.styles = [
  tokens,
  css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--size-s);
      padding: 0px 10%;
      box-sizing: border-box;
    }
  `,
];

export const AppProducts = c(appProducts);

customElements.define("app-products", AppProducts);
