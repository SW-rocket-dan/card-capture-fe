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

  /**
   * 현재 선택된 레이어의 타입 받아오기
   * background는 레이어가 아니라서 LayerType에 없기 때문에 추가해서 타입 설정함
   */
  let focusedLayerType: LayerType | 'background' | undefined = useCardsStore(state =>
    state.getLayer(focusedCardId, focusedLayerId),
  )?.type;

  /**
   * 1. illust와 shape은 같은 컴포넌트(IllustrationEditBox)를 사용하고 있어서, 해당 컴포넌트가 여러번 출력되는 것을 방지하기 위해 shape 타입으로 통일
   * 2. 선택된 레이어가 없다면 배경 컴포넌트가 맨 위에 오도록 설정
   */
  if (focusedLayerType === 'illust') focusedLayerType = 'shape';
  if (!focusedLayerType) focusedLayerType = 'background';

  const editBoxes = [
    { type: 'background', component: <BackgroundEditBox /> },
    { type: 'text', component: <TextEditBox /> },
    { type: 'image', component: <ImageEditBox /> },
    { type: 'shape', component: <IllustrationEditBox /> },
  ];

  /**
   * 1. 맨 위에 렌더링되고, 드롭다운이 열려야 한다는 focused 상태를 넘길 박스
   * 2. 나머지 컴포넌트들
   */
  const focusedEditBox = editBoxes.find(box => box.type === focusedLayerType);
  const remainingEditBoxes = editBoxes.filter(box => box.type !== focusedLayerType);

  return (
    <div className="flex h-full w-[280px] flex-1 flex-col">
      <header className="h-[50px] border-b-[1px] border-b-border p-[15px] text-[14px] font-bold">요소 수정</header>

      {/* 맨 위의 컴포넌트에는 focused : true를 넘겨서 컴포넌트가 열리도록 함 */}
      {React.cloneElement(focusedEditBox!.component, { focused: true })}
      {remainingEditBoxes.map((box, index) => (
        <div key={index}>{box.component}</div>
      ))}
    </div>
  );
};

export default EditTab;
