import { State } from "atomico";
import { createActions, ActionCollections } from "./actions";

export const createStore = <State, Actions extends ActionCollections<State>>(
  state: State,
  actions?: Actions
) => {
  return createActions(
    () => {
      return state;
    },
    (state) => {},
    actions
  );
};

const Store = createStore(
  { value: 0 },
  {
    increment:
      () =>
      ({ value }) => ({ value: value + 1 }),
    decrement:
      () =>
      ({ value }) => ({ value: value - 1 }),
  }
);

Store.increment();
