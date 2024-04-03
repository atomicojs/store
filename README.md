# @atomico/store@2

Es una solución minimalista para sincronizar el estado de aplicaciones o sistemas de componentes que requieran manejo bidireccional de datos controlada.

## Primeros pasos.

### Crear el store

Los store en Atomico son webcomponents con comportamiento similar al API de contexto de Atomico, ejemplo:

**Creacion del store**

```tsx
import { createContext } from "@atomico/store";
const MyStore = createContext({ counter: 0 });

customElements.define("my-store", MyStore);
```

**Definicion del store**

```tsx
import { c } from "atomico";
import { MyStore } from "./my-store";

export const MyApp = c(() => {
  return (
    <host shadowDom>
      <MyStore state={{ counter: 0 }}>
        <slot />
      </MyStore>
    </host>
  );
});
```

En el codigo anterior hemos diponibilizado el store para todo hijo del webcomponente.

## Consumo del store y reactividad.

```tsx
import { c } from "atomico";
import { useStore } from "@atomico/store";
import { MyStore } from "./my-store";

export const MyForm = c(() => {
  const store = useStore(MyStore);
  return (
    <host shadowDom>
      <h1>counter: {store.counter}</h1>
      <button onclick={() => store.counter++}>Increment</button>
    </host>
  );
});
```

Como notaras tiene la libertad de actualizar el store facilmente gracias al api de Proxy.

## ¿manejo bidireccional de estados?

Si conoces el api de contexto de Atomico sabrás que esta es unidireccional osea el padre despacha actualizaciones al hijo. @atomico/store es bidirecional permitiendo que todo consumidor del store se sincronice osea el padre puede despachar actualizaciones al hijo y el hijo puede despachar actualizaciones al padre.
