import { PostsContext } from '@/context/post';
import { getAllPosts, newPost } from '@/services/post';
import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useContext,
  useLayoutEffect,
  useState
} from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import style from './style.less';
type Props = {
  setShowPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendPost = (props: Props) => {
  const { setShowPost } = props;
  const [fileList, setFileList] = useState<File[]>([]);
  const [imgURL, setImgURL] = useState<string[]>([]);
  const [textValue, setTextValue] = useState('');
  const { setPostDetail } = useContext(PostsContext)!;

  useLayoutEffect(() => {
    if (fileList) {
      const urlArray: string[] = [];
      for (const file of fileList) {
        const url = URL.createObjectURL(file);
        urlArray.push(url);
      }
      setImgURL(urlArray);
    }
  }, [fileList]);
  useLayoutEffect(() => {
    if (textValue.length > 140) {
      setTextValue(prev => prev.substring(0, 140));
    }
  }, [textValue]);

  const submitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', textValue);
    if (fileList) {
      for (const file of fileList) {
        formData.append('picture', file);
      }
    }
    await newPost(formData);
    getAllPosts().then(res => {
      setPostDetail(res);
      setShowPost(false);
    });
  };
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFileList(prev => prev.concat([...e.target.files!]).slice(0, 3));
  };
  const textAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };
  const deleteFile = (idx: number) => {
    setFileList(prev => prev.filter((value, index) => idx !== index));
  };
  return (
    <div className={style.send_post}>
      <div className={style.title}>发动态</div>
      <form onSubmit={submitPost}>
        <div className={style.content}>
          <textarea name="content" id="" required value={textValue} onChange={textAreaChange} />
          <span className={style.total}>{textValue.length}/140</span>
        </div>
        <div className={style.image_box}>
          {imgURL.map((url, idx) => {
            return (
              <div className={style.cover} key={url}>
                <div className={style.delete} onClick={() => deleteFile(idx)}>
                  <AiOutlineDelete />
                </div>
                <img src={url} alt="postImage" />
              </div>
            );
          })}
          {fileList.length < 3 && (
            <div className={style.input_btn}>
              <AiOutlinePlus />
              <input type="file" name="picture" id="" multiple onChange={fileChange} />
            </div>
          )}
        </div>
        <div className={style.confirm}>
          <button type="button" onClick={() => setShowPost(false)}>
            取消
          </button>
          <button type="submit">发送</button>
        </div>
      </form>
    </div>
  );
};
export default memo(SendPost);
