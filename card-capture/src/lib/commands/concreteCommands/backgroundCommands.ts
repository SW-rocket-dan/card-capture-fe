import { Background } from '@/store/useCardsStore/type';
import { Command } from '@/lib/commands/type';
import { useCardsStore } from '@/store/useCardsStore';

export const createModifyBackgroundCommand = (
  cardId: number,
  background: Partial<Background>,
  initialBackgroundData: Background,
): Command => {
  const cardStore = useCardsStore.getState();

  return {
    type: 'MODIFY_BACKGROUND',
    execute: () => {
      cardStore.setBackground(cardId, background);
    },
    undo: () => {
      cardStore.setBackground(cardId, initialBackgroundData);
    },
  };
};
