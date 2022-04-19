import { Host, Props, c, css, useEvent } from "atomico";
import { Button, Icon } from "formilk";
import tokens from "formilk/tokens";
import { Loading } from "./loading";

function productThumb({
  total,
  loading,
  image,
}: Props<typeof productThumb>): Host<{
  onIncrement: Event;
  onDecrement: Event;
}> {
  const dispatchIncrement = useEvent("Increment");
  const dispatchDecrement = useEvent("Decrement");
  return (
    <host shadowDom>
      <img class="product-thumb_image" src={image} />
      <div class="product-thumb_actions">
        <Button
          color="neutral"
          rounded
          size="small"
          onclick={dispatchIncrement}
          class="product-thumb_increment"
        >
          <Icon type="plus" slot="prefix"></Icon>
        </Button>
        <strong>{total}</strong>
        <Button
          color="neutral"
          rounded
          size="small"
          onclick={dispatchDecrement}
          class="product-thumb_decrement"
        >
          <Icon type="dash" slot="prefix"></Icon>
        </Button>
      </div>
      <Loading show={loading}>Checking stock</Loading>
    </host>
  );
}

productThumb.props = {
  total: Number,
  title: String,
  image: String,
  loading: Boolean,
  disabled: {
    type: Boolean,
    reflect: true,
  },
  disabledIncrement: {
    type: Boolean,
    reflect: true,
  },
};

productThumb.styles = [
  tokens,
  css`
    :host {
      display: grid;
      padding: var(--size-xxs);
      justify-content: center;
      grid-template-columns: 80px auto;
      gap: var(--size-xs);
      position: relative;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-sizing: border-box;
    }
    :host([disabled-increment]) .product-thumb_increment {
      opacity: 0.5;
      pointer-events: none;
    }
    .product-thumb_image {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
    .product-thumb_title {
      margin: 0;
    }
    .product-thumb_actions {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: var(--size-xs);
      align-items: center;
      justify-content: space-between;
    }
  `,
];

export const ProductThumb = c(productThumb);

customElements.define("app-product-thumb", ProductThumb);
