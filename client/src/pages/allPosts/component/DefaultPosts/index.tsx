import PostInfo from '@/components/PostInfo';
import { PostsContext } from '@/context/post';
import { IpostResponse } from '@/interfaces/response';
import { getAllPosts } from '@/services/post';
import React, { memo, useContext, useEffect } from 'react';

const DefaultPosts = () => {
  const { postDetail, setPostDetail } = useContext(PostsContext)!;
  useEffect(() => {
      getAllPosts().then(res => {
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
export default memo(DefaultPosts);
