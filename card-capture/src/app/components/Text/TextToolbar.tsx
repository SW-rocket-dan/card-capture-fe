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
  const index = useTextStore(state => state.index);
  const ref = useTextStore(state => state.ref);
  const editorRef = ref[index]; // 현재 포커스 된 요소를 가져옴

  /**
   * 텍스트 포맷 (bold, italic, underline) 적용 함수.
   * 두 번 클릭하면 스타일을 제거하는 기능이 적용됨
   */
  const clickTextFormatHandler = (type: string) => {
    if (!editorRef || !editorRef.current) return;

    const editor = editorRef.current.getEditor();
    const currentFormat = editor.getFormat();

    if (currentFormat[type]) {
      editor.format(type, false);
    } else {
      editor.format(type, true);
    }
  };

  /**
   * 기본 포맷 적용 함수.
   * 현재 선택된 요소(ref)의 값에 접근해 스타일을 적용시킴
   */
  const changeHandler = (type: string, val: string) => {
    if (!editorRef || !editorRef.current) return;

    const editor = editorRef.current.getEditor();
    editor.format(type, val);
  };

  return (
    <div id="toolbar" className="flex flex-row gap-5">
      <div className="flex flex-col mr-10">
        <p className="bg-blue-100 p-1">format</p>
        <button onClick={() => clickTextFormatHandler('bold')}>Bold</button>
        <button onClick={() => clickTextFormatHandler('italic')}>Italic</button>
        <button onClick={() => clickTextFormatHandler('underline')}>
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
