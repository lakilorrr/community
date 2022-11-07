import { IpostDetailContext } from '@/interfaces/context';
import { createContext } from 'react';

export const PostsContext = createContext<IpostDetailContext | null>(null)
