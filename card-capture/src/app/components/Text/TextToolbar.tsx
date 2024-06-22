import { useTextStore } from '@/store/useTextStore';
import 'react-quill/dist/quill.snow.css';
import './TextFormat';
import {
  availableLetterSpacing,
  availableLineHeight,
  availableOutline,
  fontFamily,
} from '@/app/components/Text/TextFormat';

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
        <p className="bg-blue-100 p-1">format</p>
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
        <p className="bg-blue-100 p-1">font family</p>
        {fontFamily.map(type => (
          <button onClick={() => changeHandler('font', type)}>{type}</button>
        ))}
      </div>
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">font size</p>
        <button onClick={() => changeHandler('size', '12px')}>Small</button>
        <button onClick={() => changeHandler('size', '16px')}>Medium</button>
        <button onClick={() => changeHandler('size', '24px')}>Large</button>
        <button onClick={() => changeHandler('size', '32px')}>Huge</button>
      </div>
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">text alignment</p>
        <button onClick={() => changeHandler('align', '')}>Left</button>
        <button onClick={() => changeHandler('align', 'center')}>Center</button>
        <button onClick={() => changeHandler('align', 'right')}>Right</button>
        <button onClick={() => changeHandler('align', 'justify')}>
          Justify
        </button>
      </div>
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">letter spacing</p>
        {availableLetterSpacing.map(size => (
          <button onClick={() => changeHandler('letter-spacing', size)}>
            {size}
          </button>
        ))}
      </div>
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">line height</p>
        {availableLineHeight.map(size => (
          <button onClick={() => changeHandler('line-height', size)}>
            {size}
          </button>
        ))}
      </div>
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">outline</p>
        {availableOutline.map(size => (
          <button onClick={() => changeHandler('outline', size)}>{size}</button>
        ))}
      </div>
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">color</p>
        <input
          type="color"
          onChange={e => changeHandler('color', e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextToolbar;
