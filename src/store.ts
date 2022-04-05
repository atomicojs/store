import { consumer } from "@uppercod/consume-generator";

export type Getter<State> = (state: State) => any;

export interface Getters<State, G = GetInitialState<State>> {
  [prop: string]: Getter<G>;
}

export interface Actions<State, A = GetInitialState<State>> {
  [prop: string]: (state: A, param: any) => any;
}

export type State<S extends InitialState, G = null> = G extends null
  ? GetInitialState<S>
  : GetInitialState<S> & MapGetters<GetInitialState<S>>;

export type InitialState =
  | (() => any)
  | {
      [prop: string]: any;
    };

export type GetInitialState<S> = S extends () => infer R ? R : S;

export type MapGetters<G extends Getters<any>> = {
  [I in keyof G]: G[I] extends (state: any) => infer T ? T : any;
};

export type MapActions<A extends Actions<any>> = {
  [I in keyof A]: A[I] extends (state: any, param?: infer P) => infer R
    ? (param?: P) => Promise<R>
    : () => Promise<void>;
};

export interface InterfaceStore<S = any, A = any> {
  state: S;
  actions: {
    [I in keyof A]: A[I] extends (param: infer Param) => infer R
      ? (param: Param) => Promise<R>
      : (param: A[I]) => Promise<void>;
  };
  on(handler: (state: S) => any): () => void;
}

export class Store<
  S extends InitialState,
  A extends Actions<S>,
  G extends Getters<S>
> {
  state: State<S, G>;
  actions: MapActions<A>;
  #state: GetInitialState<S>;
  #actions: A;
  #getters: G;
  #subs: Set<(state: S & MapGetters<G>) => any>;
  constructor(
    state: S,
    { actions, getters }: { actions?: A; getters?: G } = {}
  ) {
    this.#state = typeof state === "function" ? state() : state;
    this.#actions = actions;
    this.#getters = getters;
    this.#subs = new Set();
    this.state = this.createProxyState();
    this.actions = this.createProxyActions();
  }
  createProxyState() {
    return new Proxy(this, {
      get: (target, prop: any) => {
        if (this.#getters && prop in this.#getters) {
          return this.#getters[prop](this.#state);
        }
        return this.#state[prop];
      },
    }) as any;
  }
  createProxyActions() {
    return new Proxy(this, {
      get: (target, prop: any) => {
        return (param: any) =>
          consumer(this.#actions[prop], param, {
            get: () => this.#state,
            set: (nextState) => {
              if (nextState) {
                this.#state = nextState;
                this.#subs.forEach((listener) => listener(this.#state as any));
              }
            },
          });
      },
    }) as any;
  }
  on = (listener: (state: S & MapGetters<G>) => any) => {
    this.#subs.add(listener);
    return () => this.#subs.delete(listener);
  };
}
