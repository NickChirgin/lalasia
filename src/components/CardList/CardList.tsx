import React from 'react';
import Card from '@components/Card';
import { CardsModel } from '@store/models/product/cards';
import { observer } from 'mobx-react-lite';

import cardListStyle from './CardList.module.scss';

export type CardsProps = {
  products: CardsModel[];
};

const CardList: React.FC<CardsProps> = ({ products }) => {
  return (
    <>
      <div className={cardListStyle.products__cardslist}>
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            category={product.category}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </>
  );
};

export default observer(CardList);
