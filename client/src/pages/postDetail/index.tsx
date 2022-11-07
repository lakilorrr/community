import Comment from '@/components/Comment';
import PersonalCard from '@/components/PersonalCard';
import { PostsContext } from '@/context/post';
import { IcommentResponse, IpostResponse } from '@/interfaces/response';
import { getPostById } from '@/services/post';
import { formatImagePath } from '@/utils/formatImagePath';
import { formatTime } from '@/utils/formatTime';
import React, { memo, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.less';

const postDetail = () => {
  const { postDetail, setPostDetail } = useContext(PostsContext)!;
  const { postId } = useParams();
  const [commentInfo, setCommentInfo] = useState<IcommentResponse[]>();
  const [postInfo, setPostInfo] = useState<IpostResponse>();
  useEffect(() => {
    postId &&
      getPostById(+postId).then(res => {
        setPostDetail(res);
      });
  }, []);
  useEffect(() => {
    if (postDetail) {
      const { comments, ...post } = postDetail as IpostResponse;
      setCommentInfo(comments);
      setPostInfo(post);
    }
  }, [postDetail]);

  return (
    <>
      {postInfo && (
        <div className={style.post_detail}>
          <div className={style.left}>
            <PersonalCard
              updateDate={formatTime(postInfo.updateDate)}
              author={postInfo.author!}
              content={postInfo.content}
              topic={postInfo.topic?.name}
              likes={postInfo.likes}
              like_count={postInfo.like_count}
            />
          </div>
          <div className={style.right}>
            <div className={style.images}>
              {postInfo.pictures.length > 0 &&
                postInfo.pictures.map(picObj => {
                  const { path } = picObj;
                  return <img key={path} src={formatImagePath(path)} alt="" />;
                })}
            </div>
            <div className={style.comments}>
              评论
              {commentInfo &&
                commentInfo?.length > 0 &&
                commentInfo.map(comment => {
                  return <Comment key={comment.id} {...comment} />;
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(postDetail);
