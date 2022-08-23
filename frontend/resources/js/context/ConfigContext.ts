import { createContext } from 'preact';
import { ContextType } from '../types';

const ConfigContext = createContext<ContextType|undefined>(undefined);
export default ConfigContext;
