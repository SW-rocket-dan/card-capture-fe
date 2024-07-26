import RightTopBorderIcon from '@/components/common/Icon/RightTopBorderIcon';
import RightBottomBorderIcon from '@/components/common/Icon/RightBottomBorderIcon';
import LockIcon from '@/components/common/Icon/LockIcon';
import CutIcon from '@/components/common/Icon/CutIcon';
import AngleIcon from '@/components/common/Icon/AngleIcon';
import { useEffect, useState } from 'react';
import useLayerStyles from '@/components/editor/Tab/hooks/useLayerStyles';

const SizeBox = () => {
  /**
   * 현재 선택된 이미지의 데이터를 가져오고, 이미지를 설정하는 로직이 담긴 hook
   */
  const { position, changePositionHandler } = useLayerStyles();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);

  /**
   * store에 저장된 포지션 값이 바뀔때마다 state 업데이트
   * position 값은 편집 화면에서도 변경되기 때문에 전역 store가 업데이트될 때마다 가져와야 해당 컴포넌트에서 변경되는 값을 보여줄 수 있음
   */
  useEffect(() => {
    if (!position) return;

    setWidth(Math.floor(position.width));
    setHeight(Math.floor(position.height));
    setRotate(Math.floor(position.rotate));
  }, [position]);

  /**
   * 값이 입력될 때 상태값을 변경시켜주는 change handler
   */
  const changeSizeHandler = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(parseInt(e.target.value));

    if (type === 'width') setWidth(value);
    if (type === 'height') setHeight(value);
    if (type === 'rotate') setRotate(value);
  };

  /**
   * 전역 store에 위치값을 업데이트 하는 함수
   * 입력될 때마다 저장하게 되면 오류가 발생하기 때문에 blur 되었을 때, keydown 되었을 때 업데이트 하도록 설정함
   */
  const updateSizeHandler = () => {
    changePositionHandler({ width, height, rotate });
  };

  const updateSizeKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateSizeHandler();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      {/* 높이, 너비 입력 */}
      <div className="flex flex-row items-center">
        <div className="flex flex-col gap-[8px]">
          <div className="flex w-[110px] flex-row items-center rounded-md bg-itembg px-[10px] py-[10px]">
            <input
              type="number"
              value={width}
              onChange={e => changeSizeHandler('width', e)}
              onBlur={updateSizeHandler}
              onKeyDown={updateSizeKeyDownHandler}
              className="w-[79px] bg-transparent text-xs font-medium outline-none"
            />
            <span className="text-xs text-gray5">W</span>
          </div>
          <div className="flex w-[110px] flex-row items-center rounded-md bg-itembg px-[10px] py-[10px]">
            <input
              type="number"
              value={height}
              onChange={e => changeSizeHandler('height', e)}
              onBlur={updateSizeHandler}
              onKeyDown={updateSizeKeyDownHandler}
              className="w-[80px] bg-transparent text-xs font-medium outline-none"
            />
            <span className="text-xs text-gray5">H</span>
          </div>
        </div>

        {/* 잠금 버튼 */}
        <div className="flex flex-col gap-1">
          <RightTopBorderIcon height={18} className="text-gray6" />
          <button>
            <LockIcon width={15} className="ml-[7px] text-gray5" />
          </button>
          <RightBottomBorderIcon height={18} className="text-gray6" />
        </div>
      </div>

      {/* 자르기, 각도 변환 */}
      <div className="flex flex-col gap-[8px]">
        <button className="flex w-[90px] flex-row items-center justify-center gap-[7px] rounded-lg bg-gray7 py-[10px] text-xs text-white">
          <CutIcon width={15} />
          <span>자르기</span>
        </button>
        <div className="flex w-[90px] flex-row items-center justify-between rounded-md bg-itembg px-[12px] py-[10px] text-xs">
          <input
            type="number"
            value={rotate}
            onChange={e => changeSizeHandler('rotate', e)}
            onBlur={updateSizeHandler}
            onKeyDown={updateSizeKeyDownHandler}
            className="w-[57px] bg-transparent outline-none"
          />
          <AngleIcon width={17} className="text-gray5" />
        </div>
      </div>
    </div>
  );
};

export default SizeBox;
