//FocusBox.tsx

import { useCardsStore } from '@/store/useCardsStore';
import { LayerType, Position } from '@/store/useCardsStore/type';
import React, { useEffect, useRef, useState } from 'react';
import { Direction, ResizeOffset } from './FocusBox.type';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { INITIAL_RESIZE_OFFSET } from './FocusBox.constant';
import { useFocusStore } from '@/store/useFocusStore';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import TrashIcon from '@/components/common/Icon/TrashIcon';
import useDrag from '@/components/editor/EditingArea/components/FocusBox/hooks/useDrag';
import useResize from '@/components/editor/EditingArea/components/FocusBox/hooks/useResize';

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
  const setPosition = useCardsStore(state => state.setPosition);

  const [curPosition, setCurPosition] = useState(layer.position); // 현재 위치를 스토어에 업로드 하지 않고 관리하기위한 state

  //rotate State
  const [isRotate, setIsRotate] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  //클릭해도 Focus 상태가 풀리지 않게하기위한 이벤트 전파 방지
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
  const pointerDownRotateHandler = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsRotate(true);
  };

  const pointerMoveRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();
    if (!isRotate) return;

    // 요소의 중심점 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 다음 각도 계산
    //@NOTE: arctan을 활용한 각도 구하기
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);
    let rotationDegrees = nxAngle * (180 / Math.PI); //라디안 변경

    setCurPosition(prev => ({
      ...prev,
      rotate: rotationDegrees,
    }));
  };

  const pointerUpRotateHandler = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsRotate(false);
    // 요소의 중심점 계산
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 다음 각도 계산
    //@NOTE: arctan을 활용한 각도 구하기
    const nxAngle = Math.atan2(e.clientX - centerX, centerY - e.clientY);
    let rotationDegrees = nxAngle * (180 / Math.PI); //라디안 변경
    setPosition(cardId, layerId, { ...curPosition, rotate: rotationDegrees });

    if (boxRef.current) boxRef.current.focus();
  };

  //rotate 이벤트 등록
  //@NOTE : 캡처링 단계에서 실행되는 이벤트
  useEffect(() => {
    if (!isRotate) return;
    window.addEventListener('pointermove', pointerMoveRotateHandler, true);
    window.addEventListener('pointerup', pointerUpRotateHandler, true);

    return () => {
      window.removeEventListener('pointermove', pointerMoveRotateHandler, true);
      window.removeEventListener('pointerup', pointerUpRotateHandler, true);
    };
  }, [isRotate]);

  // 현재 포커스된 요소가 입력 필드인지 확인하는 함수
  const isInputFocused = () => {
    const activeElement = document.activeElement;
    const isEditable = activeElement && activeElement.getAttribute('contenteditable') === 'true';

    return activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement || isEditable;
  };

  /**
   * 1. 선택한 Layer를 delete / backspace로 삭제하는 기능
   * 2. 오른쪽 클릭으로 메뉴를 띄워서 선택한 layer를 삭제하는 기능
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const deleteLayer = useCardsStore(state => state.deleteLayer);

  const deleteLayerOnKeyPressHandler = (e: KeyboardEvent) => {
    if (focusedCardId !== cardId) return;

    if (isInputFocused()) return;

    if (focusedLayerId !== -1 && (e.key === 'Backspace' || e.key === 'Delete')) {
      deleteLayer(cardId, focusedLayerId);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', deleteLayerOnKeyPressHandler);

    return () => document.removeEventListener('keydown', deleteLayerOnKeyPressHandler);
  }, [focusedLayerId]);

  const deleteLayerOnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (focusedCardId !== cardId) return;

    deleteLayer(cardId, focusedLayerId);
  };

  return (
    <>
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
          onPointerDown={e => resizePointerDownHandler(e, 'se')}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-full border-2 border-main bg-white"
          onPointerDown={e => resizePointerDownHandler(e, 'sw')}
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
        onMouseDown={e => e.stopPropagation()}
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
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  );
};

export default FocusBox;
