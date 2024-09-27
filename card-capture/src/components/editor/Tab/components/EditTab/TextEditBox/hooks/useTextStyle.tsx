import { useFocusStore } from '@/store/useFocusStore';

const useTextStyle = () => {
  const currentRef = useFocusStore(state => state.currentRef);

  const getTextStyle = () => {
    if (!currentRef || !currentRef.current) return;

    const editor = currentRef.current.getEditor();
    const currentFormat = editor.getFormat();
    const range = editor.getSelection();

    if (range && range.length > 0) {
      console.log(currentFormat);
    } else console.log(currentFormat);
  };

  return { getTextStyle };
};

export default useTextStyle;
