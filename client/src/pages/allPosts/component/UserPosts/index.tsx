import PostInfo from '@/components/PostInfo';
import { AuthorContext } from '@/context/author';
import { PostsContext } from '@/context/post';
import { IpostResponse } from '@/interfaces/response';
import { getPostsByUserId } from '@/services/post';
import React, { memo, useContext, useEffect } from 'react';

const UserPosts = () => {
  const { postDetail, setPostDetail } = useContext(PostsContext)!;
  const { authorInfo: { id } } = useContext(AuthorContext)!;
  useEffect(() => {
      getPostsByUserId(id).then(res => {
        setPostDetail(res);
      });
  }, []);
  return (
    <>
      {(postDetail as IpostResponse[])?.length > 0 &&
        (postDetail as IpostResponse[]).map(post => {
          return post.like_count && <PostInfo key={post.id} {...post} />;
        })}
    </>
  );
};
export default memo(UserPosts);
