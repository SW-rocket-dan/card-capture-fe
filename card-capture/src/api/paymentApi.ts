import { customFetch } from '@/api/customFetchApi';
import { MAX_POLL_ATTEMPTS, POLL_INTERVAL } from '@/constants/payment';

/**
 * 결제 가능한 상황인지 확인하고 결제 가능할 시에 고유한 paymentId를 받아오는 post api
 * try-catch 에러 처리는 더 상위 로직에서 작동하고 있음 -> errorMessage를 상태에 저장하기 위함
 */
export const initiatePaymentProcess = async (count: number, amount: number) => {
  const paymentData = {
    products: [{ productCategory: 'AI_POSTER_PRODUCTION_TICKET', quantity: count, price: amount }],
    totalPrice: amount * count,
    requestTime: new Date().toISOString(),
  };

  // 결제 데이터를 서버에 보내서 결제 가능한 상황인지 확인
  const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/payment/single/startCheck`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  // 결제가 불가능한 상황이면 어떤 사유로 불가능한지 에러 throw
  if (!response.ok) {
    const errorMessages: { [key: number]: string } = {
      400: '요청 데이터가 올바르지 않습니다.',
      402: '결제 가능 금액을 초과했습니다.',
      409: '재고가 부족합니다.',
      429: '너무 빠르게 중복 요청되었습니다.',
    };

    throw new Error(errorMessages[response.status] || '결제 요청 중 오류가 발생했습니다.');
  }

  // 결제 가능하면 고유한 paymentId 리턴
  const jsonData = await response.json();

  return jsonData.data.paymentId;
};

/**
 * 결제가 제대로 완료되었는지 서버에 polling하는 post api
 * 일정 횟수만큼 polling 시도하고, 해당 횟수 안에 결제가 성공하지 않았으면 에러를 반환함
 */
export const pollPaymentStatus = (paymentId: string, onError: (message: string) => void): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    let attempts = 0;

    const checkStatus = async () => {
      if (attempts >= MAX_POLL_ATTEMPTS) {
        onError('결제 완료 확인에 실패했습니다. 이용권이 확인되지 않으면 고객센터에 문의해주세요.');
        resolve(false);
        return;
      }

      try {
        const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/payment/single/endCheck`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentId }),
        });

        const result = await response.json();

        if (response.ok && result.data && result.data.paymentStatus === 'FINAL_PAID') {
          resolve(true);
          return;
        } else {
          attempts++;
          setTimeout(checkStatus, POLL_INTERVAL);
        }
      } catch (error) {
        attempts++;
        setTimeout(checkStatus, POLL_INTERVAL);
      }
    };

    checkStatus();
  });
};

export default { initiatePaymentProcess, pollPaymentStatus };
