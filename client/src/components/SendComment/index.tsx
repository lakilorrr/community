import { InewCommentBody } from '@/interfaces/request';
import { newComment } from '@/services/comment';
import React, { ChangeEvent, FormEvent, memo, useLayoutEffect, useState } from 'react';
import style from './style.less';
type Props = {
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>,
  setCommentCount: React.Dispatch<React.SetStateAction<number>>,
  postId: number,
  replyId?: number,
};

const SendComment = (props: Props) => {
  const { setShowBox, setCommentCount, postId, replyId } = props;
  const [textValue, setTextValue] = useState('');

  useLayoutEffect(() => {
    if (textValue.length > 140) {
      setTextValue(prev => prev.substring(0, 5))
    }
  }, [textValue])


  const submitComment =  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = new FormData(e.currentTarget);
    const data = new Object() as InewCommentBody & { [k: string]: any; };
    for (const key of obj.keys()) {
        data[key] = obj.get(key);
    }
    const body = replyId ? { ...data, postId, replyId } : { ...data, postId };
    newComment(body).then(res => {
      setShowBox(false)
      setCommentCount(prev=>prev+1)
    })
  };

  const textAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value)
  }

  return (
    <div className={style.send_comment}>
      <div className={style.title}>发评论</div>
      <form onSubmit={submitComment}>
        <div className={style.content}>
          <textarea name="content" id="" required
            value={textValue}
            onChange={textAreaChange} />
          <span className={style.total}>{textValue.length}/140</span>
        </div>
        <div className={style.confirm}>
          <button type='button' onClick={() => setShowBox(false)}>取消</button>
          <button type='submit'>发送</button>
        </div>
      </form>
    </div>
  );
};
export default memo(SendComment);
