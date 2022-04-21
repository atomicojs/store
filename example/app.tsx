import { css, c, useEffect } from "atomico";
import Store from "./store";
import { useActionObserver, useStore } from "../src/hooks";
import { Scroll } from "formilk";
import tokens from "formilk/tokens";
import { AppHeader } from "./app-header";
import { AppProducts } from "./app-products";

function app() {
  const store = useStore(Store, {
    api: "https://gist.githubusercontent.com/UpperCod/88f8ca5d8a43a59632124ebaf3aa08df/raw/db019d98c63d7310e8fb1444eb45cc1ffd46c698/canopy.json",
    cart: {},
    products: [],
  });

  useEffect(() => store.actions.get().expire, []);

  useEffect(() => store.actions.clock().expire, []);

  return (
    <host shadowDom>
      <AppHeader></AppHeader>
      <Scroll>
        <AppProducts></AppProducts>
      </Scroll>
    </host>
  );
}

app.styles = [
  tokens,
  css`
    :host {
      display: grid;
      position: relative;
      height: 100%;
      grid-template: 80px 1fr/ 1fr;
    }
  `,
];

customElements.define("my-app", c(app));
