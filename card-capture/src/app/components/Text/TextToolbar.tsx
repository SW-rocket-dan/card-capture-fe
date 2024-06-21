import { useTextStore } from '@/store/useTextStore';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';

export const fontSize = ['12px', '16px', '18px', '24px', '28px', '32px'];

let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSize;
Quill.register(Size, true);

const TextToolbar = () => {
  const { format, ref, setFormat } = useTextStore();

  const clickTextFormatHandler = (type: string) => {
    if (ref && ref.current) {
      const editor = ref.current.getEditor();
      const currentFormat = editor.getFormat();

      if (currentFormat[type]) {
        editor.format(type, false);
      } else {
        editor.format(type, true);
      }
    }
  };

  const changeHandler = (type: string, val: string) => {
    if (ref && ref.current) {
      const editor = ref.current.getEditor();
      editor.format(type, val);
    }
  };

  return (
    <div id="toolbar" className="flex flex-row gap-5">
      <div className="flex flex-col mr-10">
        <button className="" onClick={() => clickTextFormatHandler('bold')}>
          Bold
        </button>
        <button className="" onClick={() => clickTextFormatHandler('italic')}>
          Italic
        </button>
        <button
          className=""
          onClick={() => clickTextFormatHandler('underline')}
        >
          Underline
        </button>
      </div>
      <div className="flex flex-col mr-10">
        <button onClick={() => changeHandler('size', '12px')}>Small</button>
        <button onClick={() => changeHandler('size', '16px')}>Medium</button>
        <button onClick={() => changeHandler('size', '24px')}>Large</button>
        <button onClick={() => changeHandler('size', '32px')}>Huge</button>
      </div>
      <div className="flex flex-col mr-10">
        <button onClick={() => changeHandler('align', '')}>Left</button>
        <button onClick={() => changeHandler('align', 'center')}>Center</button>
        <button onClick={() => changeHandler('align', 'right')}>Right</button>
        <button onClick={() => changeHandler('align', 'justify')}>
          Justify
        </button>
      </div>
      <input
        type="color"
        onChange={e => changeHandler('color', e.target.value)}
      />
    </div>
  );
};

export default TextToolbar;
