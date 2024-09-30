import { useFocusStore } from '@/store/useFocusStore';
import { useEffect, useState } from 'react';

export type TextStyle = { [key: string]: string | boolean };

const useTextStyle = () => {
  const currentRef = useFocusStore(state => state.currentRef);
  const [textStyle, setTextStyle] = useState<TextStyle | undefined>({});

  /**
   * 스타일 추출하는 함수
   */
  const getTextStyle = (): TextStyle | undefined => {
    if (!currentRef || !currentRef.current) return;

    const editor = currentRef.current.getEditor();
    return editor.getFormat();
  };

  /**
   * 에디터의 이벤트를 모니터링 하여 에디터가 변경되었을 경우 스타일을 업데이트 하는 기능
   */
  useEffect(() => {
    if (!currentRef?.current) return;

    const editor = currentRef.current.getEditor();

    const updateTextStyle = () => {
      const newStyle = getTextStyle();

      setTextStyle(prevStyle => {
        if (JSON.stringify(prevStyle) !== JSON.stringify(newStyle)) {
          return newStyle;
        }
        return prevStyle;
      });
    };

    editor.on('text-change', updateTextStyle);
    editor.on('selection-change', updateTextStyle);

    updateTextStyle();

    return () => {
      editor.off('text-change', updateTextStyle);
      editor.off('selection-change', updateTextStyle);
    };
  }, [currentRef, getTextStyle]);

  return { textStyle };
};

export default useTextStyle;
