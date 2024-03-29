export * from "./actions";
import { createActions, ActionCollections } from "./actions";

export const createStore = <State, Actions extends ActionCollections<State>>(
  state: State,
  actions?: Actions
) => {
  const subscribers = new Set<(state: State) => any>();

  return {
    actions: createActions(
      () => {
        return state;
      },
      (nextState) => {
        if (nextState != state) {
          state = nextState;
          subscribers.forEach((subscribeCallback) => subscribeCallback(state));
        }
      },
      actions
    ),
    subscribe(subscribeCallback: (state: State) => any) {
      subscribers.add(subscribeCallback);
      return () => subscribers.delete(subscribeCallback);
    },
    get state() {
      return state;
    },
  };
};
