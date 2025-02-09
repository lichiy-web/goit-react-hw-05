// import MovieItem from '../MovieItem/MovieItem';
import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies, state }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`} state={state}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default MovieList;
