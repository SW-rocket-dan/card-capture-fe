export const ORIGINAL_PRICE = 5000;
export const DISCOUNTED_PRICE = 500;
export const MAX_POLL_ATTEMPTS = 3;
export const POLL_INTERVAL = 300;

export const PAYMENT_METHODS = {
  CARD: {
    payMethod: 'CARD',
    orderName: 'AI 포스터 생성 1장 이용권(토스페이먼츠 단건 결제) (실결제) (카드)',
  },
  CULTURE: {
    payMethod: 'GIFT_CERTIFICATE',
    orderName: 'AI 포스터 생성 1장 이용권(토스페이먼츠 단건 결제) (실결제) (문화상품권)',
    giftCertificate: { giftCertificateType: 'CULTURELAND' },
  },
  BOOK: {
    payMethod: 'GIFT_CERTIFICATE',
    orderName: 'AI 포스터 생성 1장 이용권(토스페이먼츠 단건 결제) (실결제) (도서문화상품권)',
    giftCertificate: { giftCertificateType: 'BOOKNLIFE' },
  },
  GAME: {
    payMethod: 'GIFT_CERTIFICATE',
    orderName: 'AI 포스터 생성 1장 이용권(토스페이먼츠 단건 결제) (실결제) (게임문화상품권)',
    giftCertificate: { giftCertificateType: 'SMART_MUNSANG' },
  },
  MOBILE: {
    payMethod: 'MOBILE',
    orderName: 'AI 포스터 생성 1장 이용권(토스페이먼츠 단건 결제) (실결제) (휴대폰 소액결제)',
  },
} as const;
