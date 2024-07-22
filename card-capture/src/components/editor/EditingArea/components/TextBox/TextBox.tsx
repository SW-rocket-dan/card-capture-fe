import { useRef, useState } from 'react';
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

const TextBox = ({ cardId, layerId, clickedCount = 0 }: { cardId: number; layerId: number; clickedCount?: number }) => {
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

      setPosition(cardId, layerId, { ...layer.position, height });
    }
  };

  /**
   * 변경되는 텍스트 값을 상태에 저장하는 함수.
   * 변경될 때마다 store에 저장하는 것은 비효율적이기 때문에 임시로 저장
   */
  const prevText = useCardsStore(state => state.getLayerText(cardId, layerId));
  const [text, setText] = useState<ReactQuill.Value | null>(prevText);

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
  //@FIXME: onBlur 안되는 이유 찾아서 해결하기

  const setLayerText = useCardsStore(state => state.setLayerText);

  const blurHandler = () => {
    if (!text) return;

    setLayerText(cardId, layerId, text);
  };

  /**
   *  두번 클릭했을 시에만 입력 가능하도록 하기 위해서 클릭 횟수를 확인해서 입력 활성화 여부 결정
   */
  const isReadOnly = clickedCount < 1;

  return (
    <div onBlur={blurHandler}>
      <ReactQuill
        ref={editorRef}
        value={text || ''}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        modules={modules}
        style={{ minWidth: '200px', maxWidth: '700px', cursor: clickedCount < 2 ? 'pointer' : 'auto' }}
        placeholder="Text"
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default TextBox;
