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

export interface SchemaStore {
  api: string;
  cart: {
    [id: number]: {
      product: Product;
      total: number;
      loading: Boolean;
    };
  };
  products: Product[];
}

const delay = <A>(data?: A, ms = 300) =>
  new Promise<A>((resolve) => setTimeout(resolve, ms, data));

export async function* get({ api }: SchemaStore) {
  return {
    ...(yield),
    products: await (await fetch(api)).json(),
  };
}

export async function* calc(
  state: SchemaStore,
  { id, count }: { id: number | string; count: number }
) {
  const { products, cart } = state;

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

  const dataStock = await delay({ stock: 5 }, 2000);

  state = yield;

  const lastCountId = state.cart[id];
  const nextStock = lastCountId.total + count;

  return {
    ...state,
    cart: {
      ...state.cart,
      [id]: {
        ...lastCountId,
        total: nextStock < dataStock.stock ? nextStock : dataStock.stock,
        loading: false,
      },
    },
  };
}
