import { IlikeResponse } from '@/interfaces/response';
import Request from './index';

const request = new Request();

export const clickLike = (post: number) => {
  return request.post<IlikeResponse>('/like', { post });
}

export const getLikesByUserId = (userId: number) => {
  return request.get<IlikeResponse[]>(`/like/user/${userId}`);
}

