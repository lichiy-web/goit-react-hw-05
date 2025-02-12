import { createContext, useContext } from 'react';

const ModeContext = createContext();
export default ModeContext;
export const useModeContext = () => useContext(ModeContext);
