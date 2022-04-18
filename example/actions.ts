export interface Product {
  amazon_link: string;
  asin: string;
  available: true;
  brand_id: number;
  brand_name: string;
  category: string[];
  comments_count: number;
  id: number;
  image: string;
  image_key: string;
  name: string;
  name_without_brand: string;
  postings_count: number;
  price: number;
  prime: boolean;
  slug: string;
}

export interface State {
  api: string;
  cart: {
    [id: number]: {
      product: Product;
      total: number;
      loading: boolean;
      disabled?: boolean;
    };
  };
  products: Product[];
}

const delay = <A>(data?: A, ms = 300) =>
  new Promise<A>((resolve) => setTimeout(resolve, ms, data));

export async function* get({ api }: State) {
  return {
    ...(yield),
    products: await (await fetch(api)).json(),
  };
}

export async function* calc(
  state: State,
  { id, value }: { id: number | string; value: number }
) {
  const { products } = state;
  const product = products.find((product) => product.id === id);
  const cartId = state.cart[id] || { product, total: 0 };

  yield {
    ...state,
    cart: {
      ...state.cart,
      [id]: {
        ...cartId,
        loading: true,
      },
    },
  };

  const dataStock = await delay({ stock: 3 }, 500);

  state = yield;

  const lastCountId = state.cart[id];
  const nextStock = lastCountId.total + value;
  const disabled = nextStock >= dataStock.stock;

  return {
    ...state,
    cart: {
      ...state.cart,
      [id]: {
        ...lastCountId,
        total: disabled ? dataStock.stock : nextStock,
        disabled,
        loading: false,
      },
    },
  };
}
