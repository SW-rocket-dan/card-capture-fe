import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';
import './custom-quill-styles.css';
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

const TextBox = ({
  cardId,
  layerId,
  isDoubleClicked = false,
  type = 'layer',
}: {
  cardId: number;
  layerId: number;
  isDoubleClicked?: boolean;
  type?: string;
}) => {
  const editorRef = useRef<ReactQuill | null>(null);

  /**
   * 입력하면서 quill의 크기가 변경되면 해당 크기를 스토어의 position 값에 업데이트함
   */
  const layer = useCardsStore(state => state.cards[cardId].layers.filter(v => v.id === layerId)[0]);
  const setPosition = useCardsStore(state => state.setPosition);

  const updateLayerSize = () => {
    if (editorRef.current) {
      const editorElement = editorRef.current.getEditor().root;
      const { width, height } = editorElement.getBoundingClientRect();

      setPosition(cardId, layerId, { ...layer.position, height: height + 15 });
    }
  };

  /**
   * 변경되는 텍스트 값을 상태에 저장하는 함수.
   * 변경될 때마다 store에 저장 / blur로 저장하니 focusBox 변경될때 적용되지 않는 오류 발생함
   */
  const prevText = useCardsStore(state => state.getLayerText(cardId, layerId));
  const [text, setText] = useState<ReactQuill.Value | null>(prevText);

  const setLayerText = useCardsStore(state => state.setLayerText);

  const changeHandler: ReactQuill.ReactQuillProps['onChange'] = (value, delta, source, editor) => {
    setText(editor.getContents());
    updateLayerSize();
  };

  useEffect(() => {
    if (text && type === 'focus') setLayerText(cardId, layerId, text);
  }, [text]);

  /**
   * 현재 포커스된 TextBox의 ref를 store에 저장
   */
  const setCurrentRef = useFocusStore(state => state.setCurrentRef);

  useEffect(() => {
    if (!editorRef || !editorRef.current || type !== 'focus') return;

    setCurrentRef(editorRef);
  }, [editorRef]);

  /**
   *  두번 클릭했을 시에만 입력 가능하도록 하기 위해서 클릭 횟수를 확인해서 입력 활성화 여부 결정
   */
  const isReadOnly = !isDoubleClicked;

  /**
   * 입력모드 전환시 포커스 이동해서 전체 스타일 적용되도록 변경
   */
  useEffect(() => {
    if (isDoubleClicked && editorRef.current) {
      setCurrentRef(editorRef);

      // 입력 모드 전환시 전체 텍스트 선택
      const editor = editorRef.current?.getEditor();
      if (!editor) return;

      editor.focus();
      editor.setSelection(0, editor.getLength() - 1);
    }
  }, [isDoubleClicked]);

  return (
    <div>
      <ReactQuill
        ref={editorRef}
        value={text || ''}
        onChange={changeHandler}
        modules={modules}
        style={{
          minWidth: '80px',
          maxWidth: '700px',
          cursor: isReadOnly ? 'pointer' : 'auto',
          userSelect: isReadOnly ? 'none' : 'auto',
        }}
        placeholder="Text"
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default TextBox;
