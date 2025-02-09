import css from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../services/api';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getTrendingMovies()
      .then(({ data }) => {
        setIsLoading(true);
        console.log(data);
      })
      .catch(e => {
        console.error(e);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};
export default HomePage;
