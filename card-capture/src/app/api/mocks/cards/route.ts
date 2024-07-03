// app/api/v1/users/login/route.ts

import { Cards, Shape } from '@/store/useCardsStore/type';
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
            type: 'shape',
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
              type: 'rect',
              color: '#333333',
            } as Shape,
          },
          {
            id: 2,
            type: 'text',
            position: {
              x: 200,
              y: 200,
              width: 100,
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
              x: 300,
              y: 300,
              width: 100,
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
          {
            id: 4,
            type: 'shape',
            position: {
              x: 50,
              y: 50,
              width: 100,
              height: 100,
              rotate: 0,
              zIndex: 5,
              opacity: 1,
            },
            content: {
              type: 'triangle',
              color: '#420481',
            } as Shape,
          },
          {
            id: 5,
            type: 'shape',
            position: {
              x: 50,
              y: 100,
              width: 100,
              height: 100,
              rotate: 0,
              zIndex: 5,
              opacity: 1,
            },
            content: {
              type: 'circle',
              color: '#555555',
            } as Shape,
          },
          {
            id: 6,
            type: 'shape',
            position: {
              x: 150,
              y: 100,
              width: 100,
              height: 100,
              rotate: 0,
              zIndex: 5,
              opacity: 1,
            },
            content: {
              type: 'star',
              color: '#192739',
            } as Shape,
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
