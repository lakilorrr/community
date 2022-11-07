import default_avatar from '@/assets/images/default-avatar.jpg';
import React, { memo } from 'react';
import style from './style.less';
type Props = {
  width?: number;
  url?: any;
};

const Avatar = (props: Props) => {
  const { width=50, url } = props;
  return (
    <div className={style.avatar} >
      <img alt="avatar" src={url ? url : default_avatar} style={{width: width, height: width}}/>
    </div>
  );
};
export default memo(Avatar);
