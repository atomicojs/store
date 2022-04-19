import {
  Ref,
  DOMEvent,
  useHost,
  useEvent,
  useState,
  useEffect,
  useUpdate,
} from "atomico";
import { useListener } from "@atomico/hooks/use-listener";
import { PromiseStatus } from "@atomico/hooks/use-promise";
import { InterfaceStore } from "./store";

export const storeEventContext = "store-context";

export type IdStore = string | Symbol;

export interface DetailConsumer {
  id: IdStore;
  sync(store: InterfaceStore<any>): void;
}

export type ActionObserve<A extends (param?: any) => Promise<any>> = (
  param: A extends (param: infer P) => any ? P : any
) => void;

function useStoreProvider<S extends InterfaceStore<any>>(store: S) {
  const host = useHost();
  useListener(host, storeEventContext, (event: CustomEvent<DetailConsumer>) => {
    if (event.detail.id === store.id) {
      event.stopImmediatePropagation();
      event.detail.sync(store);
    }
  });
}

function useStoreConsumer<S extends InterfaceStore>(store: S) {
  const dispatch = useEvent<DetailConsumer>(storeEventContext, {
    bubbles: true,
    composed: true,
  });

  const [currentStore] = useState<S>(() => {
    let parentStore = store;
    dispatch({
      id: store.id,
      sync(nextStore: any) {
        parentStore = nextStore;
      },
    });
    return parentStore;
  });

  return currentStore;
}

export function useStore<S extends InterfaceStore>(
  store: S,
  initialState?: S["clone"] extends (props: infer I) => any ? Partial<I> : any
) {
  const update = useUpdate();

  let [currentStore] = useState<S>(() =>
    initialState ? store.clone(initialState) : store
  );
  /**
   * @todo analyze the need to inherit the concurrent state from root
   */
  const rootStore = useStoreConsumer(currentStore);

  currentStore = initialState ? currentStore : rootStore;

  useStoreProvider(currentStore);

  useEffect(() => {
    if (!currentStore) return;
    return currentStore.on(update);
  }, [currentStore]);

  return currentStore;
}

export function useActionObserver<A extends (param: any) => Promise<any>>(
  action: A
): [ActionObserve<A>, PromiseStatus] {
  const [state, setState] = useState<{
    status: PromiseStatus;
    id?: any;
    result?: any;
    action: ActionObserve<A>;
  }>(() => ({
    status: "",
    action: (param) => {
      setState(function id(state) {
        if (state.status === "pending") {
          return state;
        } else {
          action(param).then(
            (result) =>
              setState((state) =>
                state.id === id
                  ? { ...state, result, status: "fulfilled" }
                  : state
              ),
            (result) =>
              setState((state) =>
                state.id === id
                  ? { ...state, result, status: "rejected" }
                  : state
              )
          );
          return {
            ...state,
            id,
            status: "pending",
          };
        }
      });
    },
  }));
  return [state.action, state.status];
}

export function useActionFromForm<A extends (data: any) => Promise<any>>(
  ref: Ref<HTMLFormElement>,
  storeAction: A,
  mapSubmit?: (form: HTMLFormElement) => any
): [PromiseStatus, ActionObserve<A>] {
  const [action, status] = useActionObserver(storeAction);
  useListener(
    ref,
    "submit",
    (event: DOMEvent<HTMLFormElement, SubmitEvent>) => {
      event.preventDefault();
      const { current } = ref;
      action(mapSubmit ? mapSubmit(current) : current);
    }
  );
  return [status, action];
}
