import { consumer } from "@uppercod/consume-generator";

type Getter<State> = (state: State) => any;

interface Getters<State> {
  [prop: string]: Getter<State>;
}

interface Actions<State> {
  [prop: string]: (state: State, param: any) => any;
}

interface State {
  [prop: string]: any;
}

type MapGetters<G extends Getters<any>> = {
  [I in keyof G]: G[I] extends (state: any) => infer T ? T : any;
};

type MapActions<A extends Actions<any>> = {
  [I in keyof A]: A[I] extends (state: any, param?: infer P) => infer R
    ? (param: P) => Promise<R>
    : () => Promise<void>;
};

export type InterfaceStore = Store<any, any, any>;

export class Store<
  S extends State,
  A extends Actions<S>,
  G extends Getters<S>,
  state = S & MapGetters<G>
> {
  state: state;
  actions: MapActions<A>;
  #state: S;
  #actions: A;
  #getters: G;
  #delegate: InterfaceStore;
  #subs: Set<(state: state) => any>;
  constructor(
    state: S,
    { actions, getters }: { actions?: A; getters?: G } = {}
  ) {
    this.#state = state;
    this.#actions = actions;
    this.#getters = getters;
    this.#subs = new Set();
    this.state = this.createProxyState();
    this.actions = this.createProxyActions();
  }
  createProxyState() {
    return new Proxy(this, {
      get: (target, prop: any) => {
        if (prop in this.#state) {
          return this.#state[prop];
        } else if (this.#getters && prop in this.#getters) {
          return this.#getters[prop](this.#state);
        } else if (this.#delegate) {
          return this.#delegate.state[prop];
        }
      },
    }) as any;
  }
  createProxyActions() {
    return new Proxy(this, {
      get: (target, prop: any) => {
        return (param) => {
          if (this.#actions && prop in this.#actions) {
            return consumer(this.#actions[prop], param, {
              get: () => this.#state,
              set: (nextState) => {
                this.#state = nextState;
                this.update();
              },
            });
          } else if (this.#delegate) {
            return this.#delegate.actions[prop];
          }
        };
      },
    }) as any;
  }
  update = () => this.#subs.forEach((listener) => listener(this.#state as any));
  on = (listener: (state: state) => any) => {
    this.#subs.add(listener);
    return () => this.#subs.delete(listener);
  };
  delegate = (store: InterfaceStore) => {
    if (store != this.#delegate) {
      store.on(this.update);
    }
    this.#delegate = store;
  };
}
