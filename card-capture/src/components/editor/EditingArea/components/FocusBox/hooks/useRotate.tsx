import React, { useEffect, useState } from 'react';
import { Position } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';

type UseRotateProps = {
  cardId: number;
  layerId: number;
  boxRef: React.RefObject<HTMLDivElement>;
  curPosition: Position;
  setCurPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const useRotate = ({ cardId, layerId, boxRef, curPosition, setCurPosition }: UseRotateProps) => {
  const setPosition = useCardsStore(state => state.setPosition);

  //rotate State
  const [isRotate, setIsRotate] = useState(false);

  const pointerDownRotateHandler = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsRotate(true);
  };

  const pointerMoveRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();
    if (!isRotate) return;

    // 요소의 중심점 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 다음 각도 계산
    //@NOTE: arctan을 활용한 각도 구하기
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);
    let rotationDegrees = nxAngle * (180 / Math.PI); //라디안 변경

    setCurPosition(prev => ({
      ...prev,
      rotate: rotationDegrees,
    }));
  };

  const pointerUpRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsRotate(false);
    // 요소의 중심점 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 다음 각도 계산
    //@NOTE: arctan을 활용한 각도 구하기
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);
    let rotationDegrees = nxAngle * (180 / Math.PI); //라디안 변경
    setPosition(cardId, layerId, { ...curPosition, rotate: rotationDegrees });

    if (boxRef.current) boxRef.current.focus();
  };

  //rotate 이벤트 등록
  //@NOTE : 캡처링 단계에서 실행되는 이벤트
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
