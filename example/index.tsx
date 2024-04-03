import { c, useEffect, useHost } from "atomico";
import * as Store from "./store";
import { useProviderStore, useStore } from "../src";

export const Tabs = c(() => {
  const store = useProviderStore(Store.Provider, (state) => ({
    ...state,
    tabs: new Set<Element>(),
  }));

  const tabs = [...store.tabs];

  const curretTab = tabs.find((tab) => tab === store.active) || tabs.at(0);

  return (
    <host shadowDom={{ slotAssignment: "manual" }}>
      {tabs.map((tab) => (
        <button
          onclick={() => {
            store.active = tab;
          }}
        >
          {tab.getAttribute("name")}
        </button>
      ))}
      <slot assignNode={curretTab} />
    </host>
  );
});

export const Tab = c(() => {
  const host = useHost();
  const store = useStore(Store.Provider);

  useEffect(() => {
    store.tabs = new Set([...store.tabs, host.current]);
    return () => {
      store.tabs = new Set(
        [...store.tabs].filter((tab) => tab != host.current)
      );
    };
  }, []);

  return (
    <host shadowDom>
      <slot />
    </host>
  );
});

customElements.define("my-tabs", Tabs);
customElements.define("my-tabs-tab", Tab);
customElements.define("my-tabs-store", Store.Provider);
