import {
  c,
  useContext,
  useEvent,
  useInsertionEffect,
  useMemo,
  useProvider,
  useUpdate,
} from "atomico";
import { createStore as coreCreateStore } from "./core";
import { UseProvider } from "atomico/types/context";
const CONTEXT_VALUE = "value";

export const createStore = <State extends object>(state: State) => {
  const defaultStore = coreCreateStore(state);

  const Store = c(
    ({ state }) => {
      const dispatch = useEvent("change");

      const store = useMemo(() => coreCreateStore(state), [state]);

      useInsertionEffect(() => store.subscribe(dispatch), [store]);

      useProvider(Store, store);

      return <host value={store} style="display: content"></host>;
    },
    {
      props: {
        state: {
          type: Object,
          value: () => state,
        },
        value: {
          type: Object,
          value: () => defaultStore,
        },
      },
    }
  );

  Store[CONTEXT_VALUE] = defaultStore.state;

  return Store;
};

export type DefaultStore = ReturnType<typeof createStore<any>>;

export function useStore<CustomStore extends DefaultStore>(Store: CustomStore) {
  const update = useUpdate();

  const store = useContext(Store);

  useInsertionEffect(() => store.subscribe(update), [store]);

  return store.state;
}

export const useProviderStore: UseProvider = (Store, value) =>
  useProvider(Store, value);
