import {
  availableLetterSpacing,
  availableLineHeight,
  availableOutline,
  availableFontFamily,
} from '@/components/text/TextFormat';
import { useFocusStore } from '@/store/useFocusStore';

const TextToolbar = () => {
  const editorRef = useFocusStore(state => state.currentRef);
  const isDragging = useFocusStore(state => state.isDragging);

  /**
   * 텍스트 포맷 (bold, italic, underline) 적용 함수.
   * 드래그 된 상태면 부분 적용 / 드래그 안 된 상태면 전체 적용
   * 두 번 클릭하면 스타일을 제거하는 기능이 적용됨
   */
  const clickTextFormatHandler = (type: string) => {
    if (!editorRef || !editorRef.current) return;

    const editor = editorRef.current.getEditor();
    const currentFormat = editor.getFormat();
    const range = editor.getSelection();

    if (range && range.length > 0 && isDragging) {
      currentFormat[type] ? editor.format(type, false) : editor.format(type, true);
    } else {
      currentFormat[type]
        ? editor.formatText(0, editor.getLength(), type, false)
        : editor.formatText(0, editor.getLength(), type, true);
    }
  };

  /**
   * 기본 포맷 적용 함수.
   * 현재 선택된 요소(ref)의 값에 접근해 스타일을 적용시킴
   * 드래그 된 상태면 부분 적용 / 드래그 안 된 상태면 전체 적용
   */
  const changeHandler = (type: string, val: string) => {
    if (!editorRef || !editorRef.current) return;

    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();

    if (range && range.length > 0 && isDragging) {
      editor.format(type, val);
    } else {
      editor.formatText(0, editor.getLength(), type, val); // 전체 적용
    }
  };

  return (
    <div id="toolbar" className="flex flex-row gap-5">
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">format</p>
        <button onClick={() => clickTextFormatHandler('bold')}>Bold</button>
        <button onClick={() => clickTextFormatHandler('italic')}>Italic</button>
        <button onClick={() => clickTextFormatHandler('underline')}>Underline</button>
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">font family</p>
        {availableFontFamily.map((type, idx) => (
          <button key={idx} onClick={() => changeHandler('font', type)}>
            {type}
          </button>
        ))}
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">font size</p>
        <button onClick={() => changeHandler('size', '12px')}>Small</button>
        <button onClick={() => changeHandler('size', '16px')}>Medium</button>
        <button onClick={() => changeHandler('size', '24px')}>Large</button>
        <button onClick={() => changeHandler('size', '32px')}>Huge</button>
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">text alignment</p>
        <button onClick={() => changeHandler('align', '')}>Left</button>
        <button onClick={() => changeHandler('align', 'center')}>Center</button>
        <button onClick={() => changeHandler('align', 'right')}>Right</button>
        <button onClick={() => changeHandler('align', 'justify')}>Justify</button>
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">letter spacing</p>
        {availableLetterSpacing.map((size, idx) => (
          <button key={idx} onClick={() => changeHandler('letter-spacing', size)}>
            {size}
          </button>
        ))}
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">line height</p>
        {availableLineHeight.map((size, idx) => (
          <button key={idx} onClick={() => changeHandler('line-height', size)}>
            {size}
          </button>
        ))}
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">outline</p>
        {availableOutline.map((size, idx) => (
          <button key={idx} onClick={() => changeHandler('outline', size)}>
            {size}
          </button>
        ))}
      </div>
      <div className="mr-10 flex flex-col">
        <p className="bg-blue-100 p-1">color</p>
        <input type="color" onChange={e => changeHandler('color', e.target.value)} />
      </div>
    </div>
  );
};

export default TextToolbar;
