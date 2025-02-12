import ModeContext from './ModeContext';
import css from './ToggleDevMode.module.css';
import { StrictMode, useState } from 'react';

const ToggleDevMode = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState(
    JSON.parse(localStorage.getItem('isDevMode')) ?? false
  );
  return (
    <ModeContext.Provider value={{ isDevMode: isDevMode }}>
      {isDevMode ? <StrictMode>{children}</StrictMode> : children}
      <button
        className={css.toggleDevMode}
        onClick={() =>
          setIsDevMode(prev => {
            localStorage.setItem('isDevMode', !prev);
            return !prev;
          })
        }
      >
        {isDevMode ? 'DEV' : 'PROD'}
      </button>
    </ModeContext.Provider>
  );
};
export default ToggleDevMode;
