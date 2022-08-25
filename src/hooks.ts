import {
  useEvent,
  useState,
  useHost,
  useUpdate,
  useEffect,
  useRef,
} from "atomico";
import { Store } from "./store";
import { Cycle } from "./consume";

interface ActionWrapper<Action extends (param: any) => any> {
  (value: Action extends (param: infer Param) => any ? Param : any): void;
  loading?: boolean;
  abort(): void;
}

export function useAction<Action extends (value?: any) => Cycle<any>>(
  action: Action,
  pipeline?: boolean
) {
  const ref = useRef<any>();

  ref.current = action;

  const [loading, setLoading] = useState(false);

  const [callback] = useState(() => {
    ref.cycles = new Set();
    const wrapper: ActionWrapper<Action> = (param) => {
      if (pipeline && ref.lastCycle) {
        ref.lastCycle.abort();
      }
      setLoading(true);
      const cycle = action(param);
      ref.cycles.add(cycle.abort);
      ref.lastCycle = cycle;
      cycle.then(() => {
        setLoading(false);
        ref.cycles.delete(cycle.abort);
      });
    };
    wrapper.abort = () => {
      ref.lastCycle && ref.lastCycle.abort();
      setLoading(false);
    };
    return wrapper;
  });

  callback.loading = loading;

  useEffect(
    () => () => {
      ref.cycles.forEach((abort) => abort());
    },
    []
  );

  return callback;
}

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
