import { AuthContext } from '@/context/auth';
import { AuthorContext } from '@/context/author';
import React, { FC, memo, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import style from './style.less';
const AllPosts: FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const [title, setTitle] = useState('所有动态');
  const titlePath = path[path.length - 1];
  const { userInfo } = useContext(AuthContext)!;
  const { authorInfo } = useContext(AuthorContext)!;
  const authorName = authorInfo.id === userInfo.id ? '我' : authorInfo.name;
  useEffect(() => {
    if (titlePath) {
      switch (titlePath) {
        case 'user':
          setTitle(`${authorName}的动态`);
          break;

        case 'like':
          setTitle(`${authorName}的赞`);
          break;

        case 'comment':
          setTitle(`${authorName}的评论`);
          break;
        case 'bookmark':
          setTitle(`${authorName}的收藏夹`);
          break;

        default:
          break;
      }
    } else {
      setTitle(`所有动态`);
    }
  }, [titlePath, authorName]);

  return (
      <div className={style.all_posts}>
        <div className={style.title}>{title}</div>
        <div className={style.posts}>
          <Outlet />
        </div>
      </div>
  );
};

export default memo(AllPosts);
