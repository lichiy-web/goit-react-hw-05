import css from './MovieCast.module.css';
import { Link, Outlet } from 'react-router-dom';

const MovieCast = () => {
  return (
    <div>
      <h1>Movie cast</h1>
      <nav>
        <ul>
          <li>
            <Link to="/movie"></Link>
          </li>
          <li></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
export default MovieCast;
