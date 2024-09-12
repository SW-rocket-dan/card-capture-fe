import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface DownloadProgressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DownloadProgressModal: React.FC<DownloadProgressModalProps> = ({ isOpen, onOpenChange }) => {
  const [progress, setProgress] = useState(10);

  /**
   * progress 바를 10씩 증가시키는 함수
   */
  const increaseProgress = useCallback(() => {
    if (progress < 90) {
      setProgress(prevProgress => prevProgress + 10);
    }
  }, [progress]);

  /**
   * 3초에 한번씩 progress를 증가시키는 로직
   */
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen) {
      timer = setInterval(increaseProgress, 300);
    } else {
      setProgress(10);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, increaseProgress]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-[400px] flex-col items-center justify-center px-[20px] py-[40px]">
        <div className="flex flex-col items-center justify-center gap-1">
          <DialogTitle>카드뉴스를 이미지로 변환하고 있어요!</DialogTitle>
          <DialogDescription>대기 창을 닫아도 다운로드는 문제없이 진행됩니다</DialogDescription>
        </div>
        <div className="flex flex-col">
          <Progress value={progress} className="w-[250px]" />
          <div className="h-3 w-3 animate-spin" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadProgressModal;
