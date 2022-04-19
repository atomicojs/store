import { Store } from "../src/store";

import * as Actions from "./actions";

export default new Store(
  (): Actions.State => ({
    api: "",
    cart: {},
    products: [],
  }),
  {
    actions: Actions,
    getters: {
      total: ({ cart }) =>
        Object.values(cart).reduce(
          (currentTotal, { total, product }) =>
            currentTotal + product.price * total,
          0
        ),
    },
  }
);
