// app/api/v1/users/login/route.ts

import { Card, Cards, Shape } from '@/store/useCardsStore/type';
import ReactQuill from 'react-quill';
import { DeltaStatic } from 'quill';

export const MOCK_CARD_DATA: Card[] = [
  {
    id: 0,
    background: {
      url: '',
      opacity: 100,
      color: '#e9feff',
    },
    layers: [
      {
        id: 1,
        type: 'text',
        content: {
          content: {
            ops: [
              {
                attributes: {
                  font: 'BlackHanSans',
                  size: '48px',
                },
                insert: '안녕하세요!',
              },
              {
                insert: '\n',
              },
            ],
          } as ReactQuill.Value,
        },
        position: {
          x: 145.376953125,
          y: 66.443359375,
          width: 252.08984375,
          height: 92.15625,
          rotate: 0,
          zIndex: 2,
          opacity: 100,
        },
      },
      {
        id: 2,
        type: 'text',
        content: {
          content: {
            ops: [
              {
                attributes: {
                  size: '18px',
                  font: 'Jua',
                  color: '#897eff',
                },
                insert: '지금은 테스트 기간이라 AI 카드뉴스가 아닌 ',
              },
              {
                attributes: {
                  align: 'center',
                },
                insert: '\n',
              },
              {
                attributes: {
                  size: '18px',
                  font: 'Jua',
                  color: '#897eff',
                },
                insert: '임시 데이터가 출력됩니다',
              },
              {
                attributes: {
                  align: 'center',
                },
                insert: '\n',
              },
            ],
          } as any,
        },
        position: {
          x: 91.66796875,
          y: 147.953125,
          width: 350.44140625,
          height: 75.109375,
          rotate: 0,
          zIndex: 2,
          opacity: 100,
        },
      },
      {
        id: 3,
        type: 'text',
        content: {
          content: {
            ops: [
              {
                attributes: {
                  font: 'Jua',
                  size: '24px',
                  bold: true,
                },
                insert: '감사합니다!',
              },
              {
                insert: '\n',
              },
            ],
          } as ReactQuill.Value,
        },
        position: {
          x: 201.0625,
          y: 217.3671875,
          width: 127.7421875,
          height: 58.078125,
          rotate: 0,
          zIndex: 2,
          opacity: 100,
        },
      },
    ],
  } as Card,
];

//GET요청 mock 데이터
export async function GET(request: Request) {
  // 임시로 만들어둔 카드 1장 ( 프로젝트 아님!! 나중에 바꿔나가며 생각해야함)
  const mockCard: Cards = {
    cards: [
      {
        id: 0,
        background: {
          url: '',
          opacity: 100,
          color: '#e9feff',
        },
        layers: [
          {
            id: 1,
            type: 'text',
            content: {
              content: {
                ops: [
                  {
                    attributes: {
                      font: 'BlackHanSans',
                      size: '48px',
                    },
                    insert: '안녕하세요!',
                  },
                  {
                    insert: '\n',
                  },
                ],
              } as ReactQuill.Value,
            },
            position: {
              x: 145.376953125,
              y: 66.443359375,
              width: 252.08984375,
              height: 92.15625,
              rotate: 0,
              zIndex: 2,
              opacity: 100,
            },
          },
          {
            id: 2,
            type: 'text',
            content: {
              content: {
                ops: [
                  {
                    attributes: {
                      size: '18px',
                      font: 'Jua',
                      color: '#897eff',
                    },
                    insert: '지금은 테스트 기간이라 AI 카드뉴스가 아닌 ',
                  },
                  {
                    attributes: {
                      align: 'center',
                    },
                    insert: '\n',
                  },
                  {
                    attributes: {
                      size: '18px',
                      font: 'Jua',
                      color: '#897eff',
                    },
                    insert: '임시 데이터가 출력됩니다',
                  },
                  {
                    attributes: {
                      align: 'center',
                    },
                    insert: '\n',
                  },
                ],
              } as any,
            },
            position: {
              x: 91.66796875,
              y: 147.953125,
              width: 350.44140625,
              height: 75.109375,
              rotate: 0,
              zIndex: 2,
              opacity: 100,
            },
          },
          {
            id: 3,
            type: 'text',
            content: {
              content: {
                ops: [
                  {
                    attributes: {
                      font: 'Jua',
                      size: '24px',
                      bold: true,
                    },
                    insert: '감사합니다!',
                  },
                  {
                    insert: '\n',
                  },
                ],
              } as ReactQuill.Value,
            },
            position: {
              x: 201.0625,
              y: 217.3671875,
              width: 127.7421875,
              height: 58.078125,
              rotate: 0,
              zIndex: 2,
              opacity: 100,
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
