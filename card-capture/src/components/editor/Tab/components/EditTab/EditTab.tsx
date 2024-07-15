import TextEditBox from '@/components/editor/Tab/components/EditTab/TextEditBox/TextEditBox';
import BackgroundEditBox from '@/components/editor/Tab/components/EditTab/BackgroundEditBox/BackgroundEditBox';
import ImageEditBox from '@/components/editor/Tab/components/EditTab/ImageEditBox/ImageEditBox';
import IllustrationEditBox from '@/components/editor/Tab/components/EditTab/IllustrationEditBox/IllustrationEditBox';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import { LayerType } from '@/store/useCardsStore/type';
import React from 'react';

const EditTab = () => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);

  let focusedLayerType: LayerType | 'background' | undefined = useCardsStore(state =>
    state.getLayer(focusedCardId, focusedLayerId),
  )?.type;

  if (focusedLayerType === 'illust') focusedLayerType = 'shape';
  if (!focusedLayerType) focusedLayerType = 'background';

  const editBoxes = [
    { type: 'background', component: <BackgroundEditBox /> },
    { type: 'text', component: <TextEditBox /> },
    { type: 'image', component: <ImageEditBox /> },
    { type: 'shape', component: <IllustrationEditBox /> },
  ];

  const focusedEditBox = editBoxes.find(box => box.type === focusedLayerType);
  const remainingEditBoxes = editBoxes.filter(box => box.type !== focusedLayerType);

  return (
    <div className="flex h-full w-[280px] flex-1 flex-col">
      <header className="h-[50px] border-b-[1px] border-b-border p-[15px] text-[14px] font-bold">요소 수정</header>
      {React.cloneElement(focusedEditBox!.component, { focused: true })}
      {remainingEditBoxes.map((box, index) => (
        <div key={index}>{box.component}</div>
      ))}
    </div>
  );
};

export default EditTab;
