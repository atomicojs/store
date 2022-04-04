import { c } from "atomico";
import { Store } from "../src/store";
import { StoreProvider, StoreConsumer } from "../src/components";

function app() {
  const store = new Store(
    { count: 1 },
    {
      actions: {
        increment(state) {
          console.log(state);
          return state;
        },
      },
    }
  );

  return (
    <host>
      <StoreProvider store={store}></StoreProvider>
    </host>
  );
}

customElements.define("my-app", c(app));
