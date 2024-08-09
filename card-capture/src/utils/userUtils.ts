import { ProductCategory } from '@/types/user.types';

/**
 * 이용권의 개수를 가져오는 로직
 * data가 로드되지 않았으면 0개를 리턴함
 */
const getTicketCount = (data: ProductCategory[]) => {
  return data
    ? data.find((category: ProductCategory) => category.productCategory === 'AI_POSTER_PRODUCTION_TICKET')?.quantity ??
        0
    : 0;
};

export default { getTicketCount };
