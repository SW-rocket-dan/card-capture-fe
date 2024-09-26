import { Card } from '@/store/useCardsStore/type';

const extractColors = (cards: Card[]) => {
  const colors = new Set<string>();

  const traverse = (item: any) => {
    if (typeof item !== 'object' || item === null) {
      return;
    }

    if (Array.isArray(item)) {
      item.forEach(traverse);
      return;
    }

    for (const [key, value] of Object.entries(item)) {
      if (key === 'color' && typeof value === 'string') {
        colors.add(value);
      } else if (typeof value === 'object' && value !== null) {
        traverse(value);
      }
    }
  };

  traverse(cards);
  return Array.from(colors);
};

export default { extractColors };
