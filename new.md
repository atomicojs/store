```
Store->action->
```

```tsx
const [, { addUser }] = useStore(Store);

addUser({
  key: Date.now(),
});
```

```tsx
async function isValid(user) {
  return apiGetUser(user);
}

async function* addUser(user) {
  yield (state) => ({ ...state, loading: true });

  const valid = await isValid(user);

  yield (state) => ({ ...state, loading: false, user });
}

async function* addPost(user) {
  yield (state) => ({ ...state, loading: true });

  const post = await createPost(user);

  yield (state) => ({ ...state, loading: false, post });
}
```

```tsx
const Card = createStore([], {
  add(product): (state)=>({
    ...state,
    products:[
      ...state.products,
      product
    ]
  }),
  getTotal:()=>(state)=>{state}
});
```

```tsx
const Store = createStore(0);

<Store state={10}></Store>;

function child() {
  const [state, setState] = useStore(Store);

  return (
    <host>
      <button
        onclick={() => {
          setState(state + 1);
        }}
      >
        Increment
      </button>
      <button
        onclick={() => {
          setState(state + 1);
        }}
      >
        Decrement
      </button>
    </host>
  );
}
```

```tsx
interface State {
  auth: {
    user: {};
    loading: boolean;
  };
}

const Store = createStore({ user: {}, auth: false } as State, {
  async *login({ email, password }) {
    yield ({ auth }) => ({
      auth: {
        ...auth,
        user: { email },
        loading: true,
      },
    });

    const user = await api("auth", { email, password });

    return ({ auth }) => ({
      auth: {
        ...auth,
        user: user,
        loading: false,
      },
    });
  },
});

<Store state={10}></Store>;

function child() {
  const [state, setState] = useStore(Store);

  return (
    <host>
      <button
        onclick={() => {
          setState(state + 1);
        }}
      >
        Increment
      </button>
      <button
        onclick={() => {
          setState(state + 1);
        }}
      >
        Decrement
      </button>
    </host>
  );
}
```

```tsx

const Auth = createStore({
  user: {}
  loading: false
},{
  login:()=>{}
})

const App = createStore({
  auth: Auth
  posts:{
    loading: false,
    list: []
  }
},{
  async *getPost(){

    const state = yield (state)=>({
      ...state,
      posts:{
        loading: true,
        ...state.posts
      }
    })

    const posts = await getPosts(state.auth);

    return (state)=>({
      ...state,
      posts:{
        ...posts
      }
    })
  }
})

```

```tsx
const Store = createStore(0);

<Store state={0}></Store>;
```

```tsx
<StoreAuth state={auth}>
  <RouterSwitch>
    <RouterCase
      path="/dashboard"
      load={() => {
        return <Dashboard />;
      }}
    />
    <RouterCase
      path="/"
      load={() => {
        return <LoginForm onSuccess={() => redirect("admin")} />;
      }}
    />
  </RouterSwitch>
</StoreAuth>;

const LoginForm = c(() => {
  const [auth, setAuth] = useStore(StoreAuth);
  const disaptch = useEvent("Success");

  useEffect(() => {
    if (auth) dispatch();
  }, [auth]);

  return (
    <form
      onsubmit={action<{ email: string; password: string; remember: boolean }>(
        (data) => {
          setAuth.login(data);
        }
      )}
    >
      <Fields />
    </form>
  );
});

const AuthLogin: Action = async function (
  state,
  data: { email: String; password: string }
) {
  state.auth = await api(state.url, data);
};
```

```tsx
const Store = createStore({
  count: 0,
},{
  increment:(store)=>store.count++;
  decrement:(store)=>store.count--;
});

<Store state={{ count: 0 }}></Store>;`


```

```tsx
const NewSyntax = c(
  (state) => {
    state.count++;

    const subcount = useSignalState(0);
    const reference = useSignalRef();

    useSignalEffect(() => {
      const { count } = state;
      const { current } = reference;

      const timeout = setTimeout(() => {
        state.count++;
      }, 1000);

      return () => clearInterval(timeout);
    });

    const compute = useSignalMemo(() => {
      const { count } = state;
      return [].repeat(count);
    });

    const compute = useSignalCallback(() => {});

    return (
      <host shadowDom>
        <button
          ref={reference}
          onclick={() => {
            state.count++;
          }}
        >
          Increment
        </button>
        <button
          onclick={() => {
            state.count--;
          }}
        >
          Decrement
        </button>
      </host>
    );
  },
  {
    count: {
      type: Number,
      value: 0,
    },
  }
);
```
