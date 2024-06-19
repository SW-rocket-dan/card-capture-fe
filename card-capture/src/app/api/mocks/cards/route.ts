// app/api/v1/users/login/route.ts

import { Card } from '@/store/useCardsStore/type';

//GET요청 mock 데이터
export async function GET(request: Request) {
  // 임시로 만들어둔 카드 1장 ( 프로젝트 아님!! 나중에 바꿔나가며 생각해야함)
  const mockCard = {
    background: {
      url: '',
      opacity: 1,
      color: '#333333',
    },
    layers: [
      {
        id: 1,
        type: 'image',
        opacity: 1,
        zIndex: 1,
        position: {
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          rotate: 0,
        },
        content: {
          url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQgByBT5IiAT_a2x9pUVb4VMoOrlzHH7Jrzj-HB5jzHlR4lNLMS',
          cropStartX: 0,
          cropStartY: 0,
          cropWidth: 100,
          cropHeight: 100,
        },
      },
    ],
  };

  return new Response(JSON.stringify(mockCard as Card), {
    status: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
