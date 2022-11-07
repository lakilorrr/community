import Comment from '@/components/Comment';
import PostInfo from '@/components/PostInfo';
import { AuthorContext } from '@/context/author';
import { PostsContext } from '@/context/post';
import { IcommentResponse } from '@/interfaces/response';
import { getCommentsByUserId } from '@/services/comment';
import React, { memo, useContext, useEffect } from 'react';

const CommentsPosts = () => {
  const { postDetail, setPostDetail } = useContext(PostsContext)!;
  const {
    authorInfo: { id },
  } = useContext(AuthorContext)!;
  useEffect(() => {
      getCommentsByUserId(id).then(res => {
        setPostDetail(res);
      });
  }, []);
  return (
    <>
      {(postDetail as IcommentResponse[])?.map(comment => {
        const { post } = comment;
        return ( post &&
          <div key={post.id}>
            <Comment {...comment} />
            <PostInfo {...post} />
          </div>
        );
      })}
    </>
  );
};
export default memo(CommentsPosts);
