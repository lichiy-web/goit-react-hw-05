import css from './MovieDetailsPage.module.css';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getImgUrl, getMovieDetails } from '../../services/api';
import MovieDetailsNavigation from '../../components/MovieDetailsNavigation/MovieDetailsNavigation';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { PiArrowCircleLeftDuotone } from 'react-icons/pi';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackUrl = useRef(location.state ?? '/movies');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(movieId)
      .then(({ data }) => {
        // console.log(data);
        setMovie(data);
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

  const {
    title,
    runtime,
    overview,
    poster_path,
    genres,
    backdrop_path,
    adult,
    release_date,
    video,
    vote_average,
    vote_count,
    production_countries,
    production_companies,
  } = movie ?? {};
  let def; // for default in the function parameters
  if (!movie) return <Loader isLoading={isLoading} />;
  return (
    <div className={css.content}>
      <Link className={css.goBackBtn} to={goBackUrl.current}>
        <PiArrowCircleLeftDuotone />
        <span>Go back</span>
      </Link>
      <h1 className={css.movieTitle}>{title}</h1>
      <div className={css.movieInfo}>
        <div className={css.posterItem}>
          <img
            className={css.moviePoster}
            src={getImgUrl(poster_path, def, 'l')}
            alt={title}
          />
        </div>
        <ul className={css.infoItem}>
          <li className={css.infoRow}>
            <div className={css.infoTitle}>Year</div>
            <div className={css.valueItem}>
              {new Date(release_date).getFullYear()}
            </div>
          </li>
          <li className={css.infoRow}>
            <div className={css.infoTitle}>Genre</div>
            <div className={css.valueItem}>
              {genres.map(({ name }) => name).join(', ')}
            </div>
          </li>
          <li className={css.infoRow}>
            <div className={css.infoTitle}>Duration</div>
            <div className={css.valueItem}>{runtime} min</div>
          </li>
        </ul>
      </div>

      <hr className={css.horizontalRule} />
      <p className={css.movieOverview}>{overview}</p>
      <hr className={css.horizontalRule} />
      <MovieDetailsNavigation />
      <Outlet />
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}
    </div>
  );
};
export default MovieDetailsPage;
