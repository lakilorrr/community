import BoxCard from '@/components/BoxCard';
import HotTopics from '@/components/HotTopics';
import MainBody from '@/components/MainBody';
import TopBar from '@/components/TopBar';
import { AuthContext } from '@/context/auth';
import { AuthorContext } from '@/context/author';
import React, { memo, useContext, useState } from 'react';
import style from './style.less';

const SubLayout = () => {
  const { userInfo } = useContext(AuthContext)!;
  const [authorInfo, setAuthorInfo] = useState(userInfo);
  return (
    <AuthorContext.Provider value={{ authorInfo, setAuthorInfo }}>
      <div className={style.layout}>
        <div className={style.left}>
          <TopBar />
          <MainBody />
        </div>
        <div className={style.right}>
          <BoxCard />
          <HotTopics />
        </div>
      </div>
    </AuthorContext.Provider>
  );
};
export default memo(SubLayout);
