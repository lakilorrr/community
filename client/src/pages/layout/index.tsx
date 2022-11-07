import { PostsContext } from '@/context/post';
import { IPostDetail } from '@/interfaces/response';
import React, { FC, memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './style.less';


const LayOut: FC = () => {
  const [postDetail, setPostDetail] = useState<IPostDetail>()

  return (
    <PostsContext.Provider value={{postDetail, setPostDetail}}>
    <div className={style.background}>
    <Outlet/>
      </div>
    </PostsContext.Provider>
  );
};
export default memo(LayOut);
