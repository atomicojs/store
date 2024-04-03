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
import { createStore as _createStore, Store } from "./core";

const CONTEXT_VALUE = "value";

export const createStore = <State extends object>(state: State) => {
  const defaultStore = _createStore<State>(state);

  const Store = c(
    ({ state, memo }): Host<{ onUpdateStore: CustomEvent<State> }> => {
      useProviderStore(Store as any, state, memo || [state], true);
      return <host style="display: contents"></host>;
    },
    {
      props: {
        state: {
          type: Object,
          value: () => state,
        },

        memo: {
          type: Array,
        },
        value: {
          type: Object,
          value: () => defaultStore,
        },
      },
    }
  );

  Store[CONTEXT_VALUE] = defaultStore;

  return Store;
};

export type StoreElement<State extends object> = ReturnType<
  typeof createStore<State>
>;

export function useStore<CustomStore extends StoreElement<any>>(
  Store: CustomStore
) {
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
  State extends GetValueFromContext<CustomStore>["state"],
  IsStoreElement extends boolean = false
>(
  Store: CustomStore,
  state: State | ((state: State) => State),
  memo?: any[],
  isStoreElement?: IsStoreElement
) => {
  const dispatch = isStoreElement ? useEvent("UpdateStore") : useUpdate();

  const store = useMemo(
    () =>
      _createStore(
        isInitialStateFunction(state) ? state(Store["value"]) : state
      ),
    []
  );

  useMemo(() => {
    Object.assign(store.state, state);
  }, memo || []);

  useInsertionEffect(() => store.subscribe(dispatch), [store]);

  useProvider(Store, store);

  return (isStoreElement ? store : store.state) as IsStoreElement extends true
    ? Store<State>
    : State;
};
