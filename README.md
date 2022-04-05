# @atomico/store

Naturally asynchronous to levels never seen before. Atomico/store is the library to manage asynchronous states in an ideal way, since it implements a pattern devised by UpperCod that allows actions to be consumed in a predictable way, @atomico/store implements 3 classic concepts of a store:

1. `state`: observed and referential state for actions and getters.
2. `actions`: only way to modify the state.
3. `getters`: Virtual values from the state.

## What problems are solved with @atomico/store?

1. [Asynchrony management](#asynchrony-management).
2. [Finitely predictable asynchrony](#finitely-predictable-asynchrony).
3. [Modularity and composition](#modularity-and-composition).

## Asynchrony management

The asynchrony in `@atomico/store` occurs when dispatching an action, this action can be:

1. Function.
2. Async Function.
3. Async Generator.

### Function

```ts
function increment(state: { count: number }) {
  return {
    ...state,
    count: state.count + 1,
  };
}
```

### Async Function

```ts
async function increment(state: { count: number }) {
  const stateCount = await fetchIncrement(state);

  return { ...state, ...stateCount };
}
```

### Async Generator

```ts
async function* increment(state: { count: number }) {
  yield { ...state, loading: true };
  const stateCount = await fetchIncrement(state);
  return { ...state, ...stateCount };
}
```

The previously taught is valid, but here is a problem that I want to highlight, parallel updates, solution:

**Solution 1**

Generators are a powerful form of dialogue between the executing function and the observer of said function, to solve this we will use `yield` to retrieve the last observed state:

```ts
async function* increment(state: { count: number }) {
  yield { ...state, loading: true };
  const stateCount = await fetchIncrement(state);
  return {
    ...(yield),
    ...stateCount,
  };
}
```

**Solution 2**

Another probable solution is to return a function through which to make known the last observed state:

```ts
async function* increment(state: { count: number }) {
  yield { ...state, loading: true };
  const stateCount = await fetchIncrement(state);
  return (state) => ({ ...state, ...stateCount });
}
```

### Finitely predictable asynchrony

Let's go back to the example of asynchronous functions with generators, but applied inside the Store:

```ts
const store = new Store(
  {
    count: 0,
  },
  {
    async *increment(state: { count: number }) {
      yield { ...state, loading: true };
      const stateCount = await fetchIncrement(state);
      return {
        ...(yield),
        ...stateCount,
      };
    },
  }
);
```

When executing our action something interesting happens with the return:

```ts
store.actions.increment(); // Promise<any>
```

Yes, the return of the action is a promise, it will be returned only when the action has finished its update cycle, this makes it really predictable and finite.

### Modularity and composition

I'm going to introduce you to a new concept that I've called `asynchronous composition`.

**asynchronous composition**: finite execution based on the nominative consumption of another action with its own cycle.

Suppose we have some actions for the page control, example:

```ts
interface State {
  page: number;
  result: any[];
}

export async function* read(state: State) {
  const result = await fetch(`my.api?page=${state.page}`);

  return {
    ...(yield),
    products: await result.json(),
  };
}

export function* next(state: State) {
  yield {
    ...state,
    page: state.page + 1,
  };
  return read(yield);
}
```

Did you notice this `return read(yield);`?

> finite execution based on the nominative consumption of another action with its own cycle.

**the `next` action after page update dispatches the `read` action**.

## API Hooks

### useStore

You subscribe to a store directly.

```jsx
useStore(store);
```

### useStoreProvider

Define a Store to share with nested useStoreConsumers.

```jsx
useStoreProvider(store, id?: string | symbol);
```

Where:

1. `store`: Store instance.
2. `id`: Optional parameter, defines an ID for the Store, this allows that in the ascending search of `useStoreConsumer` the store is defined according to the equality of the ID

### useStoreConsumer

Find and consume a store.

```ts
const store = useStoreConsumer(id?: string | symbol);
```

Where:

1. `id`: Optional parameter, identifier of the store defined by `useStoreProvider`

## Api Components

allows universal use of useStoreProvider and useStoreConsumer at the webcomponent level.

```tsx
<StoreProvider store={store}>
  <StoreConsumer
    onStoreDefined={({ currentTarget }) => {
      currentTarget.store;
    }}
  />
</StoreProvider>
```
