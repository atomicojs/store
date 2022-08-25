# @atomico/store

[![doc](https://raw.githubusercontent.com/atomicojs/atomico/brand/link-to-doc.svg)](https://atomico.gitbook.io/doc/atomico/atomico-store) [![Discord](https://raw.githubusercontent.com/atomicojs/atomico/brand/link-to-discord.svg)](https://discord.gg/7z3rNhmkNE) [![Figma](https://raw.githubusercontent.com/atomicojs/atomico/brand/link-to-twitter.svg)](https://twitter.com/atomicojs)

`@atomico/store` is Atomico's answer to application-level state abstraction lookup, the store in Atomico is composed of:

1. `state`: any value other than a function.
2. `actions`: (Optional) Functions capable of modifying the state, these can be synchronous or async functions.

## The Store

```tsx
import { createStore } from "@atomico/store";

const store = createStore(0, {
  increment: (state) => state + 1,
  decrement: (state) => state + 1,
});
```

To add subscribers to store we just have to use the on method, example

```ts
store.on((state) => {
  console.log(`New State ${state}!`);
});
```

To dispatch changes to the store we only have to execute the action inside the `store.actions`, example:

```ts
store.actions.increment(); // `New State 1!`
store.actions.decrement(); // `New State 0!`
```

Finally if we want to modify the value directly we can use `store.state`, example:

```ts
store.state = 100; // `New State 100!`
```

### Optional Actions?

If in @atomicos/store you can create stores without actions defined within the store, subscribers will be notified when the `store.state` property changes.

## Actions

Actions are the ideal way to modify the state, they have a reducer syntax, example:

```ts
function multiply(state: number, param: number) {
  return state * param;
}
```

the actions can be Synchronous or Asynchronous, the previous example is synchronous in execution, but in most cases the stores are asynchronous and atomic to simplify this introduces the use of:

1. Async functions.
2. [Async generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).

### Actions as Async functions

ideal for making requests of which you do not want to have explicit knowledge in the store of the status of this, example

```ts
async function getUser(state: User, id: number) {
  const result = await fetch(`/users/${id}`);
  return result.json();
}
```

### Actions as Async generator functions

Ideal for requests in which you want to notify the status progressively, example:

```ts
async function* getUser(state: State, id: number) {
  yield {
    loading: true,
  };

  const result = await fetch(`/users/${id}`);

  return {
    loading: false,
    result: await result.json(),
  };
}
```

## Hooks

The api exposed below is Atomico's own

### useStore

Allows to synchronize the component to the desired store.

```tsx
import { createStore, useStore } from "@atomico/store";

const Counter = createStore(0, {
  increment: (state) => state + 1,
  decrement: (state) => state + 1,
});

function component() {
  const store = useStore(Counter);
  return (
    <host>
      <button onclick={store.decrement}>Decrement</button>
      <h1>{store.state}</h1>
      <button onclick={store.increment}>Increment</button>
    </host>
  );
}
```

useStore returns the store to reference either globally or by context, this process is automatic.

If you want to create a communication context through the store you can add a second parameter to useStore and you will automatically create a context between the parent component and its children, example:

```tsx
function parent() {
  const store = useStore(Counter, (state) => state);
  return (
    <host>
      <h1>{store.parent}</h1>
      <Child></Child>
    </host>
  );
}

function child() {
  const store = useStore(Counter);
  return (
    <host>
      <h1>{store.parent}</h1>
    </host>
  );
}

const Parent = c(parent);
const Child = c(child);
```

In the previous example the Child component will inherit the store of the Parent component and thus a synchronization between parent and child will be generated automatically.

## useAction

create a wrapper function for asynchronous to know its status or abort it.

```tsx
function component() {
  const { actions } = useStore(Store);

  const action = useAction(actions.myAsyncAction);

  return (
    <host>
      <button onclick={action} disabled={action.loading}>
        Submit
      </button>
    </host>
  );
}
```

Each execution sets the loading state, executions do not remove the previous one unless you set the second parameter to true, example:

```ts
const action = useAction(actions.myAsyncAction, true);
```

this defines that only the resolution of the last execution is observed and the previous ones will be aborted
