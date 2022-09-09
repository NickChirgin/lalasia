import React from 'react';
import 'regenerator-runtime';
import '@config/configureMobX';
import ReactDOM from 'react-dom/client';
import '@styles/index.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

if (module.hot) {
    module.hot.accept();
}