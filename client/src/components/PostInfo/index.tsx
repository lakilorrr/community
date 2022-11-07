import PersonalCard from '@/components/PersonalCard';
import PostImageCard from '@/components/PostImageCard';
import { IpostResponse } from '@/interfaces/response';
import { formatTime } from '@/utils/formatTime';
import React, { memo } from 'react';
import style from './style.less';

const PostInfo = (props: IpostResponse) => {
  const { id, content, updateDate, author, topic, pictures, comment_count, like_count, likes } = props;
  return (
    <div className={style.post_info}>
      <div className={style.left}>
        <PersonalCard
          updateDate={formatTime(updateDate)}
          author={author!}
          content={content}
          topic={topic?.name}
          likes={likes}
          like_count={like_count}
        />
      </div>
      <div className={style.right}>
        <PostImageCard
          path={pictures?.length > 0 ? pictures[0].path : ''}
          like_count={like_count}
          comment_count={comment_count}
          postId={id}
          pic_count={pictures?.length && pictures.length+1}
        />
      </div>
    </div>
  );
};
export default memo(PostInfo);
