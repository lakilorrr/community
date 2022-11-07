import { IpostResponse } from '@/interfaces/response';
import React, { memo } from 'react';
import Avatar from '../Avatar';
import style from './style.less';

export const BookmarkPostItem = (props: Partial<IpostResponse>) => {
  const { author, content, updateDate, pictures } = props;
  return (
    <div className={style.item}>
      <div className={style.avatar}>
        <Avatar />
      </div>
      <div className={style.content_container}>
        <div className={style.info}>
          <span className={style.name}>{author?.name}</span>
          <span className={style.time}>{ updateDate}</span>
        </div>
        <div className={style.content}>{content}</div>
      </div>
      <div className={style.picture}>
        {pictures!.length > 0 &&
        <img src={pictures![0].path} alt="post_picture" />
        }
      </div>
    </div>
  );
};
export default memo(BookmarkPostItem);
