import bluestar from '@/assets/images/bluestar.svg';
import star from '@/assets/images/star.svg';
import { AuthorContext } from '@/context/author';
import { IlikeResponse, IuserResponse } from '@/interfaces/response';
import { formatImagePath } from '@/utils/formatImagePath';
import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import style from './style.less';
type Props = {
  updateDate: string;
  author: IuserResponse;
  topic?: string;
  content: string;
  likes?: IlikeResponse[];
  like_count: number;
};

const PersonalCard = (props: Props) => {
  const { updateDate, author, topic, content, like_count, likes } = props;
  const { setAuthorInfo } = useContext(AuthorContext)!;

  const toOnesPosts = () => {
      setAuthorInfo(author);
  };
  return (
    <div className={style.personal_card}>
      <div className={style.background}>
        <img src={bluestar} alt="" className={style.blue_star} />
        <img src={star} alt="" className={style.yellow_star} />
      </div>
      <div className={style.card}>
        <div className={style.info}>
          <Avatar url={formatImagePath(author.avatar)} />
          <Link to={`/${author.id}/postsBy/user`} className={style.name} onClick={toOnesPosts}>{author.name}</Link>
          <div className={style.time}>{updateDate}</div>
        </div>
        <div className={style.content_container}>
          <div className={style.left_quote}>
            &quot;
            {topic && <span className={style.topic}>#{topic}#</span>}
          </div>

          <div className={style.content}>{content}</div>
          <div className={style.right_quote}>&quot;</div>
        </div>
        <div className={style.like_info}>
          {likes!.length > 0 && (
            <div className={style.like_avatars}>
              {likes?.slice(0, 3).map(like => {
                const { id, author } = like;
                return <Avatar width={20} key={id} url={formatImagePath(author.avatar)} />;
              })}
            </div>
          )}
          <div className={style.like_numbers}>已有{like_count}人点赞</div>
        </div>
      </div>
    </div>
  );
};
export default memo(PersonalCard);
