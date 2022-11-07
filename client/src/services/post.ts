import { InewPostBody } from '@/interfaces/request';
import { IpostResponse } from '@/interfaces/response';
import Request from './index';

const request = new Request();

export const newPost = (body: InewPostBody | FormData) => {
  return request.post<IpostResponse>('/post/new', body);
}

export const getPostsByUserId = (userId: number) => {
  return  request.get<IpostResponse[]>(`/post?user=${userId}`)
}

export const getAllPosts = () => {
  return request.get<IpostResponse[]>('/post/all')
};
export const getPostById = (id: number) => {
  return request.get<IpostResponse>(`post/${id}`);
};