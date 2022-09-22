import React from 'react';
import cn from 'classnames';

import loaderStyles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, size, className }) => {
  const currentSize = `loader_size-${size}`;
  const loaderClass = cn(
    className,
    loaderStyles.loader,
    loaderStyles[currentSize]
  );
  return loading ? <div className={loaderClass} /> : null;
};

Loader.defaultProps = {
  loading: true,
  size: LoaderSize.s,
};

export default Loader;
