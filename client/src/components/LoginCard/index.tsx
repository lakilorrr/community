import defaultAvatar from '@/assets/images/default-avatar.jpg';
import { AuthContext } from '@/context/auth';
import { IloginBody, IregisterBody } from '@/interfaces/request';
import { login, register } from '@/services/user';
import { setTokenStorage } from '@/utils/tokenHelper';
import React, { ChangeEvent, FormEvent, memo, useContext, useState } from 'react';
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import style from './style.less';

const LoginCard = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AuthContext)!;
  const [formData, setFormData] = useState<IregisterBody>();
  const [registerAvater, setRegisterAvater] = useState('');
  const avatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files!;
    const url = file[0] ? URL.createObjectURL(file[0]) : defaultAvatar;
    setRegisterAvater(url);
  };
  const submitPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = new FormData(e.currentTarget) as Iterable<[IregisterBody, FormDataEntryValue]>;
    const data: IregisterBody = Object.fromEntries(obj);
    setFormData(data);
  };
  const loginAndSet = (body: IloginBody) => {
    login(body).then(res => {
      const { avatar, id, name, role } = res;
      setTokenStorage(res);
      localStorage.setItem('user', JSON.stringify({ name, id, role, avatar }));
      setUserInfo({ avatar, id, name, role });
    });
  }
  const submitLogin = () => {
    if (formData) {
      const { name, password } = formData;
      loginAndSet({ name, password });
      navigate(-1)
    }
  };
  const submitRegister = () => {
    if (formData) {
      const { name, password } = formData;
      const { avatar } = formData;
      if (avatar && !/image/.test(avatar.type)) {
        register({ name, password, avatar: null }).then(res => {
          if (res===true) {
            loginAndSet({ name, password });
            navigate(-1)
          }
        });
      } else {
        register(formData).then(res => {
          if (res) {
            loginAndSet({ name, password });
            navigate(-1)
          }
        });
      }
    }
  };

  const handleClose = () => {
      navigate(-1);
  };
  return (
    <div className={style.login_card}>
      <div className={style.close} onClick={handleClose}>
        <AiOutlineClose />
      </div>
      <div className={style.info}>
        <div>Hi !</div>
        {/* Avatar */}
        <div className={style.role}>冒险者</div>
      </div>
      <form onChange={submitPost}>
        <div className={style.input}>
          <div className={style.avatar}>
            <div className={style.cover}>
              <AiOutlineUpload />
            </div>
            <Avatar width={80} url={registerAvater} />
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              className={style.avatar_input}
              onChange={avatarChange}
            />
          </div>
          <label htmlFor="name">用户名</label>
          <input type="text" name="name" id="name" className={style.name_input} />
          <label htmlFor="password">密码</label>
          <input type="password" name="password" id="password" className={style.password_input} />
        </div>
      </form>
      <div className={style.submit}>
        <button onClick={submitRegister}>注册</button>
        <button onClick={submitLogin}>登录</button>
      </div>
    </div>
  );
};
export default memo(LoginCard);
