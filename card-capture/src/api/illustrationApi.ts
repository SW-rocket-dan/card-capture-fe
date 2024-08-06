import { customFetch } from '@/api/customFetchApi';

export type StickerDataType = {
  id: number;
  fileUrl: string;
  tags: { korean: string; english: string }[];
};

const getSearchedStickers = async (searchWord: string) => {
  const queryString = `searchTerm=${searchWord}`;

  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/sticker/search?${queryString}`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.log('GET sticker error', e);
  }
};

export default { getSearchedStickers };
