import { Store } from "../src/store";

import * as Actions from "./actions";

const s = new Store(
  (): Actions.SchemaStore => ({
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

export default s;
