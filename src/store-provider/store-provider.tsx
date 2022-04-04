import { Type, Props, c } from "atomico";
import { useStoreProvider } from "../hooks";
import { InterfaceStore } from "../store";

function storeProvider(props: Props<typeof storeProvider>) {
  useStoreProvider(props.store);
  return <host></host>;
}

storeProvider.props = {
  store: {
    type: Object as Type<InterfaceStore>,
  },
};

export const StoreProvider = c(storeProvider);

customElements.define("store-provider", StoreProvider);
