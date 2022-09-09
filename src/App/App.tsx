import React from 'react';
import { routes } from '@config/routes';
import Main from '@pages/Main';
import Product from '@pages/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.root} element={<Main />} />
        <Route path={routes.product.mask} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
