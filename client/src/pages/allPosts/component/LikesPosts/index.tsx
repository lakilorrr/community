import PostInfo from '@/components/PostInfo';
import { AuthorContext } from '@/context/author';
import { PostsContext } from '@/context/post';
import { IlikeResponse } from '@/interfaces/response';
import { getLikesByUserId } from '@/services/like';
import React, { memo, useContext, useEffect } from 'react';

const LikesPosts = () => {
  const { postDetail, setPostDetail } = useContext(PostsContext)!;
  const { authorInfo: { id } } = useContext(AuthorContext)!;
  useEffect(() => {
      getLikesByUserId(id).then(res => {
        setPostDetail(res);
      });
  }, []);
  return (
    <>
      {(postDetail as IlikeResponse[])?.length > 0 &&
        (postDetail as IlikeResponse[])?.map(like => {
        const { post } = like;
        return post && <PostInfo key={post.id} {...post} />;
      })}
    </>
  );
};
export default memo(LikesPosts);
