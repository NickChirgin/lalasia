import Loader from '@components/Loader';

export type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
};

const WithLoader: React.FC<LoaderProps> = ({ children, loading }) => {
  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default WithLoader;
