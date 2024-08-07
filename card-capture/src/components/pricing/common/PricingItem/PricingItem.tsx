import React, { useState } from 'react';
import Button from '@/components/common/Button/Button';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import PlusIcon from '@/components/common/Icon/PlusIcon';
import MinusIcon from '@/components/common/Icon/MinusIcon';

export type PricingItemProps = {
  title: string;
  price: number;
  description: string;
  optionList?: string[];
};

const PricingItem = ({ title, price, description, optionList }: PricingItemProps) => {
  const [count, setCount] = useState(1);

  const plusCountHandler = () => {
    setCount(prev => prev + 1);
  };

  const minusCountHandler = () => {
    setCount(prev => prev - 1);
  };

  const changeCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setCount(0);
      return;
    }

    const newCount = parseInt(value, 10);
    if (isNaN(newCount) || newCount < 0 || newCount >= 100) {
      return;
    }

    setCount(newCount);
  };

  return (
    <div className="flex h-[550px] w-[400px] flex-col justify-between rounded-[40px] border border-border p-[35px] shadow-default">
      <div className="flex flex-col">
        <p className="text-[18px] font-semibold">{title}</p>

        <div className="mt-[15px] border-t border-border pt-[15px]">
          <div className="flex flex-row items-center justify-between">
            <p className="text-[35px] font-bold">{price}원</p>
            <div className="flex flex-row items-center gap-2.5">
              <button
                disabled={count <= 1}
                onClick={minusCountHandler}
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-gray5"
              >
                <MinusIcon width={10} className="text-gray5" />
              </button>
              <input
                value={count}
                onChange={changeCountHandler}
                className="flex h-[40px] w-[50px] items-center justify-center rounded-[5px] border border-border text-center font-medium outline-none"
              />

              <button
                disabled={count >= 99}
                onClick={plusCountHandler}
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-gray5"
              >
                <PlusIcon width={10} className="text-gray5" />
              </button>
            </div>
          </div>

          <p className="mt-[20px] text-[15px] text-defaultBlack">{description}</p>

          <div className="mt-[20px] flex flex-row items-center gap-2">
            <p className="rounded-[30px] border border-main px-2 py-[2px] text-[13px] font-semibold text-main">
              유효기간
            </p>
            <p className="text-[14px] font-semibold">구매일로부터 365일</p>
          </div>

          <div className="flex flex-col gap-1 py-[20px]">
            {optionList?.map(option => (
              <div className="flex flex-row items-center gap-2">
                <CheckIcon width={15} className="text-main" />
                <p className="text-[13px] font-medium">{option}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="flex justify-end px-[12px] text-[14px] text-gray5">
          총 금액 : {(count * price).toLocaleString('kr-KR')} 원
        </p>
        <Button type="full" className="rounded-[40px] py-[15px]" shadow={true} disable={count === 0}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default PricingItem;
