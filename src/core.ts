export function createStore<State extends object>(customState: State) {
  const subscribers = new Set<(state: State) => any>();
  return {
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
    subscribe(callback: (state: State) => any) {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
  };
}
