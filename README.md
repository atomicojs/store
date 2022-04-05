# @atomico/store

Store que se crea para ser naturalmente asincrono a niveles nunca antes vistos.

## Store

```ts
const state = {
  firstName: "Upper",
  lastName: "Cod",
};

const actions = {
  setFirstName(state, firstName) {
    return { ...state, firstName };
  },
};

const getters = {
  fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
};

const store = new Store(state, { actions, getters });

store.state.fullName; // "Upper Cod"

store.setFirstName("Matias"); // Promise<{firstName: "Matias",lastName: "Cod"}>
```

## Hooks

### useStoreProvider

```jsx
useStoreProvider(store, id?: string | symbol);
```

Where:

1. `store`: instancia de Store.
2. `id`: Parametro opcional, defien un ID para el Store, esto permite que en la busqueda acendente de `useStoreConsumer` se defina el store segun igualdad del ID

### useStoreConsumer

```ts
const store = useStoreConsumer(id?: string | symbol);
```

Where:

1. `id`: Parametro opcional, identificador del store definido por `useStoreProvider`

## Components

permite un uso uniuversal de useStoreProvider y useStoreConsumer a nivel de webcomponents.

```tsx
<StoreProvider store={store}>
  <StoreConsumer
    onStoreDefined={({ currentTarget }) => {
      currentTarget.store;
    }}
  />
</StoreProvider>
```
