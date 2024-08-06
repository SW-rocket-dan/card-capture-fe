import { useState } from 'react';
import { useFocusStore } from '@/store/useFocusStore';

const usePreventCloseOnSelection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const editorRef = useFocusStore(state => state.currentRef);

  /**
   * 텍스트 드래그한 채 popover content를 클릭하면 close되는 오류 처리하는 로직
   * 드래그 된 부분이 있으면 popover를 close 하지 않고 유지함
   */
  const changeOpenHandler = () => {
    if (!editorRef || !editorRef.current) {
      setIsOpen(prev => !prev);
      return;
    }

    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();

    if (range && range.length > 0 && isOpen) {
      return;
    } else {
      setIsOpen(prev => !prev);
    }
  };

  return { isOpen, setIsOpen, changeOpenHandler };
};

export default usePreventCloseOnSelection;
