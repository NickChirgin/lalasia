import React from 'react';
import { useEffect } from 'react';

import Button from '@components/Button';
import { ButtonColor } from '@components/Button/Button';
import Card from '@components/Card';
import Header from '@components/Header';
import ProductStore from '@store/ProductStore';
import useLocalStore from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import productStyle from './Product.module.scss';

const Product: React.FC = () => {
  const { id } = useParams();
  const productStore = useLocalStore(() => new ProductStore());

  useEffect(() => {
    productStore.fetchProducts(id);
  }, [id, productStore]);
  return (
    <div className={productStyle.product_page}>
      <Header />
      <div className={productStyle.product}>
        <img
          src={productStore.product?.image}
          alt={productStore.product?.title}
          className={productStyle['product-image']}
        />
        <div className={productStyle.product__info}>
          <p className={productStyle.product__info_title}>
            {productStore.product?.title}
          </p>
          <p className={productStyle.product__info_subtitle}>
            Combination of wood and wool
          </p>
          <p className={productStyle.product__info_color}>Color</p>
          <div className={productStyle.product__info_colors}>
            <div className={productStyle['product__info_colors-div'] + " " + productStyle.black}></div>
            <div className={productStyle['product__info_colors-div'] + " " + productStyle.green}></div>
            <div className={productStyle['product__info_colors-div'] + " " + productStyle.orange}></div>
            <div className={productStyle['product__info_colors-div'] + " " + productStyle.grey}></div>
          </div>
          <p className={productStyle.product__info_description}>
            {productStore.product?.description}
          </p>
          <p className={productStyle.product__info_price}>
            {'$' + productStore.product?.price}
          </p>
          <div className={productStyle.product__info_buttons}>
            <Button loading={productStore.loading} children="Buy Now" className={productStyle['product__info_buttons-first']}/>
            <Button
              loading={productStore.loading}
              children="Add to Chart"
              color={ButtonColor.secondary}
            />
          </div>
        </div>
      </div>
      <div className={productStyle.product__related}>
        <p className={productStyle.product__related_title}>Related Items</p>
        <div className={productStyle.product__related_items}>
          {productStore.relatedProducts.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(Product);
