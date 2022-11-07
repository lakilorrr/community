import { AuthContext } from '@/context/auth';
import { PostsContext } from '@/context/post';
import { clickLike } from '@/services/like';
import { getPostById } from '@/services/post';
import { formatImagePath } from '@/utils/formatImagePath';
import React, { memo, useContext, useState } from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { BsBookmarks } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import SendComment from '../SendComment';
import style from './style.less';

type Props = {
  path?: string;
  pic_count?: number;
  like_count: number;
  comment_count: number;
  postId: number;
};

const PostImageCard = (props: Props) => {
  const { path, like_count, comment_count, postId, pic_count } = props;
  const [showSendComment, setShowSendComment] = useState(false);
  const { userInfo } = useContext(AuthContext)!;
  const { setPostDetail } = useContext(PostsContext)!;
  const [addLike, setAddLike] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);
  const [commentCount, setCommentCount] = useState(comment_count);
  const navigate = useNavigate();
  const handleLike = () => {
    if (userInfo.id !== -1) {
      clickLike(postId).then(res => {
        if (res) {
          setAddLike(true);
          setLikeCount(prev => prev + 1);
        } else {
          setAddLike(false);
          setLikeCount(prev => prev - 1);
        }
      });
    } else {
      navigate('/login');
    }
  };
  const handleDetail = () => {
    getPostById(postId).then(res => {
      setPostDetail(res);
      navigate(`/${postId}`);
    });
  };
  const handleComment = () => {
    if (userInfo.id !== -1) {
      setShowSendComment(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div className={style.post_image} title={`共张${pic_count}图片`}>
        {path && (
          <div className={style.images} onClick={handleDetail}>
            <img src={formatImagePath(path)} alt="" />
          </div>
        )}
        <div className={style.bottom}>
          <div className={style.like} onClick={handleLike}>
            {addLike ? <AiFillLike color="#F4D25E" /> : <AiOutlineLike />}
            <div className={style.count}>{likeCount}</div>
          </div>
          <div className={style.comment} onClick={handleComment}>
            <AiOutlineComment />
            <div className={style.count}>{commentCount}</div>
          </div>
          <div className={style.bookmark}>
            <BsBookmarks />
          </div>
        </div>
      </div>
      {showSendComment && (
        <SendComment
          setCommentCount={setCommentCount}
          setShowBox={setShowSendComment}
          postId={postId}
        />
      )}
    </>
  );
};
export default memo(PostImageCard);
