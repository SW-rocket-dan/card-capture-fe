import Button from '@/components/common/Button/Button';
import React, { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import CheckBox from '@/components/common/CheckBox/CheckBox';

type ExportButtonProps = {
  onDownload: () => Promise<void>;
};

const ExportButton = ({ onDownload }: ExportButtonProps) => {
  /**
   * 드롭다운 열고 닫는 로직
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [tagInput, setTagInput] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);

  const changeTagInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const enterKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTagHandler();
    }
  };

  const addTagHandler = () => {
    if (tagInput.trim() === '' || tagList.includes(tagInput)) return;

    setTagList(prevTags => [...prevTags, tagInput.trim()]);
    setTagInput('');
  };

  /**
   * 에디터 페이지에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => {
            trackAmplitudeEvent('editor-export-click');
          }}
          type="full"
          className="h-[36px] w-[145px] rounded-[5px]"
        >
          <span className="text-xs">Export</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className={`absolute left-full z-50 -ml-[50px] mt-[15px] w-[280px] rounded-[8px] bg-white p-0`}
        style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08', zIndex: 10000 }}
      >
        <div className="flex flex-row justify-between border-b-[1px] border-border px-[15px] py-[10px] font-semibold">
          <p className="text-xs">Export</p>
          <button onClick={openHandler}>
            <CloseIcon width={8} className="text-gray2" />
          </button>
        </div>
        <div className="flex flex-col gap-[10px] px-[15px] py-[10px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-[5px]">
              <p className="text-xs font-medium">카드뉴스 태그</p>
              <p className="leading text-[10px] text-gray4">
                카드뉴스에 맞는 태그를 입력하면 내가 만든 카드뉴스가 <br /> 더 잘 검색된다는 사실! 사람들과 카드뉴스를
                공유해보세요
              </p>
            </div>
          </div>
          <div className="flex h-[100px] w-full flex-row flex-wrap justify-start gap-1 overflow-y-scroll rounded-md border border-border p-3 text-xs">
            {tagList.map(str => (
              <p key={str} className="h-fit w-fit rounded-[4px] bg-lightBorder px-[7px] py-[4px] text-[11px]">
                #{str}
              </p>
            ))}

            <div className="flex h-fit w-fit flex-row items-center text-gray4">
              #
              <input
                placeholder="태그 입력"
                type="text"
                className="w-[60px] py-[4px] text-[11px] outline-none placeholder:text-gray4"
                value={tagInput}
                onChange={changeTagInputHandler}
                onKeyUp={enterKeyUpHandler}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
            <label className="text-[11px]" onClick={() => setIsChecked(prev => !prev)}>
              내가 제작한 카드뉴스 사람들과 공유하기
            </label>
          </div>
          <Button onClick={onDownload} type="full" className="my-[5px] h-[37px] w-full rounded-[8px] text-xs">
            이미지로 저장하기
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExportButton;