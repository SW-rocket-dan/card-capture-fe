import EyeIcon from '@/components/common/Icon/EyeIcon';
import { AlignJustify } from 'lucide-react';

type LayerListItemProps = {
  layerId: number;
};

const LayerListItem = ({ layerId }: LayerListItemProps) => {
  return (
    <div className="flex w-full flex-row items-center gap-3 rounded border border-border px-2.5 py-[8px]">
      <EyeIcon width={13} />
      <div className="flex flex-1 flex-row items-center gap-3">
        <div className="h-8 w-8 border border-border bg-bannerbg"></div>
        <p className="text-xs font-medium">Layer 1</p>
      </div>
      <AlignJustify width={13} className="text-gray2" />
    </div>
  );
};

export default LayerListItem;
