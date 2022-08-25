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

export type Store = ReturnType<typeof createStore<any, any>>;

export function createStore<
  State,
  Actions extends {
    [index: string]: (
      state: State,
      payload?: any
    ) => State | Promise<State> | AsyncGenerator<State, State, State>;
  }
>(scopeState: State, scopeActions?: Actions) {
  const handlers = new Set<(state: State) => any>();

  const actions = {} as {
    [I in keyof Actions]: GetAction<Actions[I], State>;
  };

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
    on: (handler: (state: State) => any) =>
      handlers.add(handler) && (() => handlers.delete(handler)),
    clone: (sync?: (state: State) => State) =>
      createStore<State, Actions>(
        sync ? sync(scopeState) : scopeState,
        scopeActions
      ),
  };
}
