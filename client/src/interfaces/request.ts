export interface IsendPost {
  picture: File[];
  [propName: string]: any;
}
export interface IloginBody {
  name: string;
  password: string;
}
export interface IregisterBody extends IloginBody {
  avatar?: File | null;
}

export interface InewPostBody {
  content: string;
  state: string;
  topic?: number;
  picture?: File[];
}

export interface InewCommentBody {
  content: string;
  postId: number;
  replyId?: number;
}

export interface InewBookmarkBody {
  name: string;
  public?: number;
}

export interface IpostToBookmarkBody {
  post: number;
  bookmark?: number;
}
