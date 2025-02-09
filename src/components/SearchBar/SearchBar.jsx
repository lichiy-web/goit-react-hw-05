import { useState } from 'react';
import css from './SearchBar.module.css';
import { ImSearch } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ onSubmit }) => {
  const [typingQuery, setTypingQuery] = useState('');
  const handleChange = e => {
    // console.log('handleChange is called...');
    setTypingQuery(e.target.value);
  };
  const resetTypingQuery = () => {
    setTypingQuery('');
  };

  return (
    <form className={css.searchBar} onSubmit={onSubmit}>
      <div className={css.searchBox} tabIndex={1}>
        <div className={css.searchInputGroup}>
          <input
            className={css.searchInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={typingQuery}
          />
          {typingQuery !== '' && (
            <button
              type="button"
              className={css.resetBtn}
              onClick={resetTypingQuery}
            >
              <IoMdClose />
            </button>
          )}
        </div>
        <button type="submit" className={css.searchBtn}>
          <div className={css.searchIcon}>
            <ImSearch />
          </div>
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
