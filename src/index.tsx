import {
  Host,
  c,
  useContext,
  useEvent,
  useInsertionEffect,
  useMemo,
  useProvider,
  useUpdate,
} from "atomico";
import { Context, GetValueFromContext } from "atomico/types/context";
import { createStore as coreCreateStore } from "./core";
const CONTEXT_VALUE = "value";

export const createStore = <State extends object>(state: State) => {
  const defaultStore = coreCreateStore<State>(state);

  const Store = c(
    ({ state }): Host<{ onUpdateStore: CustomEvent<State> }> => {
      const store = useProviderStore(Store as any, state, true);

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

  return store.state as GetValueFromContext<CustomStore>["state"];
}

const isInitialStateFunction = <State extends object>(
  value: ((value: State) => State) | State
): value is (state: State) => State => typeof value === "function";

export const useProviderStore = <
  CustomStore extends Context<any>,
  State extends GetValueFromContext<CustomStore>["state"]
>(
  Store: CustomStore,
  state: State | ((state: State) => State),
  isStoreElement?: boolean
) => {
  const dispatch = isStoreElement ? useEvent("UpdateStore") : useUpdate();

  const store = useMemo(
    () =>
      coreCreateStore(
        isInitialStateFunction(state) ? state(Store["value"]) : state
      ),
    [isStoreElement ? state : isStoreElement]
  );

  useInsertionEffect(() => store.subscribe(dispatch), [store]);

  useProvider(Store, store);

  return store.state;
};
