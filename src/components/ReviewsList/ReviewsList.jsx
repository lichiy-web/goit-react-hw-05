import { getImgUrl } from '../../services/api';
import css from './ReviewsList.module.css';
import Notification from '../Notification/Notification';

const ReviewsList = ({ reviews }) => {
  if (!reviews.length)
    return <Notification>There are no reviews now</Notification>;
  return (
    <ul className={css.reviewList}>
      {reviews.map(({ id, author, content, created_at }) => {
        const date = new Date(created_at);
        return (
          <li key={id} className={css.reviewItem}>
            <h3 className={css.authorName}>Author: {author}</h3>
            <p className={css.reviewContent}>{content}</p>
            <p className="reviewDate">
              {date.getDay()}.{date.getMonth() + 1}.{date.getFullYear()}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
export default ReviewsList;
