import { Card, Text } from '@/store/useCardsStore/type';
import ReactQuill from 'react-quill';

/**
 * Card에서 색상을 추출하는 함수
 */
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

/**
 * ReactQuill.Value에서 폰트를 추출하는 함수
 */
const extractFontsFromQuill = (content: ReactQuill.Value): string[] => {
  if (typeof content === 'string') {
    // 단순 문자열인 경우 폰트 정보가 없으므로 빈 배열 반환
    return [];
  }

  const fonts = new Set<string>();

  // Delta 객체 처리
  if (content && typeof content === 'object' && 'ops' in content) {
    content.ops?.forEach((op: any) => {
      if (op.attributes?.font) {
        fonts.add(op.attributes.font);
      }
    });
  }

  return Array.from(fonts);
};

/**
 * Card 객체에서 사용된 모든 폰트를 추출
 */
const extractFonts = (cards: Card[]): string[] => {
  const fonts = new Set<string>();

  cards.map(card =>
    card.layers.forEach(layer => {
      if (layer.type === 'text') {
        const textContent = layer.content as Text;
        const extractedFonts = extractFontsFromQuill(textContent.content);

        extractedFonts.forEach(font => fonts.add(font));
      }
    }),
  );

  return Array.from(fonts);
};

export default { extractColors, extractFonts };
