import { Position } from '@/store/useCardsStore/type';
import { useEffect, useState } from 'react';

type UseCalculatePositionProps = {
  curPosition: Position;
};

const useCalculatePosition = ({ curPosition }: UseCalculatePositionProps) => {
  const [positionY, setPositionY] = useState<number>(curPosition.y);

  const rotatePoint = (x: number, y: number, centerX: number, centerY: number, angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const nx = cos * (x - centerX) - sin * (y - centerY) + centerX;
    const ny = sin * (x - centerX) + cos * (y - centerY) + centerY;

    return { x: nx, y: ny };
  };

  const calculateHighestY = () => {
    const { x, y, width, height, rotate } = curPosition;

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const pointList = [
      { x, y },
      { x: x + width, y },
      { x, y: y + height },
      { x: x + width, y: y + height },
    ];

    const rotatedPointList = pointList.map(point => rotatePoint(point.x, point.y, centerX, centerY, rotate));

    return Math.min(...rotatedPointList.map(point => point.y));
  };

  useEffect(() => {
    const newPosition = calculateHighestY();
    setPositionY(newPosition);
  }, [curPosition]);

  return { positionY };
};

export default useCalculatePosition;
