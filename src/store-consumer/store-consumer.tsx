import { Type, Host, c } from "atomico";
import { useStoreConsumer } from "../hooks";
import { InterfaceStore } from "../store";

function storeConsumer(): Host<{
  onChangeState: Event;
  onStoreDefined: Event;
}> {
  const store = useStoreConsumer();

  return (
    <host store={store} actions={store?.actions} state={store?.state}></host>
  );
}

storeConsumer.props = {
  store: {
    type: Object as Type<InterfaceStore>,
    event: {
      type: "StoreDefined",
    },
  },
  state: {
    type: Object,
    event: {
      type: "ChangeState",
    },
  },
  actions: {
    type: Object,
  },
};

export const StoreConsumer = c(storeConsumer);

customElements.define("store-consumer", StoreConsumer);
