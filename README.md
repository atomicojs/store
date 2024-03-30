```tsx
import { createStore } from "@atomico/store";

const StoreCount = createStore(
  { count: 0 },
  {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count++;
    },
  }
);

export const MyApp = c(() => {
  return (
    <host>
      <StoreCount state={{ count: 0 }}>
        <Counter />
      </StoreCount>
      <StoreCount state={{ count: 10 }}>
        <Counter />
      </StoreCount>
    </host>
  );
});
```

```tsx
import { createStore } from "@atomico/store";

const StoreAuth = createStore(
  {
    loading: false
    auth?: { username: string },
  },
  {
    async login(state, {email,password}: {email: string, password: true}){
      state.loading = true
      state.auth = await MyApi("/login",{email,password})
      state.loading = false;

    },
  }
);

export const MyApp = c(() => {
  return <host>
      <StoreAuth>
        <AuthForm/>
      </StoreAuth>
  </host>
});
```

`

Buena pregunta, estoy usando una nueva implementación basada en Element.closest, para poder consumir el context se debe usar useStore, ejemplo:

```tsx
import { useStore } from "@atomico/store";
import { StoreCount } from "./store-count";

const MyForm = c(() => {
  const store = useStore();

  return (
    <host>
      <span>{store.count}</span>
      <button onclick={store.increment}>Increment</button>
    </host>
  );
});
```
