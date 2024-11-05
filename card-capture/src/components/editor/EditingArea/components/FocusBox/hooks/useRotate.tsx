import React, { useEffect, useState } from 'react';
import { Position } from '@/store/useCardsStore/type';
import { commandUtils } from '@/utils';

type UseRotateProps = {
  cardId: number;
  layerId: number;
  boxRef: React.RefObject<HTMLDivElement>;
  curPosition: Position;
  setCurPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const useRotate = ({ cardId, layerId, boxRef, curPosition, setCurPosition }: UseRotateProps) => {
  const [isRotate, setIsRotate] = useState(false);

  /**
   * 회전한 각도를 구하는 로직
   * Math.atan2를 사용하여 두 점의 좌표를 가지고 사이 각도를 구함
   */
  const calculateRotationDegrees = (e: PointerEvent) => {
    if (!boxRef.current) return;

    // 요소의 중심점 계산
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 화면 좌표계에서는 아래로 갈수록 y가 증가하기 때문에 보정하기 위해서 centerY - e.clientY 반대로 작성
    // 시계 방향 회전을 양의 각도로 표현하기 위해서 (y/x)가 아니라 (x/y)로 반대로 삽입
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);

    return nxAngle * (180 / Math.PI); // radian -> degree 변경 리턴
  };

  /**
   * 회전 버튼 클릭시 실행되는 로직
   * 이벤트 등록을 위해 상태 true로 변경
   */
  const pointerDownRotateHandler = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsRotate(true);
  };

  /**
   * 포인터 이동할 때 실행되는 로직
   * 회전한 만큼의 각도를 구해서 curPosition 업데이트함 -> 화면에 회전된 각도로 transform됨
   */
  const pointerMoveRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();

    if (!isRotate) return;
    if (!boxRef.current) return;

    const rotationDegrees = calculateRotationDegrees(e) || 0;

    setCurPosition(prev => ({
      ...prev,
      rotate: rotationDegrees,
    }));
  };

  /**
   * 포인터를 놓았을 때 실행되는 로직
   * 회전한 만큼의 각도를 전역 상태에 저장하여 회전 상태 기억하기
   */
  const pointerUpRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();

    setIsRotate(false);
    if (!boxRef.current) return;

    const rotationDegrees = calculateRotationDegrees(e) || 0;

    commandUtils.dispatchCommand('MODIFY_POSITION', {
      cardId,
      layerId,
      position: { ...curPosition, rotate: rotationDegrees },
    });
  };

  // rotate 이벤트 등록
  useEffect(() => {
    if (!isRotate) return;
    window.addEventListener('pointermove', pointerMoveRotateHandler, true);
    window.addEventListener('pointerup', pointerUpRotateHandler, true);

    return () => {
      window.removeEventListener('pointermove', pointerMoveRotateHandler, true);
      window.removeEventListener('pointerup', pointerUpRotateHandler, true);
    };
  }, [isRotate]);

  return { pointerDownRotateHandler };
};

export default useRotate;
