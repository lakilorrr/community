import { PostsContext } from '@/context/post';
import { IbookmarkResponse } from '@/interfaces/response';
import { getBookmarkByUserId } from '@/services/bookmark';
import React, { FC, memo, useContext, useEffect, useId } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import style from './style.less';

const Bookmark: FC = () => {
  const { userId } = useParams();
  const { postDetail, setPostDetail } = useContext(PostsContext)!;
  const navigate = useNavigate()
  useEffect(() => {
    if (userId) {
      getBookmarkByUserId(+userId).then(res => {
        setPostDetail(res);
      });
    }
  }, []);

  return (
    <div className={style.bookmark}>
      <ul className={style.list}>
      {(postDetail as IbookmarkResponse[])?.length > 0 &&
        (postDetail as IbookmarkResponse[]).map(bookmark => {
          const { id, name } = bookmark;
          return <li key={id} onClick={()=>navigate(`/${useId}/bookmark/${id}`)}>{name}</li>;
        })}
      </ul>
      <Outlet />
    </div>
  );
};

export default memo(Bookmark);
