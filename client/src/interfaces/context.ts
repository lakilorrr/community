import { Dispatch, SetStateAction } from 'react';
import { IPostDetail } from './response';
import { IuserInfo } from './userInfo';

export interface IuserInfoContext {
  userInfo: IuserInfo;
  setUserInfo: Dispatch<SetStateAction<IuserInfo>>;
}
export interface IauthorInfoContext {
  authorInfo: IuserInfo;
  setAuthorInfo: Dispatch<SetStateAction<IuserInfo>>;
}
export interface IpostDetailContext {
  postDetail: IPostDetail;
  setPostDetail: Dispatch<SetStateAction<IPostDetail>>;
}