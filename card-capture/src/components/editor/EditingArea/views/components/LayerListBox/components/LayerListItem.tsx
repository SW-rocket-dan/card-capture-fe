import EyeIcon from '@/components/common/Icon/EyeIcon';
import { AlignJustify } from 'lucide-react';
import { Layer } from '@/store/useCardsStore/type';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import { useFocusStore } from '@/store/useFocusStore';

type LayerListItemProps = {
  layer: Layer;
};

const LayerListItem = ({ layer }: LayerListItemProps) => {
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);
  const isFocused = focusedLayerId === layer.id;

  const focusLayerHandler = () => {
    setFocusedLayerId(layer.id);
  };

  return (
    <div
      className={`flex w-full flex-row items-center gap-3 rounded border border-border px-2.5 py-[8px] ${isFocused ? 'bg-light-main' : 'bg-white'}`}
      onDoubleClick={focusLayerHandler}
    >
      <div className="flex flex-row gap-2">
        <EyeIcon width={13} />
        <TrashIcon width={13} />
      </div>

      <div className="flex flex-1 flex-row items-center gap-3">
        <div className="h-8 w-8 border border-border bg-bannerbg"></div>
        <p className="text-xs">Layer {layer.id + 1}</p>
      </div>
      <AlignJustify width={13} className="text-gray2" />
    </div>
  );
};

export default LayerListItem;
