//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { LayerType } from '@/store/useCardsStore/type';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import useDrag from '@/components/editor/EditingArea/components/FocusBox/hooks/useDrag';
import useResize from '@/components/editor/EditingArea/components/FocusBox/hooks/useResize';
import useRotate from '@/components/editor/EditingArea/components/FocusBox/hooks/useRotate';
import useDeleteLayer from '@/components/editor/EditingArea/components/FocusBox/hooks/useDeleteLayer';
import AIIcon from '@/components/common/Icon/AIIcon';
import { useFocusStore } from '@/store/useFocusStore';
import InlineTextEditBox from '@/components/editor/EditingArea/components/FocusBox/components/InlineTextEditBox/InlineTextEditBox';
import useCalculatePosition from '@/components/editor/EditingArea/components/FocusBox/hooks/useCalculatePosition';

type Props = {
  children: React.ReactElement<{
    isDoubleClicked: boolean;
  }>;
  cardId: number;
  layerId: number;
  type?: LayerType;
  initialMouseDown: React.MouseEvent | null;
};

/**
 * Focus(수정상태) 가 된 정보
 * @param component Box안에 띄어줄 컴포넌트
 * @param position 위치정보에 따라서 위치를 렌더링해줌
 * **/
const FocusBox = ({ children, cardId, layerId, type, initialMouseDown }: Props) => {
  const layer = useCardsStore(state => state.cards[cardId].layers.filter(v => v.id === layerId)[0]);

  const [curPosition, setCurPosition] = useState(layer.position); // 현재 위치를 스토어에 업로드 하지 않고 관리하기위한 state

  // 클릭해도 Focus 상태가 풀리지 않게 하기 위한 이벤트 전파 방지
  const stopPropagation = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  /**
   * 두번 클릭하면 텍스트 입력 활성화 되는 로직
   */
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const doubleClickHandler = () => {
    if (isDoubleClicked) return;

    setIsDoubleClicked(prev => !prev);
  };

  /**
   * 내부 컴포넌트(TextBox)의 크기가 변경되면 확인해서 FocusBox의 크기 업데이트됨
   */
  useEffect(() => {
    setCurPosition(layer.position);
  }, [layer.position]);

  //              //
  /* 드래그 관련 로직 */
  //              //

  const { isDrag, pointerDownDragHandler } = useDrag({
    cardId,
    layerId,
    type,
    curPosition,
    setCurPosition,
    initialMouseDown,
    isDoubleClicked,
  });

  //                //
  /* 크기 resize 로직 */
  //                //
  const { resizePointerDownHandler } = useResize({
    cardId,
    layerId,
    type,
    children,
    curPosition,
    setCurPosition,
  });

  //            //
  /* rotate 로직 */
  //            //
  const boxRef = useRef<HTMLDivElement>(null);

  const { pointerDownRotateHandler } = useRotate({
    cardId,
    layerId,
    boxRef,
    curPosition,
    setCurPosition,
  });

  const { positionY: editorPositionY } = useCalculatePosition({ curPosition });

  //               //
  /* Layer 삭제 로직 */
  //               //
  const { deleteLayerOnClickHandler } = useDeleteLayer({ cardId });

  /**
   * 이미지 재생성을 위해 현재 탭을 prompt 탭으로 변경하는 로직
   */
  const setCurrentTab = useFocusStore(state => state.setCurrentTab);

  const switchToPromptTab = () => {
    setCurrentTab('prompt');
  };

  return (
    <>
      <div
        className="absolute"
        style={{
          left: curPosition.x + (curPosition.width - 300) / 2,
          top: editorPositionY - 90,
          zIndex: 1020,
        }}
        onClick={stopPropagation}
      >
        <InlineTextEditBox />
      </div>

      {/* z-index 상승하는 border와 control 버튼들 */}
      <div
        className={`absolute border-2 border-main ${isDoubleClicked && type === 'text' && 'border-main'}`}
        style={{
          left: curPosition.x,
          top: curPosition.y,
          width: curPosition.width,
          height: curPosition.height,
          zIndex: 1000,
          transform: `rotate(${curPosition.rotate}deg)`,
          transformOrigin: 'center',
          pointerEvents: 'none', // 이벤트가 통과되어서 아래있는 요소(자식요소 아니고 아래 위치 요소)가 이벤트를 받도록 함
        }}
      >
        {/* 11시,1시,5시,7시 크기조절 바 */}
        <div
          className="absolute -left-1.5 -top-1.5 h-3 w-3 cursor-nwse-resize rounded-full border-2 border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'nw')}
          style={{ pointerEvents: 'auto' }} // control 버튼들은 이벤트 받을 수 있도록 설정
        ></div>
        <div
          className="absolute -right-1.5 -top-1.5 h-3 w-3 cursor-nesw-resize rounded-full border-2 border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'ne')}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          className="absolute -bottom-1.5 -left-1.5 h-3 w-3 cursor-nesw-resize rounded-full border-2 border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'sw')}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-full border-2 border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'se')}
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* 12시,3시,6시,9시 크기조절 바 */}
        <div
          className="absolute -top-1.5 left-2/4 h-2.5 w-7 -translate-x-1/2 cursor-row-resize rounded border-[1.5px] border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'n')}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          className="absolute -right-1.5 top-1/2 h-7 w-2.5 -translate-y-1/2 cursor-col-resize rounded border-[1.5px] border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'e')}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          className="absolute -bottom-1.5 left-2/4 h-2.5 w-7 -translate-x-1/2 cursor-row-resize rounded border-[1.5px] border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 's')}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          className="absolute -left-1.5 top-1/2 h-7 w-2.5 -translate-y-1/2 cursor-col-resize rounded border-[1.5px] border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'w')}
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* rotate button */}
        <div
          className="absolute -top-8 left-2/4 flex h-5 w-5 -translate-x-1/2 cursor-grab items-center justify-center rounded-full bg-gray6"
          onPointerDown={pointerDownRotateHandler}
          onClick={stopPropagation}
          style={{ pointerEvents: 'auto' }}
        >
          <FaArrowRotateLeft size={9} />
        </div>
      </div>

      {/* 요소에 대한 레이어 */}
      <div
        className="absolute"
        style={{
          left: curPosition.x,
          top: curPosition.y,
          width: curPosition.width,
          height: curPosition.height,
          zIndex: curPosition.zIndex,
          transform: `rotate(${curPosition.rotate}deg)`,
          transformOrigin: 'center',
          wordWrap: 'break-word',
          boxSizing: 'border-box',
        }}
        tabIndex={0}
        onPointerDown={pointerDownDragHandler}
        onDoubleClick={doubleClickHandler}
        onClick={stopPropagation}
        ref={boxRef}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={`absolute inset-0 flex items-center justify-start p-3 ${
                isDrag ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ opacity: curPosition.opacity / 100 }}
            >
              {layer.type === 'text' && React.isValidElement(children)
                ? React.cloneElement(children, { isDoubleClicked })
                : children}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-[200px]">
            <ContextMenuItem onClick={deleteLayerOnClickHandler}>
              <div className="flex flex-row gap-3">
                <TrashIcon width={15} />
                <p> 삭제하기</p>
              </div>
            </ContextMenuItem>
            {type === 'image' && (
              <ContextMenuItem onClick={switchToPromptTab}>
                <div className="flex flex-row gap-3">
                  <AIIcon width={15} />
                  <p>이미지 재생성하기</p>
                </div>
              </ContextMenuItem>
            )}
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  );
};

export default FocusBox;
