import { useEffect, useRef } from 'react';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTextStore } from '@/store/useTextStore';
import { Delta, Sources } from 'quill';

const TextBox = () => {
  const editorRef = useRef<ReactQuill | null>(null);
  const { text, format, setText } = useTextStore();

  const changeHandler = (
    value: string,
    delta: Delta,
    source: Sources,
    editor: UnprivilegedEditor,
  ) => {
    setText(editor.getContents());
  };

  useEffect(() => {
    if (editorRef && editorRef.current) {
      const editor = editorRef.current.getEditor();

      Object.keys(format).forEach(key => {
        editor.format(key, format[key]);
      });
    }
  }, [format]);

  return (
    <div className="min-w-16 border-2 w-fit">
      <ReactQuill
        ref={editorRef}
        value={text || ''}
        onChange={changeHandler}
        modules={{ toolbar: false }}
        placeholder="Text"
      />
    </div>
  );
};

export default TextBox;
