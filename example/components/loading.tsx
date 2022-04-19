import { c, css } from "atomico";

function loading() {
  return (
    <host shadowDom>
      <slot></slot>
    </host>
  );
}

loading.props = {
  show: { type: Boolean, reflect: true },
};

loading.styles = css`
  :host {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    z-index: 2;
    backdrop-filter: blur(10px);
    visibility: hidden;
    transition: 0.5s ease all;
    background: repeating-linear-gradient(45deg, #ab1cff, transparent);
    opacity: 0;
    display: grid;
    place-content: center;
    color: white;
  }
  :host([show]) {
    visibility: visible;
    opacity: 1;
  }
`;

export const Loading = c(loading);

customElements.define("app-loading", Loading);
