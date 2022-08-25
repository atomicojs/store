import { useEvent, useState, useHost, useUpdate, useEffect } from "atomico";
import { Store } from "./store";

export function useStore<CurrentStore extends Store>(
  store: CurrentStore,
  sync?: (state: CurrentStore["state"]) => CurrentStore["state"]
) {
  type Detail = [Store, (currentStore: CurrentStore) => void];

  const update = useUpdate();

  const dispatch = useEvent<Detail>("ConnectStore", {
    bubbles: true,
    composed: true,
  });

  const host = useHost();

  const connect = (prevStore?: {
    currentStore: CurrentStore;
    clean(): void;
  }) => {
    let currentStore = store;

    dispatch([store, (rootStore) => (currentStore = rootStore)]);

    if (prevStore?.currentStore === currentStore) return prevStore;

    if (sync) {
      currentStore = currentStore.clone(sync) as CurrentStore;
    }

    const handler = (event: CustomEvent<Detail>) => {
      const [id, connect] = event.detail;
      if (id === store) connect(currentStore);
    };

    host.current.addEventListener("ConnectStore", handler);

    const off = currentStore.on(update);

    const clean = () => {
      host.current.removeEventListener("ConnectStore", handler);
      off();
    };
    return { currentStore, clean };
  };

  const [state, setState] = useState(connect);

  useEffect(() => {
    setState(connect);
    return state.clean;
  }, [state.currentStore]);

  return state.currentStore;
}
