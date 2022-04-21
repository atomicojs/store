import { consumer, Cycle } from "@uppercod/consume-generator";

export { Cycle } from "@uppercod/consume-generator";

export type Getter<State> = (state: State) => any;

export interface Getters<State, G = GetInitialState<State>> {
  [prop: string]: Getter<G>;
}

export interface Actions<State, A = GetInitialState<State>> {
  [prop: string]: (state: A, param: any) => any;
}

export type State<S extends InitialState> = GetInitialState<S>;

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
    ? (param?: P) => Cycle<R>
    : () => Cycle<void>;
};

export interface InterfaceStore<S = any, A = any> {
  id: Symbol;
  state: S;
  actions: {
    [I in keyof A]: A[I] extends (param: infer Param) => infer R
      ? (param: Param) => Promise<R>
      : (param: A[I]) => Promise<void>;
  };
  on(handler: (state: S) => any): () => void;
  clone(props: InitialState): any;
  clean(): void;
}

const getState = (state: InitialState) =>
  typeof state === "function" ? state() : state;

export class Store<
  S extends InitialState,
  A extends Actions<S>,
  G extends Getters<S>
> {
  id: Symbol;
  state: State<S> & MapGetters<G>;
  actions: MapActions<A>;
  #state: GetInitialState<S>;
  #actions: A;
  #getters: G;
  #subs: Set<(state: State<S> & MapGetters<G>) => any>;
  #task: Set<Set<Cycle>>;
  constructor(
    state: S,
    { actions, getters }: { actions?: A; getters?: G } = {},
    id: Symbol = Symbol()
  ) {
    this.#state = getState(state);
    this.#actions = actions;
    this.#getters = getters;
    this.#subs = new Set();
    this.#task = new Set();
    this.id = id;
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
    return Object.entries(this.#actions || {}).reduce(
      (actions, [prop, action]) => {
        let task = new Set<Cycle>();

        this.#task.add(task);

        actions[prop] = (param: any) => {
          const id = consumer<S>(action, param, {
            get: () => this.#state,
            set: (nextState: any) => {
              if (nextState != null) {
                this.#state = nextState;
                this.#subs.forEach((listener) => listener(this.#state as any));
              }
            },
          });

          task.add(id);

          const expire = () => {
            task.delete(id);
            id.expire();
          };

          id.then(expire, expire);

          return id;
        };

        return actions;
      },
      {}
    ) as MapActions<A>;
  }
  on = (listener: (state: State<S> & MapGetters<G>) => any) => {
    this.#subs.add(listener);
    return () => this.#subs.delete(listener);
  };
  clone = (state?: GetInitialState<S>): Store<S, A, G> =>
    new (this.constructor as any)(
      { ...this.#state, ...getState(state) },
      {
        actions: this.#actions,
        getters: this.#getters,
      },
      this.id
    );
  clean = () =>
    this.#task.forEach((task) =>
      task.forEach((id) => {
        id.expire();
        task.delete(id);
      })
    );
}
