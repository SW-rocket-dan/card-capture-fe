import React from 'react';
import LayerListItem from '@/components/editor/EditingArea/views/components/LayerListBox/components/LayerListItem';

const LayerListBox = () => {
  return (
    <div className="mt-[48px] h-[300px] w-[240px] rounded-[15px] bg-white drop-shadow">
      <div className="border-b border-border px-[15px] py-[9px] text-[12px] font-medium">레이어</div>
      <div className="flex flex-col px-[10px] py-[9px]">
        <LayerListItem layerId={1} />
      </div>
    </div>
  );
};

export default LayerListBox;
