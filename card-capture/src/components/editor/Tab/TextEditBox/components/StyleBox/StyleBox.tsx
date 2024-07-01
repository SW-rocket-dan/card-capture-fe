import { useState } from 'react';
import AlignButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/AlignButton';

const StyleBox = () => {
  return (
    <div className="flex flex-row justify-between px-[15px] py-[10px]">
      <AlignButton />
    </div>
  );
};

export default StyleBox;
