import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react';
import Button from '@/components/common/Button/Button';

type OptionInputModalProps = {
  title: string;
  content?: string;
};

const OptionInputModal = ({ title, content }: OptionInputModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[40px]">
      <DialogHeader>
        <div className="flex flex-col items-center justify-center gap-3">
          <DialogTitle>그리고 싶은 {title}의 특징을 작성해주세요</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </div>
      </DialogHeader>
      <textarea
        placeholder="자유롭게 입력해주세요"
        className="min-h-[230px] w-full resize-none rounded-[8px] border border-border p-5 text-[13px] outline-none"
      />
      <div className="flex flex-row gap-4">
        <Button type="default" className="h-[40px] w-[170px] text-[13px]">
          취소하기
        </Button>
        <Button type="full" className="h-[40px] w-[170px] text-[13px]">
          입력완료
        </Button>
      </div>
    </div>
  );
};

export default OptionInputModal;
