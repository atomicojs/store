import {
  Props,
  c,
  useHost,
  useInsertionEffect,
  useMemo,
  useEvent,
  useUpdate,
} from "atomico";
import { ActionCollections, createStore as coreCreateStore } from "./core";

export const createStore = <State, Actions extends ActionCollections<State>>(
  state: State,
  actions: Actions
) => {
  const defaultStore = coreCreateStore(state, actions);
  const Store = c(
    ({ state, actions }) => {
      const dispatch = useEvent("change");
      const store = useMemo(
        () => coreCreateStore(state, actions),
        [state, actions]
      );
      useInsertionEffect(
        () =>
          store.subscribe(() => {
            console.log("UPDATE!");
            dispatch();
          }),
        [store]
      );
      return <host store={store}></host>;
    },
    {
      props: {
        state: {
          type: Object,
          value: () => state,
        },
        actions: {
          type: Object,
          value: () => actions,
        },
        store: {
          type: Object,
          value: () => defaultStore,
        },
      },
    }
  );

  return Store;
};

export type AnyStore = ReturnType<typeof createStore<any, any>>;

export const useStore = <S extends AnyStore>(Store: S) => {
  const host = useHost();
  const update = useUpdate();
  const store = useMemo(() => {
    return host.current.closest(new Store().localName);
  }, [Store]);

  useInsertionEffect(() => {
    store.addEventListener("change", update);
    return () => store.removeEventListener("change", update);
  }, [store]);

  return store.store as Props<S>["store"];
};
