// app/api/v1/users/login/route.ts

import { Cards } from '@/store/useCardsStore/type';
import ReactQuill from 'react-quill';

//GET요청 mock 데이터
export async function GET(request: Request) {
  // 임시로 만들어둔 카드 1장 ( 프로젝트 아님!! 나중에 바꿔나가며 생각해야함)
  const mockCard: Cards = {
    cards: [
      {
        id: 0,
        background: {
          url: '',
          opacity: 1,
          color: '#333333',
        },
        layers: [
          {
            id: 1,
            type: 'text',
            position: {
              x: 100,
              y: 100,
              width: 100,
              height: 100,
              rotate: 0,
              zIndex: 2,
              opacity: 1,
            },
            content: {
              content: {
                ops: [
                  {
                    insert: '1번',
                  },
                ],
              } as ReactQuill.Value,
            },
          },
          {
            id: 2,
            type: 'text',
            position: {
              x: 180,
              y: 180,
              width: 50,
              height: 50,
              rotate: 0,
              zIndex: 1,
              opacity: 1,
            },
            content: {
              content: {
                ops: [
                  {
                    insert: '2번',
                  },
                ],
              } as ReactQuill.Value,
            },
          },
          {
            id: 3,
            type: 'text',
            position: {
              x: 200,
              y: 200,
              width: 50,
              height: 50,
              rotate: 0,
              zIndex: 1,
              opacity: 1,
            },
            content: {
              content: {
                ops: [
                  {
                    insert: '3번',
                  },
                ],
              } as ReactQuill.Value,
            },
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(mockCard as Cards), {
    status: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
