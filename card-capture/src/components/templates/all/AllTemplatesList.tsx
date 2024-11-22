import { TemplateList } from '@/types';
import Title from '@/components/common/Title/Title';
import TemplateDetails from '@/components/templates/all/components/TemplateDetails';
import SearchTemplateBox from '@/components/main/SearchTemplate/components/SearchTemplateBox/SearchTemplateBox';
import { useQuery } from '@tanstack/react-query';
import { templateApi } from '@/api';
import { useState } from 'react';

type UserTemplatesProps = {
  title: string;
  content: string;
};

const AllTemplatesList = ({ title, content }: UserTemplatesProps) => {
  const [searchWord, setSearchWord] = useState('');

  const { data } = useQuery<TemplateList>({
    queryKey: ['public-templates', searchWord],
    queryFn: () => (searchWord ? templateApi.searchTemplates(searchWord) : templateApi.getPublicTemplateData()),
  });

  const searchHandler = (term: string) => {
    setSearchWord(term);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Title title={title} content={content} />

      <div className="flex w-full flex-col items-center py-5">
        <SearchTemplateBox searchWord={searchWord} onSearch={searchHandler} />
      </div>

      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-x-4 gap-y-7 px-6 py-12 sm:grid-cols-2 sm:px-8 md:px-12 lg:grid-cols-3 lg:px-14 xl:grid-cols-4">
        {data?.map(template => <TemplateDetails key={template.id} template={template} />)}
      </div>
    </div>
  );
};

export default AllTemplatesList;
