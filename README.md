![@atomico/store](https://raw.githubusercontent.com/atomicojs/atomico/brand/atomico-store.svg)

[![doc](https://raw.githubusercontent.com/atomicojs/atomico/brand/link-to-doc.svg)](https://atomico.gitbook.io/doc/atomico/atomico-store) [![Discord](https://raw.githubusercontent.com/atomicojs/atomico/brand/link-to-discord.svg)](https://discord.gg/7z3rNhmkNE) [![Figma](https://raw.githubusercontent.com/atomicojs/atomico/brand/link-to-twitter.svg)](https://twitter.com/atomicojs)

@atomico/store is Naturally asynchronous.

```ts
interface State {
  api: string;
  loading: boolean;
  products: { id: number; title: string; price: number };
}

const initialState = (state: State) => ({
  api: "",
  loading: false,
  products: [],
});

async function* getProducts(state: State) {
  yield { ...state, loading: true };
  return {
    ...(yield),
    loading: false,
    products: await (await fetch(state.api)).json(),
  };
}

const store = new Store(initialState, {
  actions: { getProducts },
});
```

## Objectives

1. [Asynchrony management](#asynchrony-management).
2. [Finitely predictable asynchrony](#finitely-predictable-asynchrony).
3. [Modularity and composition](#modularity-and-composition).

### Asynchrony management

Application events and service calls are naturally asynchronous, with @atomico/store you can use asynchronous functions or asynchronous generators to define the update cycle.

**update cycle?** By this I mean the states that occur sequentially when dispatching the action, example:

```ts
async function* getProducts(state: State) {
  yield { ...state, loading: true };
  return {
    ...(yield),
    loading: false,
    products: await (await fetch(state.api)).json(),
  };
}
```

The previous action will generate 2 states when dispatched:

1. state 1:`{loading: true, products:[]}`
2. state 2: `{loading: false, products:[...product]}`

The advantage of this is that the process is clearly observable by the store and by whoever dispatches the action.

### Finitely predictable asynchrony

Every action in @atomico/store is wrapped in a promise that defines when it ends its cycle, this will let you execute actions sequentially, example:

```ts
await store.actions.orderyBy();
await store.actions.insert({ id: 1000 });
await store.actions.updateAll();
```

### Modularity and composition

@atomico/store allows to decouple the actions and the state of the store, for a better modularization , example:

**/actions.js**

```ts
export interface State {
  api: string;
  loading: boolean;
  products: { id: number; title: string; price: number };
}

export const initialState = (state: State) => ({
  api: "",
  loading: false,
  products: [],
});

export async function* getProducts(state: State) {
  yield { ...state, loading: true };
  return {
    ...(yield),
    loading: false,
    products: await (await fetch(state.api)).json(),
  };
}
```

**/store.js**

```ts
import * as Actions from "./actions";

export default new Store(Actions.initialStore, { actions: { Actions } });
```
