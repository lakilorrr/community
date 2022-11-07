import { InewBookmarkBody } from '@/interfaces/request';
import { IbookmarkResponse } from '@/interfaces/response';
import Request from './index';

const request = new Request();
export const newBookmark = (body: InewBookmarkBody) => {
  return request.post<IbookmarkResponse>('/bookmark', body)
}

export const getBookmarkById = (id: number) => {
  return request.get<IbookmarkResponse>(`/bookmark/${id}`);
}

export const getBookmarkByUserId = (userId: number) => {
  return request.get<IbookmarkResponse[]>(`/bookmark?user=${userId}`);
}