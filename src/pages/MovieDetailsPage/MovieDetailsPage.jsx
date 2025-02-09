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
        console.log(data);
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
  if (!movie) return <Loader isLoading={isLoading} strokeColor="#000000" />;
  return (
    <div className={css.movieDetails}>
      <Link to={goBackUrl.current}>Go back</Link>
      <h1 className={css.movieTitle}>{title}</h1>
      <img
        className={css.moviePoster}
        src={getImgUrl(poster_path, def, 'm')}
        alt={title}
      />

      <div className={css.yearItem}>
        Year: {new Date(release_date).getFullYear()}
      </div>

      <ul className={css.genreList}>
        {genres.map(({ id, name }) => {
          return (
            <li key={id} className={css.genreItem}>
              {name}
            </li>
          );
        })}
      </ul>
      <p className={css.durationItem}>Duration: {runtime} min</p>
      <hr />
      <p className={css.movieOverview}>{overview}</p>
      <hr />
      <MovieDetailsNavigation />
      <Outlet />
      <Loader isLoading={isLoading} strokeColor="#000000" />
      {isError && <ErrorMessage />}
    </div>
  );
};
export default MovieDetailsPage;
