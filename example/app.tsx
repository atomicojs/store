import { c, useEffect } from "atomico";
import { Store } from "../src/store";
import { useStore, useActionObserver } from "../src/hooks";
import { Button, Grid, Dropdown, InputCounter } from "formilk";
import * as actions from "./actions";

const simulateFetch = (value: any) =>
  new Promise((resolve) => setTimeout(resolve, 100, value));

const store = new Store(
  {
    endpoint: `https://example-data.draftbit.com/products?_limit=10`,
    page: 1,
    products: [],
    cart: new Map<string | number, number>(),
  },
  {
    actions: actions,
  }
);

function app() {
  useStore(store);
  const [actionRead, statusRead] = useActionObserver(store.actions.read);
  const [actionNext, statusNext] = useActionObserver(store.actions.next);
  const [actionPrev, statusPrev] = useActionObserver(store.actions.prev);
  useEffect(actionRead, []);
  console.log({ statusNext, statusPrev, statusRead });
  return (
    <host>
      <Grid model="cols(auto auto auto) height(100px) content(center) gap">
        <Button onclick={actionPrev}>
          <strong>Prev</strong>
        </Button>
        <Dropdown showWithOver width="280px">
          <Button slot="action">
            <strong>Cart</strong>
          </Button>
          <Grid model="padding">
            {[...store.state.cart].map(([id, count]) => {
              const product = store.state?.products.find(
                (product) => product.id === id
              );
              return (
                <Grid>
                  <h4>{product.name}</h4>
                  <Grid model="cols(auto auto) content(center)">
                    <span>quantity</span>
                    <InputCounter></InputCounter>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Dropdown>
        <Button onclick={actionNext}>
          <strong>Next</strong>
        </Button>
      </Grid>
      <Grid>
        <Grid model="cols(1fr) gap(xl) padding(xl), cols(1fr 1fr) 520px, cols(1fr 1fr 1fr 1fr) 768px">
          {store.state?.products.map((product) => (
            <Grid>
              <img
                width="100%"
                src={product.image_url}
                style="border-radius:var(--border-radius)"
              />
              <h3>{product.name}</h3>
              <div>
                <Button onclick={() => store.actions.addcart(product.id)}>
                  <strong>Add</strong>
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </host>
  );
}

customElements.define("my-app", c(app));
