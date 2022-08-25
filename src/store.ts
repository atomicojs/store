import { consume, Cycle } from "./consume";

type GetAction<Action, State> = Action extends (
  state: any,
  payload: infer Payload
) => infer Result
  ? (
      payload?: Payload
    ) => Result extends Promise<any>
      ? Cycle<State>
      : Result extends AsyncGenerator
      ? Cycle<State>
      : State
  : any;

type GetActions<Actions, State> = {
  [I in keyof Actions]: GetAction<Actions[I], State>;
};

export interface Store<State = any, Actions = any> {
  get state(): State;
  set state(value: State);
  actions: GetActions<Actions, State>;
  on(handler: (state: State) => any): () => void;
  clone(sync: (state: State) => State): Store<State, Actions>;
}

export function createStore<
  State,
  Actions extends {
    [index: string]: (
      state: State,
      payload?: any
    ) => State | Promise<State> | AsyncGenerator<State, State, State>;
  }
>(scopeState: State, scopeActions?: Actions): Store<State, Actions> {
  const handlers = new Set<(state: State) => any>();

  const actions = {} as GetActions<Actions, State>;

  const emit = () => handlers.forEach((handler) => handler(scopeState));

  const set = (state: State) => {
    if (state === scopeState) return scopeState;

    scopeState = state;
    emit();

    return scopeState;
  };

  for (let prop in scopeActions) {
    const action = scopeActions[prop];
    //@ts-ignore
    actions[prop] = (payload) =>
      consume(action(scopeState, payload), {
        set,
        get() {
          return scopeState;
        },
      });
  }

  return {
    get state() {
      return scopeState;
    },
    set state(state) {
      set(state);
    },
    actions,
    on: (handler) => handlers.add(handler) && (() => handlers.delete(handler)),
    clone: (sync) =>
      createStore<State, Actions>(
        sync ? sync(scopeState) : scopeState,
        scopeActions
      ),
  };
}
