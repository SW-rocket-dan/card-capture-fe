import { customFetch } from '@/api/customFetchApi';

export const initiatePaymentProcess = async (count: number, amount: number) => {
  const paymentData = {
    products: [{ productId: 'AI_POSTER_PRODUCTION_TICKET', quantity: count, price: amount }],
    totalPrice: amount * count,
    requestTime: new Date().toISOString(),
  };

  try {
    // 결제 데이터를 서버에 보내서 결제 가능한 상황인지 확인
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/payment/single/startCheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    // 결제가 불가능한 상황이면 어떤 사유로 불가능한지 에러 메세지를 리턴
    if (!response.ok) {
      const errorMessages: { [key: number]: string } = {
        400: '요청 데이터가 올바르지 않습니다.',
        402: '결제 가능 금액을 초과했습니다.',
        409: '재고가 부족합니다.',
        429: '너무 빠르게 중복 요청되었습니다.',
      };

      return {
        success: false,
        error: errorMessages[response.status] || '결제 요청 중 오류가 발생했습니다.',
      };
    }

    const jsonData = await response.json();

    // 결제 가능하면 고유한 paymentId 리턴
    return {
      success: true,
      paymentId: jsonData.data.paymentId,
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      error: '네트워크 오류가 발생했습니다.',
    };
  }
};

export default { initiatePaymentProcess };
