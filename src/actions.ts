export type Set<State> = (state: State) => void;
export type Get<State> = () => State;

export type Action<State, Param = any> = (param: Param) => ActionReturns<State>;

export type ActionAsyncGenerator<State> = AsyncGenerator<
  (state: State) => State,
  (state: State) => State,
  State
>;

export type ActionAsyncIterator<State> = AsyncIterator<
  (state: State) => State,
  (state: State) => State,
  State
>;

export type ActionCollections<State> = {
  [action: string]: Action<State>;
};

export type Actions<A extends ActionCollections<any>> = {
  [I in keyof A]: ActionCallback<A[I]>;
};

export type ActionReturns<State> =
  | ((state: State) => State)
  | Promise<(state: State) => State>
  | ActionAsyncGenerator<State>;

export type ActionCallback<CurrentAction> = (
  param: CurrentAction extends (param: infer P) => any ? P : unknown
) => Promise<void>;

export const isAsyncIterator = <State>(
  value: any
): value is ActionAsyncIterator<State> => Symbol.asyncIterator in value;

const consumeAsyncIterator = async <State>(
  result: ActionAsyncIterator<State>,
  set: Set<State>,
  get: Get<State>
) => {
  const { done, value } = await result.next(get());

  set(value(get()));

  if (!done) return consumeAsyncIterator<State>(result, set, get);
};

export const createAction =
  <State, CurrentAction extends Action<State>>(
    action: CurrentAction,
    set: Set<State>,
    get: Get<State>
  ): ActionCallback<CurrentAction> =>
  async (param) => {
    const result = action(param);
    if (result instanceof Promise) {
      set((await result)(get()));
    } else if (isAsyncIterator<State>(result)) {
      await consumeAsyncIterator<State>(result, set, get);
    } else if (result) {
      set(result(get()));
    }
  };

export const createActions = <
  GetState extends Get<any>,
  CurrentActions extends ActionCollections<ReturnType<GetState>>
>(
  get: GetState,
  set: Set<ReturnType<GetState>>,
  actions: CurrentActions
) => {
  const nextActions = {} as Actions<CurrentActions>;
  for (const prop in actions) {
    nextActions[prop] = createAction(actions[prop], set, get);
  }
  return nextActions;
};
