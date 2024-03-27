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
