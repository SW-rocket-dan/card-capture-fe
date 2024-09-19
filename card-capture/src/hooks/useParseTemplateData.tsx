import { useEffect, useState } from 'react';
import { Card } from '@/store/useCardsStore/type';
import { jsonUtils } from '@/utils';

const useParseTemplateData = (editor: string) => {
  const [templateData, setTemplateData] = useState<Card[]>([]);

  useEffect(() => {
    const parsedData = jsonUtils.parseEscapedJson(editor);
    setTemplateData(parsedData);
  }, [editor]);

  return templateData;
};

export default useParseTemplateData;
