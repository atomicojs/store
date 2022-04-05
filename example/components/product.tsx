import { c } from "atomico";
import { useStoreConsumer } from "../../src/hooks";

function product() {
  const store = useStoreConsumer<
    { title: string; fullName: string },
    { setTitle: string }
  >();

  store.state.title;

  return (
    <host shadowDom>
      <h1>{store.state.title}</h1>
      <h1>{store.state.fullName}</h1>
      <input
        type="text"
        oninput={({ currentTarget: { value } }) => {
          store.actions.setTitle(value);
        }}
      />
    </host>
  );
}

export const Product = c(product);

customElements.define("app-product", Product);
