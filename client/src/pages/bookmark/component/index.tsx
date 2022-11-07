import { IpostResponse } from '@/interfaces/response';
import { getBookmarkById } from '@/services/bookmark';
import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.less';

const BookmarkDetail = () => {
  const { bookmarkId } = useParams();
  const [posts, setPosts] = useState<IpostResponse[]>();
  useEffect(() => {
    if (bookmarkId) {
      getBookmarkById(+bookmarkId).then(res => setPosts(res.posts));
    }
  }, [bookmarkId]);

  return (
    <div className={style.detail}>
      {posts?.map(post => {
        const { id, ...props } = post;
        return <BookmarkDetail key={id} {...props} />;
      })}
    </div>
  );
};
export default memo(BookmarkDetail);
