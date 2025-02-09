import css from './MovieCast.module.css';
import { getMovieCredits } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CastList from '../CastList/CastList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieCast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const [castList, setCastList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getMovieCredits(movieId)
      .then(({ data: { cast } }) => {
        // console.log(cast);
        setCastList(cast);
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
    <div>
      <h2 className={css.castTitle}>Cast</h2>
      <CastList cast={castList} />
      <Loader isLoading={isLoading} strokeColor="#000000" />
      {isError && <ErrorMessage />}
    </div>
  );
};
export default MovieCast;
