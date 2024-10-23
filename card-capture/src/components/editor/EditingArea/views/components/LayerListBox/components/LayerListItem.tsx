import EyeIcon from '@/components/common/Icon/EyeIcon';
import { AlignJustify } from 'lucide-react';
import { Layer } from '@/store/useCardsStore/type';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import { useFocusStore } from '@/store/useFocusStore';
import React from 'react';
import { useCardsStore } from '@/store/useCardsStore';

type LayerListItemProps = {
  cardId: number;
  layer: Layer;
};

const LayerListItem = ({ cardId, layer }: LayerListItemProps) => {
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);
  const isFocused = focusedLayerId === layer.id;

  const focusLayerHandler = () => {
    setFocusedLayerId(layer.id);
  };

  const deleteLayer = useCardsStore(state => state.deleteLayer);

  const deleteLayerHandler = () => {
    deleteLayer(cardId, layer.id);
  };

  return (
    <div
      className={`flex w-full flex-row items-center gap-3 rounded border border-border px-2.5 py-[8px] ${isFocused ? 'bg-light-main' : 'bg-white'}`}
      onDoubleClick={focusLayerHandler}
    >
      <div className="flex flex-row gap-2">
        <EyeIcon width={13} />
        <button onClick={deleteLayerHandler}>
          <TrashIcon width={13} />
        </button>
      </div>

      <div className="flex flex-1 flex-row items-center gap-3">
        <div className="h-8 w-8 border border-border bg-white"></div>
        <p className="text-xs">Layer {layer.id + 1}</p>
      </div>
      <AlignJustify width={13} className="text-gray2" />
    </div>
  );
};

export default LayerListItem;
