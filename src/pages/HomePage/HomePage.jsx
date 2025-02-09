import css from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
// import MoviesPage from '../MoviesPage/MoviesPage';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

const firstPage = 1;

const HomePage = () => {
  const [page, setPage] = useState(firstPage);
  const [movies, setMovies] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLoadMore = () => {
    setIsError(false);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getTrendingMovies('day', page)
      .then(({ data }) => {
        const { results, total_pages } = data;
        if (page === total_pages) {
          setIsLastPage(true);
        }
        // console.log('movies =>', movies);

        setMovies(prev => [...prev, ...results]);
      })
      .catch(e => {
        console.error(e);
        if (e.status === 404) {
          navigate('/404', { replace: true });
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);
  return (
    <div>
      <h1>Home Page</h1>
      <MovieList movies={movies} state={location} />
      {!!movies.length && !isLastPage && (
        <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={isLoading} />
      )}
      <Loader isLoading={isLoading} strokeColor="#000000" />
      {isError && <ErrorMessage />}
    </div>
  );
};
export default HomePage;
