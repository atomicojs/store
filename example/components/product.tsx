import { Props, Host, c, css, useEvent } from "atomico";
import { Button, Icon } from "formilk";
import tokens from "formilk/tokens";
import { Loading } from "./loading";

function product({
  image,
  uid,
  title,
  price,
  loading,
}: Props<typeof product>): Host<{
  onIncrement: CustomEvent<number>;
}> {
  const dispatchIncrement = useEvent("Increment");
  return (
    <host shadowDom>
      <img class="product-image" src={image} />
      <div class="product-detail">
        <h4 class="product-title">{title}</h4>
        <div class="product-actions">
          <Button
            size="small"
            color="neutral"
            rounded
            onclick={() => dispatchIncrement(uid)}
          >
            <Icon type="plus" slot="prefix"></Icon>
          </Button>
          <strong>$ {price}</strong>
        </div>
      </div>
      <Loading show={loading}>Checking stock</Loading>
    </host>
  );
}

product.props = {
  uid: Number,
  image: String,
  title: String,
  price: Number,
  description: String,
  loading: Boolean,
  disabled: { type: Boolean, reflect: true },
};

product.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      display: grid;
      gap: var(--size-s);
      background: white;
      grid-template-columns: 1fr;
      border-radius: var(--border-radius);
      overflow: hidden;
      position: relative;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    .product-detail {
      display: grid;
      gap: var(--size-s);
      padding: var(--size-s);
    }

    .product-detail p {
      margin: 0;
    }

    .product-title {
      margin: 0;
    }
    .product-image {
      width: 70%;
      height: 200px;
      object-fit: contain;
      margin: auto;
      padding: var(--size-s);
    }
    .product-actions {
      display: flex;
      align-items: center;
      gap: var(--size-s);
    }
    .product-counter {
      width: 180px;
    }
  `,
];

export const Product = c(product);

customElements.define("app-product", Product);
