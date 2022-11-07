import { AuthContext } from '@/context/auth';
import React, { memo, useContext, useState } from 'react';
import { AiOutlineBulb, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import SendPost from '../SendPost';
import style from './style.less';


const BoxCard = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext)!;
  const [showPost, setShowPost] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const handlePost = () => { 
    userInfo.id !== -1 ? setShowPost(true) : navigate('/login')
   }
  const handleEdit = () => { 
    userInfo.id !== -1 ? setShowEdit(true) : navigate('/login')
   }
  return (
    <>
      <div className={style.box_card}>
        <div className={style.card}>
          <div className={style.item} onClick={handlePost}>
            <div className={style.icon}>
              <AiOutlineBulb />
            </div>
            <div className={style.title}>发动态</div>
          </div>
          <div className={style.item} onClick={handleEdit}>
            <div className={style.icon}>
              <AiOutlineEdit />
            </div>
            <div className={style.title}>草稿箱</div>
          </div>
        </div>
      </div>
      {
        showPost && <SendPost setShowPost={setShowPost} />
      }
      
    </>
  )
}

export default memo(BoxCard)