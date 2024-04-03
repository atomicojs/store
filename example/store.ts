import { createStore } from "../src";

export interface Tabs {
  active?: Element;
  tabs: Set<Element>;
}

export const Provider = createStore<Tabs>({ tabs: new Set() });
