import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTextStore } from '@/store/useTextStore';
import './TextStyles.css';

/**
 * #toolbar를 id로 갖는 요소를 툴바로 사용하겠다고 선언
 * TextToolbar에 #toolbar 요소 구현되어 있음
 */
const modules = {
  toolbar: {
    container: '#toolbar',
  },
};

const TextBox = ({ index }: { index: number }) => {
  const editorRef = useRef<ReactQuill | null>(null);
  const { text, setText, setRef, setIndex } = useTextStore();

  /**
   * 변경되는 텍스트 값을 스토어에 저장하는 함수.
   * 현재 인덱스에 해당하는 위치에 저장하기 위해 index 값도 함께 전달
   */
  const changeHandler: ReactQuill.ReactQuillProps['onChange'] = (
    value,
    delta,
    source,
    editor,
  ) => {
    setText(index, editor.getContents());
  };

  /**
   * 현재 포커스된 TextBox의 인덱스를 저장
   */
  const focusHandler = () => {
    setIndex(index);
  };

  useEffect(() => {
    if (editorRef) {
      setRef(index, editorRef);
    }
  }, []);

  return (
    <div className="min-w-20 border-2">
      <ReactQuill
        ref={editorRef}
        value={text[index] || ''}
        onChange={changeHandler}
        onFocus={focusHandler}
        modules={modules}
        placeholder="Text"
      />
    </div>
  );
};

export default TextBox;
