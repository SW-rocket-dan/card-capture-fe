import PricingTitle from '@/components/pricing/common/PricingTitle/PricingTitle';

const SinglePayment = () => {
  return (
    <div className="flex w-full flex-col">
      <PricingTitle title="단건 결제" description="여러 장을 한 번에 구매하는 것이 부담스러우신 분들께 추천!" />
    </div>
  );
};

export default SinglePayment;
