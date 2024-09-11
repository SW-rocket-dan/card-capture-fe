import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { useFocusStore } from '@/store/useFocusStore';

const usePosterDownloader = () => {
  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);

  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * card에 그려진 dom을 image export 하는 handler
   * html-to-image와 file-saver 사용
   */
  const downloadCardHandler = async () => {
    if (!cardRef || !cardRef.current) return;

    // 포커스 된 항목이 있는 경우 FocusBox의 테두리도 함께 출력될 수 있으므로 제거
    setFocusedLayerId(-1);
    await new Promise(resolve => setTimeout(resolve, 100));

    // 다운로드가 시작되면서 대기 모달이 떠야 함으로 상태 변경
    setIsDownloading(true);

    try {
      const cardArea = cardRef.current;

      // html-to-image 사용하여 이미지로 변경
      const dataUrl = await toPng(cardArea, {
        includeQueryParams: true, // 이미지 src 하나로만 나오는 오류 해결
        quality: 1, // 품질 설정
        width: cardArea.offsetWidth,
        height: cardArea.offsetHeight,
      });

      // file-saver 라이브러리 사용하여 자동 다운로드
      saveAs(dataUrl, 'card-capture-image.png');
    } catch (e) {
      console.error('Error converting card to image', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return { cardRef, isDownloading, setIsDownloading, downloadCardHandler };
};

export default usePosterDownloader;
