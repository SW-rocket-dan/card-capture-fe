import PricingTitle from '@/components/pricing/common/PricingTitle/PricingTitle';
import PricingItem, { PricingItemProps } from '@/components/pricing/common/PricingItem/PricingItem';

const SINGLE_PAYMENT_DATA: PricingItemProps[] = [
  {
    title: 'AI 포스터 생성 이용권',
    price: 500,
    description: 'AI로 포스터 완성본을 1번 생성할 수 있는 이용권이에요.',
    optionList: ['생성된 포스터를 에디터로 직접 수정할 수 있어요'],
  },
];

const SinglePayment = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[30px] pb-[50px]">
      <PricingTitle title="단건 결제" description="여러 장을 한 번에 구매하는 것이 부담스러우신 분들께 추천!" />
      <PricingItem {...SINGLE_PAYMENT_DATA[0]} />
    </div>
  );
};

export default SinglePayment;
