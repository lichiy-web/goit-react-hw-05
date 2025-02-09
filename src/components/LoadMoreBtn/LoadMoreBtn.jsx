import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore, isLoading }) => {
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      {isLoading ? 'Loading...' : 'Show more'}
    </button>
  );
};
export default LoadMoreBtn;
