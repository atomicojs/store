import { useHost, useEvent, useState, useEffect, useUpdate } from "atomico";
import { useListener } from "@atomico/hooks/use-listener";
import { InterfaceStore } from "./store";

export const storeEventProvider = "store-provider";

export const storeEventConsumer = "store-provider";

export interface DetailConsumer {
  sync(store: InterfaceStore): void;
}

export function useStoreProvider(store: InterfaceStore) {
  const host = useHost();
  const rootStore = useStoreConsumer();

  useListener(
    host,
    storeEventProvider,
    (event: CustomEvent<DetailConsumer>) => {
      event.stopImmediatePropagation();
      event.detail.sync(store);
    }
  );

  if (rootStore) store.delegate(rootStore);
}

export function useStoreConsumer() {
  const update = useUpdate();
  const dispatch = useEvent<DetailConsumer>(storeEventConsumer, {
    bubbles: true,
    composed: true,
  });

  const [store] = useState<InterfaceStore>(() => {
    let parentStore: InterfaceStore;
    dispatch({
      sync(store) {
        parentStore = store;
      },
    });
    return parentStore;
  });

  useEffect(() => {
    if (!store) return;
    return store.on(update);
  }, [store]);

  return store;
}
