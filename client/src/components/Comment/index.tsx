import { IcommentResponse } from '@/interfaces/response';
import { formatImagePath } from '@/utils/formatImagePath';
import { formatTime } from '@/utils/formatTime';
import React, { memo } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import Avatar from '../Avatar';
import style from './style.less';

const Comment = (props: IcommentResponse) => {
  const { createDate, author, reply_to, content } = props;
  return (
    <div className={style.comment}>
      <div className={style.item}>
        <div className={style.left}>
          <Avatar width={40} url={formatImagePath(author.avatar)} />
        </div>
        <div className={style.right}>
          <div className={style.name}>
            <span>{author.name}</span>
          </div>
          <div className={style.detail}>
            {reply_to && (
              <div className={style.reply_to}>
                回复：
                <span className={style.reply_to_user}>{reply_to.author.name}</span>
              </div>
            )}
            <div className={style.content}>{content}</div>
          </div>
          <div className={style.bottom}>
            <span className={style.reply}>
              <AiOutlineComment />
            </span>
            <span className={style.time}>{formatTime(createDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Comment);
