import { useEffect, useRef, useState } from 'react';
import css from './MoviesPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchBar from '../../components/SearchBar/SearchBar';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useSearchParams } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';
import { useModeContext } from '../../components/ToggleDevMode/ModeContext';

const firstPage = 1;

const MoviesPage = () => {
  const { isDevMode } = useModeContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(firstPage);
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('query'));
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const isFirstMount = useRef(true);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newQuery = e.target.elements.search.value;
    if (newQuery.trim() === '') {
      toast.error('Search query cannot be empty!', {
        duration: 4000,
      });
      return;
    }
    // setPerPage(defaultPerPage);
    setPage(firstPage);
    setIsLoading(false);
    setIsError(false);
    setIsEmpty(false);
    setIsLastPage(false);
    setMovies([]);
    updateSearchParams('query', newQuery);
    setQuery(newQuery);
  };

  const handleLoadMore = () => {
    setIsError(false);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (isDevMode && isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (!query) return;
    setIsLoading(true);
    searchMovies(query, page)
      .then(({ data }) => {
        const { results, total_pages } = data;
        if (page === total_pages) {
          setIsLastPage(true);
        }
        if (!results.length) {
          setIsEmpty(true);
          setPage(firstPage);
          setQuery('');
        }
        setMovies(prev => [...prev, ...results]);
      })
      .catch(e => {
        console.error(e);
        if (e.status === '404') {
          navigate('/404', { replace: true });
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page, isDevMode, navigate]);

  return (
    <>
      <SearchBar query={query} onSubmit={handleSubmit} />
      <div className={css.content}>
        <MovieList movies={movies} state={location} />
        {!!movies.length && !isLastPage && (
          <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={isLoading} />
        )}
        {isEmpty && (
          <Notification>
            There are no matches for your search query...
          </Notification>
        )}
        <Loader isLoading={isLoading} />
        {isError && <ErrorMessage />}
      </div>
    </>
  );
};
export default MoviesPage;
