import { ItopicResponse } from '@/interfaces/response';
import { getTop3Topics } from '@/services/topic';
import React, { memo, useEffect, useState } from 'react';
import style from './style.less';

const HotTopics = () => {
  const [topicList, settopicList] = useState<ItopicResponse[]>([]);
  useEffect(() => {
    getTop3Topics().then(res => settopicList(res));
  }, []);

  return (
    <div className={style.hot_topics}>
      <div className={style.title}>#热门话题</div>
      <div className={style.top_topics}>
        {topicList.length > 0 &&
          topicList.map((topic, idx) => {
            return (
              <div className={style.topic_info} key={topic.id}>
                <div className={style.topic_no}>{idx + 1}</div>
                <div className={style.topic_name}>
                  <span>{topic.name}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default memo(HotTopics);
