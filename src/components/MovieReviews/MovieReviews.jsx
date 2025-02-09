import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ReviewsList from '../ReviewsList/ReviewsList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const firstPage = 1;
const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(firstPage);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setIsError(false);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getMovieReviews(movieId, page)
      .then(({ data }) => {
        const { results, total_pages } = data;
        // console.log(data);
        if (page === total_pages) setIsLastPage(true);
        setReviews(prev => [...prev, ...results]);
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
  }, [movieId]);
  return (
    <div className={css.movieReviews}>
      <h2 className={css.reviewsTitle}>Movie Reviews</h2>
      <ReviewsList reviews={reviews} />
      {!!reviews.length && !isLastPage && (
        <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={isLoading} />
      )}
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}
    </div>
  );
};
export default MovieReviews;
