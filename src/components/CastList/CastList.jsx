import { getImgUrl } from '../../services/api';
import css from './CastList.module.css';
import Notification from '../Notification/Notification';

const CastList = ({ cast }) => {
  if (!cast.length)
    return (
      <Notification>
        There is no information about the movie cast or it's a cartoon
      </Notification>
    );
  return (
    <ul className={css.castList}>
      {cast.map(({ cast_id, name, character, profile_path }) => {
        return (
          <li key={cast_id} className={css.castItem}>
            {profile_path && (
              <img
                src={getImgUrl(profile_path, 'profile', 'm')}
                alt={`The photo of ${name}`}
              />
            )}
            <span className={css.actorName}>{name}</span>
            <span className={css.character}>Character: {character}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default CastList;
