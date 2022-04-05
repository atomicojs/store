import { useHost, useEvent, useState, useEffect, useUpdate } from "atomico";
import { useListener } from "@atomico/hooks/use-listener";
import { PromiseStatus } from "@atomico/hooks/use-promise";
import { InterfaceStore } from "./store";

export const storeEventProvider = "store-provider";

export const storeEventConsumer = "store-provider";

export type IdStore = string | Symbol;

export interface DetailConsumer {
  id: IdStore;
  sync(store: InterfaceStore<any>): void;
}

export function useStoreProvider<S extends InterfaceStore<any>>(
  store: S,
  id?: IdStore
) {
  const host = useHost();
  useListener(
    host,
    storeEventProvider,
    (event: CustomEvent<DetailConsumer>) => {
      if (event.detail.id === id) {
        event.stopImmediatePropagation();
        event.detail.sync(store);
      }
    }
  );
}

export function useStore<S extends InterfaceStore>(store: S) {
  const update = useUpdate();

  useEffect(() => {
    if (!store) return;
    return store.on(update);
  }, [store]);

  return store;
}

export function useActionObserver<A extends (param: any) => Promise<any>>(
  action: A
) {
  const [state, setState] = useState<{
    status: PromiseStatus;
    id?: any;
    result?: any;
    action: (param: A extends (param: infer P) => any ? P : any) => void;
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
  return [state.action, state.status, state.result];
}

export function useStoreConsumer<State, Actions = null>(id?: IdStore) {
  const dispatch = useEvent<DetailConsumer>(storeEventConsumer, {
    bubbles: true,
    composed: true,
  });

  const [store] = useState<InterfaceStore<State, Actions>>(() => {
    let parentStore: InterfaceStore<State, Actions>;
    dispatch({
      id,
      sync(store: any) {
        parentStore = store;
      },
    });
    return parentStore;
  });

  useStore(store);

  return store;
}
