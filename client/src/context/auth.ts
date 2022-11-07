import avatar from '@/assets/images/default-avatar.jpg';
import { IuserInfoContext } from '@/interfaces/context';
import { IuserInfo } from '@/interfaces/userInfo';
import { createContext } from 'react';

export const initialAuthState: IuserInfo = { name: '冒险家', avatar: avatar, id: -1, role: 'guest' };
export const AuthContext = createContext<IuserInfoContext | null>(null);