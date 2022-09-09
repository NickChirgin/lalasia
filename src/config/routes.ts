export const routes = {
  root: '/',
  product: {
    mask: '/product/:id',
    createPath: (id: number) => `/product/${id}`,
  },
};
