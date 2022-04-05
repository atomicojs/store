import { Type, Props, c } from "atomico";
import { useStoreProvider } from "../hooks";
import { InterfaceStore } from "../store";

function storeProvider(props: Props<typeof storeProvider>) {
  useStoreProvider(props.store, props.name);
  return <host></host>;
}

storeProvider.props = {
  store: {
    type: Object as Type<InterfaceStore>,
  },
  name: {
    type: null as Type<Symbol | string>,
  },
};

export const StoreProvider = c(storeProvider);

customElements.define("store-provider", StoreProvider);
