import { IauthorInfoContext } from '@/interfaces/context';
import { createContext } from 'react';

export const AuthorContext = createContext<IauthorInfoContext | null>(null);