import clsx from 'clsx';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink className={buildLinkClass} to="/movies">
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
