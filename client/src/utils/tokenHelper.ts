import { IloginResponse } from '@/interfaces/response';
import Request from '@/services';

export const getRefreshToken = async (refresh: string) => {
  const request = new Request({
    headers: {
      'refresh-token': refresh,
    },
  });
  const data = await request.get<IloginResponse>('/auth/refresh');
  return data;
};

export const resetAccessStorage = async (refresh: string) => {
  localStorage.removeItem('token');
  const newToken = await getRefreshToken(refresh);
  if (!newToken.access) {
    return '';
  } else {
    localStorage.setItem('token', JSON.stringify(newToken));
    return localStorage.getItem('token') as string;
  }
};
export const isTokenExpire = (expireIn: number) => {
  const date = new Date();
  const timeStamp = date.getTime();
  return timeStamp > expireIn ? true : false;
};

export const setTokenStorage = (res: IloginResponse) => {
  const { access, accessExpireIn, refresh, refreshExpireIn } = res;
  const token = JSON.stringify({ access, accessExpireIn, refresh, refreshExpireIn });
  localStorage.setItem('token', token);
};
