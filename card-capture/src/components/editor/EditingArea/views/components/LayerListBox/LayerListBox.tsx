import React from 'react';
import LayerListItem from '@/components/editor/EditingArea/views/components/LayerListBox/components/LayerListItem';
import { Card } from '@/store/useCardsStore/type';

type LayerListBoxProps = {
  card: Card;
};

const LayerListBox = ({ card }: LayerListBoxProps) => {
  const layers = [...card.layers].sort((a, b) => b.position.zIndex - a.position.zIndex);

  return (
    <div className="mt-[48px] flex h-[300px] w-[240px] flex-col rounded-[15px] bg-white drop-shadow">
      <div className="border-b border-border px-[15px] py-[9px] text-[12px] font-medium">레이어</div>
      <div className="my-[9px] flex flex-1 flex-col gap-1 overflow-y-scroll px-[10px]">
        {layers.map(layer => (
          <LayerListItem cardId={card.id} layer={layer} />
        ))}
      </div>
    </div>
  );
};

export default LayerListBox;
