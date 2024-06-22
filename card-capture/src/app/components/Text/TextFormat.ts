import ReactQuill, { Quill } from 'react-quill';

const Parchment = Quill.import('parchment');

// 폰트 종류
export const fontFamily = ['Pretendard', 'NanumGothic'];

const Font = Quill.import('formats/font');
Font.whitelist = fontFamily;
Quill.register(Font, true);

// 폰트 사이즈
export const fontSize = ['12px', '16px', '18px', '24px', '28px', '32px'];

let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSize;
Quill.register(Size, true);

// 자간 (Letter Spacing)

export const availableLetterSpacing = ['0px', '1px', '2px', '3px', '4px'];

const LetterSpacingStyle = new Parchment.Attributor.Style(
  'letter-spacing',
  'letter-spacing',
  {
    scope: Parchment.Scope.INLINE,
    whitelist: availableLetterSpacing,
  },
);
Quill.register(LetterSpacingStyle, true);

// 행간 (Line Height)

export const availableLineHeight = ['12px', '16px', '20px', '24px', '28px'];

const LineHeightStyle = new Parchment.Attributor.Style(
  'line-height',
  'line-height',
  {
    scope: Parchment.Scope.BLOCK,
    whitelist: availableLineHeight,
  },
);
Quill.register(LineHeightStyle, true);

// 장평 (Font Stretch)

export const availableFontStretch = ['50%', '75%', '100%', '125%'];

const FontStretchStyle = new Parchment.Attributor.Style(
  'font-stretch',
  'font-stretch',
  {
    scope: Parchment.Scope.INLINE,
    whiteList: availableFontStretch,
  },
);
Quill.register(FontStretchStyle, true);

// 외곽선 (Outline)

export const availableOutline = ['small', 'medium', 'large'];

const OutlineStyle = new Parchment.Attributor.Class('outline', 'ql-outline', {
  scope: Parchment.Scope.INLINE,
  whitelist: availableOutline,
});
Quill.register(OutlineStyle, true);

export { LetterSpacingStyle, LineHeightStyle, FontStretchStyle };
