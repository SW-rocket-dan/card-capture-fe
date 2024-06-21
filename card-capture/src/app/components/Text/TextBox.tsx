import { useEffect, useRef } from 'react';
import Delta, { Sources } from 'quill';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTextStore } from '@/store/useTextStore';
import DeltaStatic from 'quill';

const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['mirza', 'roboto'];
ReactQuill.Quill.register(Font, true);

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {},
  },
};

function TextBox() {
  const editorRef = useRef<ReactQuill | null>(null);
  const { text, format, ref, setText, setRef } = useTextStore();

  const changeHandler: any = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor,
  ) => {
    console.log(text);
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
