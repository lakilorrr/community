import { InewCommentBody } from '@/interfaces/request';
import { IcommentResponse } from '@/interfaces/response';
import Request from './index';

const request = new Request();

export const newComment = (body: InewCommentBody) => {
  return request.post<IcommentResponse>('/comment/new', body)
}

export const getCommentsByUserId = (userId: number) => {
  return request.get<IcommentResponse[]>(`/comment/user/${userId}`);
}