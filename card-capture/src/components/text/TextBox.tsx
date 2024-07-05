import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { SelectionChangeHandler } from 'quill';
import { useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';
import 'react-quill/dist/quill.snow.css';
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

const TextBox = ({ cardId, layerId }: { cardId: number; layerId: number }) => {
  const editorRef = useRef<ReactQuill | null>(null);

  const layer = useCardsStore(state => state.cards[0].layers.filter(v => v.id === layerId)[0]);
  const setPosition = useCardsStore(state => state.setPosition);

  const updateLayerSize = () => {
    if (editorRef.current) {
      const editorElement = editorRef.current.getEditor().root;

      editorElement.style.maxWidth = '700px';

      const { width, height } = editorElement.getBoundingClientRect();
      console.log('Updating layer size:', width, height);
      setPosition(layerId, { ...layer.position, width, height });
    }
  };

  /**
   * 변경되는 텍스트 값을 상태에 저장하는 함수.
   * 변경될 때마다 store에 저장하는 것은 비효율적이기 때문에 임시로 저장
   */
  const changeHandler: ReactQuill.ReactQuillProps['onChange'] = (value, delta, source, editor) => {
    setText(editor.getContents());
    updateLayerSize();
  };

  /**
   * 현재 포커스된 TextBox의 ref를 store에 저장
   */
  const setCurrentRef = useFocusStore(state => state.setCurrentRef);
  const focusHandler = () => {
    if (!editorRef || !editorRef.current) return;

    setCurrentRef(editorRef);
  };

  /**
   * 텍스트 박스에서 blur 되면 store에 변경된 값을 저장
   */
  const prevText = useCardsStore(state => state.getLayerText(cardId, layerId));
  const [text, setText] = useState<ReactQuill.Value | null>(prevText);

  const setLayerText = useCardsStore(state => state.setLayerText);
  const blurHandler = () => {
    if (!text) return;

    setLayerText(cardId, layerId, text);
  };

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const quillInstance = editorRef.current?.getEditor();

    if (!quillInstance) return;

    /**
     * 현재 선택된 부분(range)이 있으면 드래그 된 것으로 상태 변경
     */
    const selectionHandler: SelectionChangeHandler = (range, oldRange, source) => {
      if (range && range.length > 0 && source === 'user') {
        setIsDragging(true);
      } else {
        setIsDragging(false);
      }
    };

    // 드래그 이벤트가(selection-change)가 발생하면 드래그 상태변경 핸들러 실행
    quillInstance.on('selection-change', selectionHandler);

    return () => {
      quillInstance.off('selection-change', selectionHandler);
    };
  }, []);

  /**
   * 드래그 상태가 변경되면 전역 store에 드래그 상태를 저장
   * @NOTE 드래그 상태를 툴바가 알아야 하기 때문에 전역으로 저장
   */
  const setCurrentDragging = useFocusStore(state => state.setIsDragging);

  useEffect(() => {
    setCurrentDragging(isDragging);
  }, [isDragging]);

  return (
    <div>
      <ReactQuill
        ref={editorRef}
        value={text || ''}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        modules={modules}
        style={{ minWidth: '100px', maxWidth: '700px', width: '100%' }}
        placeholder="Text"
      />
    </div>
  );
};

export default TextBox;
