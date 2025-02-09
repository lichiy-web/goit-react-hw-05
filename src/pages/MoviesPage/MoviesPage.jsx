import { useEffect, useState } from 'react';
import css from './MoviesPage.module.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchBar from '../../components/SearchBar/SearchBar';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useSearchParams } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';

const firstPage = 1;

const MoviesPage = () => {
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

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = e => {
    // console.log('handleSubmit is called...');
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
        console.log(results, total_pages);
        setMovies(prev => [...prev, ...results]);
      })
      .catch(err => {
        console.error(err);
        if (e.status === '404') {
          navigate('/404', { replace: true });
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  return (
    <>
      <h1>Movies Page</h1>
      <SearchBar query={query} onSubmit={handleSubmit} />
      <MovieList movies={movies} state={location} />
      {!!movies.length && !isLastPage && (
        <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={isLoading} />
      )}
      {isEmpty && (
        <Notification>
          There are no matches for your search query...
        </Notification>
      )}
      <Loader isLoading={isLoading} strokeColor="#000000" />
      {isError && <ErrorMessage />}
    </>
  );
};
export default MoviesPage;
