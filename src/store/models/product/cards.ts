export type CardsApi = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
};

export type CardsModel = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
};

export const normalizeCards = (from: CardsApi): CardsModel => {
  return {
    id: parseInt(from.id),
    title: from.title,
    description: from.description,
    image: from.image,
    price: from.price,
    category: from.category,
  };
};
