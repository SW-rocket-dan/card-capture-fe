import React, { useEffect, useState } from 'react';
import {
  ActiveDirection,
  Direction,
  ResizeOffset,
} from '@/components/editor/EditingArea/components/FocusBox/FocusBox.type';
import { INITIAL_RESIZE_OFFSET } from '@/components/editor/EditingArea/components/FocusBox/FocusBox.constant';
import { LayerType, Position } from '@/store/useCardsStore/type';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';

type UseResizeProps = {
  cardId: number;
  layerId: number;
  type?: LayerType;
  children: React.ReactElement<{
    isDoubleClicked: boolean;
  }>;
  curPosition: Position;
  setCurPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const useResize = ({ cardId, layerId, type, children, curPosition, setCurPosition }: UseResizeProps) => {
  const setPosition = useCardsStore(state => state.setPosition);

  const [resizeDirection, setResizeDirection] = useState<Direction>('none');
  const [resizeOffset, setResizeOffset] = useState<ResizeOffset>({
    ...INITIAL_RESIZE_OFFSET,
  });

  // resize 수학 계산 로직

  /**
   * 절대 좌표계 -> 상대 좌표계로 변경해주는 로직
   * 2D 회전 행렬을 사용하여 angle 만큼 이동했을떄 (x,y)가 어디로 이동되는지 계산
   * y축이 아래로 갈수록 증가하고, 시계방향 회전을 양의 각도로 사용하기 때문에 계산시 sin 부호를 변경해서 보정함
   */
  const rotatePoint = (x: number, y: number, centerX: number, centerY: number, angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const nx = cos * (x - centerX) + sin * (y - centerY) + centerX;
    const ny = cos * (y - centerY) - sin * (x - centerX) + centerY;

    return { x: nx, y: ny };
  };

  /**
   * 상대좌표계 기준 x,y 변화량 계산하는 로직
   * 회전된 상태에서 리사이징 하는 경우, 절대 좌표계 기준으로 크기 변화 시키면 안되고 회전된 방향 기준으로 변화시켜야 하기 때문에 좌표계 변환해서 계산
   */
  const getDiffInRelative = (x: number, y: number, startX: number, startY: number) => {
    const { startCenterX, startCenterY } = resizeOffset;
    const relativeCoords = rotatePoint(x, y, startCenterX, startCenterY, curPosition.rotate);

    const relativeStartCoords = rotatePoint(startX, startY, startCenterX, startCenterY, curPosition.rotate);

    return {
      diffX: relativeCoords.x - relativeStartCoords.x,
      diffY: relativeCoords.y - relativeStartCoords.y,
    };
  };

  /**
   * TextBox일 때 텍스트 보다 더 작게 박스 조절되는 것을 방지하기 위한 로직
   * 내부 요소의 크기를 구한 후에 해당 크기보다 더 작게 줄이려고 하면 resize가 동작하지 않게 함
   */
  const [minSize, setMinSize] = useState({ width: 0, height: 0 });
  const editorRef = useFocusStore(state => state.currentRef);

  useEffect(() => {
    // TextBox인지 확인
    if (editorRef?.current && type === 'text') {
      const editorElement = editorRef.current?.getEditor().root;
      const { width, height } = editorElement?.getBoundingClientRect(); // TextBox 감싼 div의 크기 추출

      setMinSize({ width: width + 30, height }); // 최소 크기 설정
    }
  }, [children]);

  // 사이즈 설정 시 minSize 보다 작아질 수 없게 하는 로직
  const calculateWithMinSize = (newWidth: number, newHeight: number) => {
    return {
      width: Math.max(newWidth, minSize.width),
      height: Math.max(newHeight, minSize.height),
    };
  };

  /**
   * 해당 방향으로 위치를 이동시키면 width, height가 어떤 식으로 변경되어야 하는지(음수,양수) 정의
   */
  const directionConfig = {
    n: { width: 0, height: -1 },
    s: { width: 0, height: 1 },
    e: { width: 1, height: 0 },
    w: { width: -1, height: 0 },
    ne: { width: 1, height: -1 },
    nw: { width: -1, height: -1 },
    se: { width: -1, height: 1 },
    sw: { width: 1, height: 1 },
  };

  /**
   * (상대좌표계 기준) 이동한 거리(diffX, diffY)를 기반으로 크기 변경된 width와 height 계산
   *
   * 1. 현재 어떤 방향으로 리사이징 하였는지 확인하고, 해당 방향으로 움직이면 어떤 factor가 어떻게 변경되어야 하는지 구하기
   * 2. 변경되어야 하는 factor들을 이동한 거리 만큼 변경시켜서 새로운 width, height 구하기
   * 3. 최솟값보다 작아지는지 확인 후 새로운 width와 height 리턴
   */
  const calculateDimensionsAfterResize = (direction: ActiveDirection, diffX: number, diffY: number) => {
    const { width: widthFactor, height: heightFactor } = directionConfig[direction];

    // 이동한 거리 기반으로 새로운 width, height 구하기
    const width = widthFactor !== 0 ? resizeOffset.startWidth + widthFactor * diffX : curPosition.width;
    const height = heightFactor !== 0 ? resizeOffset.startHeight + heightFactor * diffY : curPosition.height;

    // TextBox 내부 요소보다 작게 줄어드는 것을 방지하기 위한 최솟값 확인
    const { width: newWidth, height: newHeight } = calculateWithMinSize(width, height);

    return { width: newWidth, height: newHeight };
  };

  /**
   * 리사이징 후 새로운 위치 정보(Position)를 계산하는 로직
   *
   * 1. 상대좌표계 기준 x,y 변화량 계산 (회전된 방향 기준으로 어느정도 이동했는지 확인해야 하기 때문)
   * 2. 상대 기준 변화량(diffX, diffY)를 기반으로 크기 변경된 width와 height 계산
   * 3. 절대좌표계 기준 x,y 변화량 계산해서 리사이징 후의 요소의 기준점(x,y) 구하기
   * 4. 리사이징 후 최종 위치 정보 리턴
   */
  const calculatePositionAfterResize = (e: PointerEvent) => {
    if (resizeDirection === 'none') return;

    const { startClientX, startClientY, startCenterX, startCenterY } = resizeOffset;

    // 상대좌표계 기준 변화량
    const { diffX, diffY } = getDiffInRelative(e.clientX, e.clientY, startClientX, startClientY);
    // 변경 후 크기
    const { width, height } = calculateDimensionsAfterResize(resizeDirection, diffX, diffY);

    // 절대좌표계에서의 diff를 계산
    const absoluteDiffX = e.clientX - startClientX;
    const absoluteDiffY = e.clientY - startClientY;

    // 새로운 중심점은 두 모서리(고정된 모서리와 잡고 이동시킨 모서리)의 중간에 위치하기 때문에 변화량의 절반 만큼 이동하게 됨
    const curCenterX = startCenterX + absoluteDiffX / 2;
    const curCenterY = startCenterY + absoluteDiffY / 2;

    // 최종 x,y 계산
    const x = curCenterX - width / 2;
    const y = curCenterY - height / 2;

    return { width, height, x, y };
  };

  // resize 이벤트 핸들러

  /**
   * resize 시작 핸들러
   * @param direction 방향 (N,S,E,W,NE,NW,SE,SW)
   */
  const resizePointerDownHandler = (e: React.PointerEvent, direction: Direction) => {
    e.stopPropagation();

    setResizeDirection(direction);

    // 요소 중앙 좌표 계산
    const startCenterX = curPosition.x + curPosition.width / 2;
    const startCenterY = curPosition.y + curPosition.height / 2;

    setResizeOffset(prev => {
      return {
        ...prev,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startWidth: curPosition.width,
        startHeight: curPosition.height,
        startCenterX,
        startCenterY,
      };
    });
  };

  /**
   * resize 중에 실행되는 로직
   * 변경된 위치를 계산하여 curPosition에 업데이트 하여 바로 변경된 위치,크기가 렌더링 되게 함
   */
  const resizePointerMoveHandler = (e: PointerEvent) => {
    e.stopPropagation();

    const newPosition = calculatePositionAfterResize(e);

    setCurPosition(prev => {
      return { ...prev, ...newPosition };
    });
  };

  /**
   * resize 끝난 후에 실행되는 로직
   * 변경된 위치를 전역 상태에 저장하고, 이전에 기록된 상태를 초기화함
   */
  const resizePointerUpHandler = (e: PointerEvent) => {
    e.stopPropagation();

    const newPosition = calculatePositionAfterResize(e);

    setPosition(cardId, layerId, { ...curPosition, ...newPosition });
    setResizeOffset({ ...INITIAL_RESIZE_OFFSET });
    setResizeDirection('none');
  };

  /**
   * resize 이벤트 등록
   * @NOTE : 캡처링 단계에서 실행되는 이벤트
   */
  useEffect(() => {
    if (resizeDirection === 'none') return;

    window.addEventListener('pointermove', resizePointerMoveHandler, true);
    window.addEventListener('pointerup', resizePointerUpHandler, true);

    return () => {
      window.removeEventListener('pointermove', resizePointerMoveHandler, true);
      window.removeEventListener('pointerup', resizePointerUpHandler, true);
    };
  }, [resizeDirection]);

  return { resizePointerDownHandler };
};

export default useResize;
