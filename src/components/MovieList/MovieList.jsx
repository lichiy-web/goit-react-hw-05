// import MovieItem from '../MovieItem/MovieItem';
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link to={`movies/${id}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
};
export default MovieList;
