import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTextStore } from '@/store/useTextStore';
import './TextStyles.css';

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {},
  },
};

function TextBox() {
  const editorRef = useRef<ReactQuill | null>(null);
  const { text, format, ref, setText, setRef } = useTextStore();

  const changeHandler: ReactQuill.ReactQuillProps['onChange'] = (
    value,
    delta,
    source,
    editor,
  ) => {
    setText(editor.getContents());
  };

  useEffect(() => {
    if (editorRef) {
      setRef(editorRef);
    }
  }, []);

  return (
    <div className="min-w-20 border-2 max-w-40 ">
      <ReactQuill
        ref={editorRef}
        value={text || ''}
        onChange={changeHandler}
        modules={modules}
        placeholder="Text"
      />
    </div>
  );
}

export default TextBox;
