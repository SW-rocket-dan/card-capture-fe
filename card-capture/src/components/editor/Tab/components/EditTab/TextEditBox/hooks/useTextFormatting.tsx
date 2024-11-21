import { useFocusStore } from '@/store/useFocusStore';
import { commandUtils } from '@/utils';

const useTextFormatting = () => {
  const cardId = useFocusStore(state => state.focusedCardId);
  const layerId = useFocusStore(state => state.focusedLayerId);
  const editorRef = useFocusStore(state => state.currentRef);

  /**
   * 텍스트 포맷 (bold, italic, underline) 적용 함수.
   * 드래그 된 상태면 부분 적용 / 드래그 안 된 상태면 전체 적용
   * 두 번 클릭하면 스타일을 제거하는 기능이 적용됨
   */
  const changeTextFormatHandler = (type: string) => {
    if (!editorRef || !editorRef.current) return;

    const editor = editorRef.current.getEditor();
    const currentFormat = editor.getFormat();
    const range = editor.getSelection();
    const prevText = editor.getContents();

    if (range && range.length > 0) {
      currentFormat[type] ? editor.format(type, false) : editor.format(type, true);
    } else {
      currentFormat[type]
        ? editor.formatText(0, editor.getLength(), type, false)
        : editor.formatText(0, editor.getLength(), type, true);
    }

    commandUtils.dispatchCommand('MODIFY_TEXT_LAYER', {
      cardId,
      layerId,
      text: editor.getContents(),
      initialText: prevText,
    });
  };

  /**
   * 기본 포맷 적용 함수.
   * 현재 선택된 요소(ref)의 값에 접근해 스타일을 적용시킴
   * 드래그 된 상태면 부분 적용 / 드래그 안 된 상태면 전체 적용
   */
  const changeStyleHandler = (type: string, val: string) => {
    if (!editorRef || !editorRef.current) return;

    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();
    const prevText = editor.getContents();

    if (range && range.length > 0) {
      editor.format(type, val);
    } else {
      editor.formatText(0, editor.getLength(), type, val); // 전체 적용
    }

    commandUtils.dispatchCommand('MODIFY_TEXT_LAYER', {
      cardId,
      layerId,
      text: editor.getContents(),
      initialText: prevText,
    });
  };

  return { changeTextFormatHandler, changeStyleHandler };
};

export default useTextFormatting;
