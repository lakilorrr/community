import { ItopicResponse } from '@/interfaces/response';
import Request from './index';

const request = new Request();

export const getTop3Topics = () => {
  return request.get<ItopicResponse[]>('/topic');
}