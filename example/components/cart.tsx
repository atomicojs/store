import { c, css } from "atomico";
import Store from "../store";
import { useStoreConsumer } from "../../src/hooks";
import { ProductThumb } from "./product-thumb";
import { Scroll } from "formilk";
import tokens from "formilk/tokens";

function cart() {
  const store = useStoreConsumer<typeof Store>();

  return (
    <host shadowDom>
      <div class="cart-products">
        <Scroll>
          <div class="cart-products_grid">
            {Object.entries(store.state.cart).map(
              ([id, { product, total, loading, disabled }]) => (
                <ProductThumb
                  title={product.name}
                  image={product.image}
                  loading={loading}
                  disabledIncrement={disabled}
                  onIncrement={() => {
                    store.actions.calc({ id, value: 1 });
                  }}
                  onDecrement={() => {
                    store.actions.calc({ id, value: -1 });
                  }}
                  total={total}
                ></ProductThumb>
              )
            )}
          </div>
        </Scroll>
      </div>
      <footer class="cart-footer">Total : $ {store.state.total}</footer>
    </host>
  );
}

cart.styles = [
  tokens,
  css`
    :host {
      min-width: 280px;
      min-height: 100%;
      display: grid;
      padding: 0px var(--size);
      box-sizing: border-box;
      grid-template: 300px 40px/ 1fr;
    }
    .cart-products_grid {
      display: grid;
      gap: var(--size);
    }
    .cart-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-neutral-60);
      border-radius: var(--border-radius);
    }
  `,
];

export const Cart = c(cart);

customElements.define("my-cart", Cart);
