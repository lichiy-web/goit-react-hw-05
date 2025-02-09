import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ReviewsList from '../ReviewsList/ReviewsList';

const firstPage = 1;
const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(firstPage);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getMovieReviews(movieId, page)
      .then(({ data }) => {
        const { results, total_pages } = data;
        console.log(data);
        if (page === total_pages) setIsLastPage(true);
        setReviews(prev => [...prev, ...results]);
      })
      .catch(e => {
        console.error(e);
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
      <Loader isLoading={isLoading} strokeColor="#000000" />
      {isError && <ErrorMessage />}
    </div>
  );
};
export default MovieReviews;
