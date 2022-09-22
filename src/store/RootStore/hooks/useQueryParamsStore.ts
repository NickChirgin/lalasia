import { useLocation } from 'react-router-dom';

import rootStore from '../instance';

export const useQueryParamsStore = (): void => {
  const { search } = useLocation();
  rootStore.query.setSearch(search);
};
