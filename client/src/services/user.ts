import { IloginBody, IregisterBody } from '@/interfaces/request';
import { IloginResponse, IuserResponse } from '@/interfaces/response';
import Request from './index';

const request = new Request();

export const login = (data: IloginBody) => {
  return request.post<IloginResponse>('/auth/login', data);
};

export const register = (data: IregisterBody) => {
  return request.post('/user/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getUserById = (id: number) => {
  return request.get<IuserResponse>(`user/${id}`);
};
