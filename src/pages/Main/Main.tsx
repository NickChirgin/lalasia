import React from 'react';
import { useEffect } from 'react';
import CardList from '@components/CardList/';
import Header from '@components/Header';
import leftarrow from '@img/leftarrow.svg';
import rightarrow from '@img/rightarrow.svg';
import MainPageStore from '@store/MainPageStore';
import { useQueryParamsStore } from '@store/RootStore/hooks/useQueryParamsStore';
import useLocalStore from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import Search from './components/Search';
import mainStyle from './Main.module.scss';

function Main() {
  useQueryParamsStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const mainPageStore = useLocalStore(() => new MainPageStore());
  const clickHandler = (page: number): void => {
    if (searchParams.get('search')) {
      setSearchParams({
        search: searchParams.get('search') as string,
        page: String(page),
      });
    } else {
      setSearchParams({
        page: String(page),
      });
    }
  };
  useEffect(() => {
    mainPageStore.setProducts();
  }, [mainPageStore]);
  return (
    <>
      <Header />
      <Search
        count={mainPageStore.filteredProducts.length}
        store={mainPageStore}
      />
      <CardList products={mainPageStore.paginatedProducts}></CardList>
      <div className={mainStyle.pagination}>
        {/* <img
          className={mainStyle.pagination__image}
          src={leftarrow}
          alt="left arrow"
        /> */}
        <div className={mainStyle.pagination__wrapper}>
          {mainPageStore.pagesAmount.map((page) => (
            <div
              className={`${mainStyle.pagination__wrapper_page} ${
                page === Number(searchParams.get('page')) &&
                mainStyle.pagination__wrapper_current
              }`}
              key={page}
              onClick={() => clickHandler(page)}
            >
              {page}
            </div>
          ))}
        </div>
        {/* <img
          className={mainStyle.pagination__image}
          src={rightarrow}
          alt="right arrow"
        /> */}
      </div>
    </>
  );
}

export default observer(Main);
