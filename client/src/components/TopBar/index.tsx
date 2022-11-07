import { AuthContext, initialAuthState } from '@/context/auth';
import { AuthorContext } from '@/context/author';
import { PostsContext } from '@/context/post';
import { formatImagePath } from '@/utils/formatImagePath';
import React, { memo, useContext } from 'react';
import { AiOutlineBulb, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import { BiFirstPage } from 'react-icons/bi';
import { BsBookmarks } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import style from './style.less';

const TopBar = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext)!;
  const { name, id, avatar } = userInfo;
  const { setAuthorInfo } = useContext(AuthorContext)!;
  const navigate = useNavigate();
  const findType = (type: string) => {
    if (id === -1) {
      navigate('/login');
    } else {
      setAuthorInfo(userInfo);
      navigate(`/${id}/postsBy/${type}`);
    }
  };
  const handleLogout = () => {
    if (id !== -1) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUserInfo(initialAuthState);
    }
  };
  return (
    <div className={style.top_bar}>
      <div className={style.finding}>
        <div className={style.searching}>
          <input type="text" name="" id="" />
        </div>
        <div className={style.details}>
          <AiOutlineLike title="我的赞" onClick={() => findType('like')} />
          <AiOutlineComment title="我的评论" onClick={() => findType('comment')} />
          <BsBookmarks title="我的收藏夹" onClick={() => findType('bookmark')} />
          <AiOutlineBulb title="我的动态" onClick={() => findType('user')} />
          <Link to={`/`} className={style.back}>
            <BiFirstPage title="回到首页" />
          </Link>
        </div>
      </div>
      <div className={style.user}>
        <div className={style.info}>
          <div className={style.name}>{name}</div>
          <div className={id === -1 ? style.logout : style.login} onClick={handleLogout}>
            <span>冒险者</span>
          </div>
        </div>
        {id === -1 ? <Avatar /> : <Avatar url={formatImagePath(avatar)} />}
      </div>
    </div>
  );
};
export default memo(TopBar);
