import { useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import { ShapeType } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';
import useClickOutside from '@/hooks/useClickOutside';

const ShapeModalBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const addShapeLayer = useCardsStore(state => state.addShapeLayer);
  const focusedCardId = useFocusStore(state => state.focusedCardId);

  const addShapeLayerHandler = (type: ShapeType) => {
    addShapeLayer(focusedCardId, type);
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <div className="flex flex-col gap-2 rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs text-gray4">도형</p>
          <button onClick={openHandler} className="flex flex-row text-[10px] text-gray4">
            더보기 &gt;{' '}
          </button>
        </div>
        <div className="flex flex-row gap-[5px]">
          <button
            onClick={() => addShapeLayerHandler('circle')}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg"
          >
            <div className="h-[35px] w-[35px] rounded-full bg-gray7" />
          </button>
          <button
            onClick={() => addShapeLayerHandler('triangle')}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg"
          >
            <div
              className="h-[32px] w-[32px] bg-gray7"
              style={{
                position: 'absolute',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          </button>
          <button
            onClick={() => addShapeLayerHandler('rect')}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg"
          >
            <div className="h-[32px] w-[32px] bg-gray7" />
          </button>
          <button
            onClick={() => addShapeLayerHandler('star')}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg"
          >
            <div
              className="h-[38px] w-[38px] bg-gray7"
              style={{
                clipPath:
                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          </button>
          <button
            onClick={openHandler}
            className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px]"
          >
            ...
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute left-full z-20 -mt-[100px] ml-[20px] w-[275px] rounded-[8px] bg-white`}
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-row justify-between border-b-[1px] border-border px-[15px] py-[10px] font-extrabold">
            <p className="text-xs">도형</p>
            <button onClick={openHandler}>
              <CloseIcon width={8} className="text-gray2" />
            </button>
          </div>
          <div className="flex flex-col gap-[10px] px-[15px] pb-[15px] pt-[10px] text-[11px] text-gray2">
            <div className="gap flex flex-col">
              <p className="py-[5px]">전체 도형</p>
              <div className="flex flex-row flex-wrap justify-between gap-y-3">
                <button
                  onClick={() => addShapeLayerHandler('circle')}
                  className="flex h-[75px] w-[75px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg p-1"
                >
                  <div className="h-full w-full rounded-full bg-gray7" />
                </button>
                <button
                  onClick={() => addShapeLayerHandler('triangle')}
                  className="flex h-[75px] w-[75px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg p-1"
                >
                  <div
                    className="h-[60px] w-[60px] bg-gray7"
                    style={{
                      position: 'absolute',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    }}
                  />
                </button>
                <button
                  onClick={() => addShapeLayerHandler('rect')}
                  className="flex h-[75px] w-[75px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg p-2"
                >
                  <div className="h-full w-full bg-gray7" />
                </button>
                <button
                  onClick={() => addShapeLayerHandler('star')}
                  className="flex h-[75px] w-[75px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-itembg"
                >
                  <div
                    className="h-[70px] w-[70px] bg-gray7"
                    style={{
                      clipPath:
                        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeModalBox;
