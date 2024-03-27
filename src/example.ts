import { createActions } from "./actions";

const actions = createActions(
  () => {
    return { id: 100 };
  },
  (next) => {},
  {
    //addUser: (id: number) => (state) => state,
    async *login(user: { email: string; password: string }) {
      yield (state) => ({
        ...state,
        user: {
          ...user,
          loading: true,
        },
      });
      
      const result = await api("/login", user);

      return (state) => ({
        ...state,
        user: {
          ...user,
          loading: false,
          ...result,
        },
      });
    },
    // async addUsers() {
    //   return (state) => state;
    // },
  }
);

await actions.login({
  email: "pablo@gmail.com",
  password: "random",
});
