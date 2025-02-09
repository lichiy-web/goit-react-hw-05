import css from './MovieDetailsPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getImgUrl, getMovieDetails } from '../../services/api';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId)
      .then(({ data }) => {
        console.log(data);
        setMovie(data);
      })
      .catch(e => {
        console.error(e);
        setIsError(true);
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
  if (!movie) return <div>Loading...</div>;
  return (
    <div className={css.movieDetails}>
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
      <p className={css.movieOverview}>{overview}</p>
    </div>
  );
};
export default MovieDetailsPage;
