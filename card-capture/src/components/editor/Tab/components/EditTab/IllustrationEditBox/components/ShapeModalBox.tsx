import { useEffect, useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import { ShapeType } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';
import useClickOutside from '@/hooks/useClickOutside';
import ColorButton from '@/components/editor/Tab/components/EditTab/common/ColorButton';
import { useColor } from 'react-color-palette';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ShapeModalBox = () => {
  // 선택된 데이터 가져오기
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const focusedShape = useCardsStore(state => state.getShapeLayer(focusedCardId, focusedLayerId));

  /**
   * 색상 변경되면 store에 변경된 Layer 색상 업데이트하는 로직
   */
  const [color, setColor] = useColor(focusedShape?.color || '#DDDDDD');
  const setShapeLayerColor = useCardsStore(state => state.setShapeLayerColor);

  useEffect(() => {
    setShapeLayerColor(focusedCardId, focusedLayerId, color.hex);
  }, [color]);

  /**
   * 새로운 Shape Layer를 추가하는 로직
   */
  const addShapeLayer = useCardsStore(state => state.addShapeLayer);

  const addShapeLayerHandler = (type: ShapeType) => {
    addShapeLayer(focusedCardId, type);
  };

  /**
   * 드롭다운 열고 닫는 로직
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  // @TODO : 도형 추후에 svg 파일로 변경해야 함

  return (
    <Popover>
      <div className="flex flex-col gap-2 rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs text-gray4">도형</p>
          <ColorButton className="h-4 w-[30px] rounded-[5px]" size="w-[30px] h-4" color={color} setColor={setColor} />
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
          <PopoverTrigger asChild>
            <button
              onClick={openHandler}
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px]"
            >
              ...
            </button>
          </PopoverTrigger>
        </div>
      </div>

      <PopoverContent
        side="right"
        className={`absolute left-full z-50 -mt-[50px] ml-[27px] w-[275px] rounded-[8px] bg-white p-0`}
        style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08', zIndex: 10000 }}
      >
        <div>
          <div className="flex flex-row justify-between border-b-[1px] border-border px-[15px] py-[10px] font-bold">
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
      </PopoverContent>
    </Popover>
  );
};

export default ShapeModalBox;
