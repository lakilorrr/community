import React, { memo, useEffect, useState } from 'react';
import style from './style.less';

interface Props {
  code: number;
  messegae: string;
}

const ErrorPop = (props: Props) => {
  const { code, messegae } = props;
  const [pop, setPop] = useState(style.error_pop);
  useEffect(() => {
    setTimeout(() => {
      setPop(style.out);
    }, 3000);
  }, []);

  return (
    <div className={pop}>
      <span>
        错误代码：{code}，{messegae}
      </span>
    </div>
  );
};

export default memo(ErrorPop);
