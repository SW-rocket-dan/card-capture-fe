import { Card, Illust, Image, Shape, Text } from '@/store/useCardsStore/type';
import ShapeBox from '@/components/editor/EditingArea/components/ShapeBox/ShapeBox';
import ImageBox from '@/components/editor/EditingArea/components/ImageBox/ImageBox';
import IllustBox from '@/components/editor/EditingArea/components/IllustBox/IllustBox';
import React, { forwardRef } from 'react';
import RenderBox from '@/components/common/Poster/components/RenderBox';
import ReadOnlyTextBox from '@/components/common/Poster/components/ReadOnlyTextBox';

type PosterProps = {
  size: number;
  card: Card | undefined;
  isSelected?: boolean;
};

const Poster = forwardRef<HTMLDivElement, PosterProps>(({ size, card, isSelected }, ref) => {
  if (!card) return <div></div>;

  const background = card.background;
  const scaleRatio = size / 550;

  return (
    <div className={`border-[2.5px] ${isSelected ? 'border-main' : 'border-transparent'}`}>
      <div
        ref={ref}
        className={`relative overflow-hidden bg-white`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          userSelect: 'auto',
          backgroundImage: `url(${background.url})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: background.color,
          opacity: background.opacity / 100,
          boxSizing: 'border-box',
        }}
      >
        {card.layers.map((layer, idx) => {
          if (layer.type === 'text') {
            const contentText = layer.content as Text;

            // Text Layer Box
            return (
              <RenderBox key={idx} position={layer.position} ratio={scaleRatio}>
                <ReadOnlyTextBox text={contentText.content} />
                <div></div>
              </RenderBox>
            );
          } else if (layer.type === 'shape') {
            // 도형 Layer Box
            const { type, color } = layer.content as Shape;
            return (
              <RenderBox key={idx} position={layer.position} ratio={scaleRatio}>
                <ShapeBox shapeType={type} color={color} />
              </RenderBox>
            );
          } else if (layer.type === 'image') {
            const { url } = layer.content as Image;

            return (
              <RenderBox key={idx} position={layer.position} ratio={scaleRatio}>
                <ImageBox url={url} position={layer.position} />
              </RenderBox>
            );
          } else if (layer.type === 'illust') {
            const { url } = layer.content as Illust;

            return (
              <RenderBox key={idx} position={layer.position} ratio={scaleRatio}>
                <IllustBox url={url} position={layer.position} />
              </RenderBox>
            );
          }
        })}
      </div>
    </div>
  );
});

export default Poster;
