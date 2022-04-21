import { Store } from "../src/store";

import * as Actions from "./actions";
import * as ActionsClock from "./action-time";

export default new Store(
  (): Actions.State & ActionsClock.State => ({
    api: "",
    cart: {},
    products: [],
    time: new Date(),
    search: "",
  }),
  {
    actions: { ...Actions, ...ActionsClock },
    getters: {
      total: ({ cart }) =>
        Object.values(cart).reduce(
          (currentTotal, { total, product }) =>
            currentTotal + product.price * total,
          0
        ),
      filter: ({ search, products }) =>
        products.filter(({ name }) =>
          name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ),
    },
  }
);
