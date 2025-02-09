import clsx from 'clsx';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="/movies">
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
