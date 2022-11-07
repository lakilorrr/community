export interface IloginResponse {
  name: string;
  id: number;
  avatar: string;
  role: 'root' | 'operator' | 'user';
  access: string;
  accessExpireIn: number;
  refresh: string;
  refreshExpireIn: number;
}

export interface IuserResponse {
  id: number;
  name: string;
  avatar: string;
  role: 'root' | 'operator' | 'user' | 'guest';
}
export interface ItopicResponse { 
  id: number;
  name: string;
}
export interface IpictureResponse { 
  path: string;
}

export interface IpostResponse {
  id: number;
  content: string;
  state: string;
  updateDate: string;
  author?: IuserResponse,
  topic?: ItopicResponse | null;
  pictures: IpictureResponse[];
  comments?: IcommentResponse[];
  likes?: IlikeResponse[];
  comment_count: number;
  like_count: number;
}

export interface IlikeResponse {
  id: number;
  author: IuserResponse;
  post: IpostResponse;
}

export interface IcommentResponse {
  id: number;
  content: string;
  post: IpostResponse;
  reply_to: IcommentResponse;
  author: IuserResponse;
  createDate: string;
}

export interface IbookmarkResponse {
  id: number;
  author?: IuserResponse;
  posts?: IpostResponse[];
  public: number;
  name: string;
}

export type IPostDetail = IpostResponse | IpostResponse[] | IlikeResponse[] | IcommentResponse[] | IbookmarkResponse[] | undefined;
 