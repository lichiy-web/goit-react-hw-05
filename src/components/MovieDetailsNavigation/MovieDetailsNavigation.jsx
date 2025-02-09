import css from './MovieDetailsNavigation.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsNavigation = ({ state }) => {
  return (
    <ul className={css.movieDetailsNavigation}>
      <li>
        <NavLink className={buildLinkClass} to="cast">
          Cast
        </NavLink>
      </li>
      <li>
        <NavLink className={buildLinkClass} to="reviews">
          Reviews
        </NavLink>
      </li>
    </ul>
  );
};
export default MovieDetailsNavigation;
