import { createContext, useContext } from 'react';

const ModeContext = createContext();
export default ModeContext;
// eslint-disable-next-line react-refresh/only-export-components
export const useModeContext = () => useContext(ModeContext);
