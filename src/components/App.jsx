// import { useState, useEffect, useRef, useId } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import Navigation from './Navigation/Navigation';
import MovieCast from './MovieCast/MovieCast';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MovieReviews from './MovieReviews/MovieReviews';

function App() {
  return (
    <div className="main-container">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
