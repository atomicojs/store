export type ActionCallback<CustomState, CustomAction> = CustomAction extends (
  state: CustomState
) => infer Return
  ? () => Return
  : CustomAction extends (
      state: CustomState,
      param: infer Param
    ) => infer Return
  ? (param: Param) => Return
  : (...args: unknown[]) => unknown;

export type Store<CustomState, CustomActions> = {
  [I in keyof CustomActions]: ActionCallback<CustomState, CustomActions[I]>;
} & {
  state: CustomState;
  subscribe(callback: (state: CustomState) => any): () => void;
};

export type Action<State, Param = null> = Param extends null
  ? (state: State) => void
  : (state: State, param: Param) => void;

export type ActionCollections<State> = {
  [I: string]: Action<State, unknown>;
};

const createAction =
  <CustomState, CustomAction extends (...args: any) => any>(
    state: CustomState,
    action: CustomAction
  ): any =>
  (param: any) =>
    action(state, param);

export function createStore<
  CustomState extends object,
  CustomActions extends ActionCollections<CustomState>
>(customState: CustomState, customActions?: CustomActions) {
  const subscribers = new Set<(state: CustomState) => any>();
  const store = {
    state: new Proxy(customState, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        if (value !== target[prop]) {
          target[prop] = value;
          subscribers.forEach((callback) => callback(target));
        }
        return target[prop];
      },
    }),
    subscribe(callback) {
      subscribers.add(callback);
    },
  } as Store<CustomState, CustomActions>;

  for (const prop in customActions) {
    store[prop] = createAction(store.state, customActions[prop]);
  }

  return store;
}
