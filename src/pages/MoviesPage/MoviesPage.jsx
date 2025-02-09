import css from './MoviesPage.module.css';
import { Link, Outlet } from 'react-router-dom';

const MoviesPage = () => {
  return (
    <>
      <h1>Movies Page</h1>
      <Link to="movie/912649">Venom: The Last Dance</Link>
      <Outlet />
    </>
  );
};
export default MoviesPage;
