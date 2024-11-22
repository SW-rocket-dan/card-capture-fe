import CardArea from '@/components/editor/EditingArea/views/CardArea';
import { useCardsStore } from '@/store/useCardsStore';
import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/store/useCardsStore/type';
import { TemplateUpdateRequest } from '@/types';
import { templateApi } from '@/api';
import { useFocusStore } from '@/store/useFocusStore';
import { authUtils } from '@/utils';

const EditingArea = () => {
  const templateId = useCardsStore(state => state.templateId);
  const cards = useCardsStore(state => state.cards);

  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);

  // 카드 외부 클릭시 focus 꺼지게 하는 로직
  const unFocusLayerHandler = () => {
    setFocusedLayerId(-1);
  };

  // 템플릿 저장시 필요한 정보 정제
  const prepareCardsForUpdate = (cards: Card[]): Partial<TemplateUpdateRequest> => {
    return {
      id: templateId,
      updatedAttributes: ['EDITOR'],
      editor: JSON.stringify(cards),
    };
  };

  const queryClient = useQueryClient();

  // tanstack-query 사용하여 업데이트
  const updateCardsMutation = useMutation({
    mutationFn: (cards: Card[]) => {
      const template = prepareCardsForUpdate(cards);
      return templateApi.updateTemplate(template);
    },
    onSuccess: () => {
      // 성공 시 캐시 무효화 또는 업데이트
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  /**
   * card가 변경되었을 때 서버에 저장하는 기능
   * card에 변경이 발생되면 3초 후에 서버에 요청 전송 -> 매 변경마다 보내면 api 요청을 과도하게 보내게 되는 문제 존재
   * 변경없으면 시간 지나도 요청 전송되지 않음
   */
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isLoggedIn = authUtils.getIsLoggedIn();
    if (!isLoggedIn) return;

    // 이전 타이머가 있다면 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새로운 타이머 설정
    timeoutRef.current = setTimeout(() => {
      updateCardsMutation.mutate(cards);
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cards]);

  return (
    <div
      onClick={unFocusLayerHandler}
      className="flex h-full flex-1 flex-col items-center justify-center gap-[17px] overscroll-none bg-editorbg pl-[350px]"
    >
      {cards.map(card => (
        <CardArea key={card.id} card={card} />
      ))}
    </div>
  );
};

export default EditingArea;
