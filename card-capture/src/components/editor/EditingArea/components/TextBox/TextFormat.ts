import { Quill } from 'react-quill';

const Parchment = Quill.import('parchment');

// 폰트 종류

export const availableFontFamily = [
  'Pretendard',
  'NanumGothic',
  'Jua',
  'NotoSans',
  'NotoSerif',
  'BlackHanSans',
  'DoHyeon',
  'NanumPenScript',
  'GothicA1',
  'Dongle',
  'Sunflower',
  'Hahmlet',
  'Gugi',
  'Gaegu',
  'GamjaFlower',
  'GowunDodum',
  'GowunBatang',
  'SongMyung',
  'CuteFont',
  'EastSeaDokdo',
  'Stylish',
  'SingleDay',
  'YeonSung',
  'GasoekOne',
  'BagelFatOne',
  'Orbit',
];

const Font = Quill.import('formats/font');
Font.whitelist = availableFontFamily;
Quill.register(Font, true);

// 폰트 사이즈

export const availableFontSize = ['12px', '16px', '18px', '24px', '28px', '32px', '48px', '64px', '96px', '128px'];
const fontSizeList = Array.from({ length: 128 }, (_, i) => `${i + 1}px`);

let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeList;
Quill.register(Size, true);

// 자간 (Letter Spacing)

export const availableLetterSpacing = ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px', '9px', '10px'];

const LetterSpacingStyle = new Parchment.Attributor.Style('letter-spacing', 'letter-spacing', {
  scope: Parchment.Scope.INLINE,
  whiteList: availableLetterSpacing,
});
Quill.register(LetterSpacingStyle, true);

// 행간 (Line Height)

export const availableLineHeight = ['10px', '15px', '20px', '25px', '30px'];

const LineHeightStyle = new Parchment.Attributor.Style('line-height', 'line-height', {
  scope: Parchment.Scope.BLOCK,
  whitelist: availableLineHeight,
});
Quill.register(LineHeightStyle, true);

// 장평 (Font Stretch)

export const availableFontStretch = ['50', '75', '100', '125', '150'];

const FontStretchStyle = new Parchment.Attributor.Class('font-stretch', 'ql-fontStretch', {
  scope: Parchment.Scope.INLINE,
  whiteList: availableFontStretch,
});
Quill.register(FontStretchStyle, true);

// 외곽선 (Outline)

export const availableOutline = ['small', 'medium', 'large'];

/**
 * 기본 style값들(background, font-family)은 Style에 적용, 사용자 정의 스타일(.ql-...)은 Class에 등록해줘야 함
 * ql-outline-[type] 이름으로 정의된 스타일이 적용됨
 */
const OutlineStyle = new Parchment.Attributor.Class('outline', 'ql-outline', {
  scope: Parchment.Scope.INLINE,
  whitelist: availableOutline,
});
Quill.register(OutlineStyle, true);
