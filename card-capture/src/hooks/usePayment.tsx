import { useCallback, useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { DISCOUNTED_PRICE, PAYMENT_METHODS } from '@/constants/payment';
import { paymentApi } from '@/api';

const usePayment = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [count, setCount] = useState(1);

  const purchaseHandler = useCallback(
    async (paymentMethodKey: keyof typeof PAYMENT_METHODS) => {
      // 여러번 결제 요청하는 것을 방지
      if (isDisabled) return;
      setIsDisabled(true);

      // 메세지 초기화
      setErrorMessage('');
      setSuccessMessage('');

      const totalAmount = count * DISCOUNTED_PRICE;

      try {
        const paymentId: string = await paymentApi.initiatePaymentProcess(count, DISCOUNTED_PRICE);

        if (paymentId) {
          const paymentRequestData = {
            storeId: process.env.NEXT_PUBLIC_STORE_ID || '',
            channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
            currency: 'CURRENCY_KRW',
            redirectUrl: 'https://cardcapture.app/pricing',
            ...PAYMENT_METHODS[paymentMethodKey],
            paymentId,
            totalAmount,
          } as PortOne.PaymentRequest;

          // PortOne 측으로 결제 요청
          const response = await PortOne.requestPayment(paymentRequestData);

          if (response?.paymentId) {
            // 결제가 성공했는지 확인하기 위헤 서버에 polling
            await paymentApi.pollPaymentStatus(
              response.paymentId,
              message => setSuccessMessage(message),
              message => setErrorMessage(message),
            );
          } else {
            setErrorMessage('결제에 실패했습니다.');
          }

          // 완료 후 1초 뒤에 결제 비활성화 -> 활성화로 다시 변경
          setTimeout(() => {
            setIsDisabled(false);
          }, 1000);
        }
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e.message || '결제 요청 중 오류가 발생했습니다.');
        } else {
          setErrorMessage('결제 요청 중 알 수 없는 오류가 발생했습니다.');
        }
      }
    },
    [isDisabled, count, PortOne],
  );

  return { count, setCount, isDisabled, errorMessage, successMessage, purchaseHandler };
};

export default usePayment;
