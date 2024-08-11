import UserTemplateDetails from '@/components/mypage/UserTemplates/components/UserTemplateDetails';
import { useQuery } from '@tanstack/react-query';
import { templateApi } from '@/api';
import { TemplateList } from '@/types';
import Title from '@/components/common/Title/Title';

const UserTemplates = () => {
  const { data } = useQuery<TemplateList>({ queryKey: ['all-template'], queryFn: templateApi.getAllTemplateData });

  return (
    <div className="flex h-full w-full flex-col">
      <Title title="내 템플릿 보기" content="내가 만든 템플릿을 모아서 볼 수 있어요!" />

      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-x-4 gap-y-7 px-6 py-12 sm:grid-cols-2 sm:px-8 md:px-12 lg:grid-cols-3 lg:px-14 xl:grid-cols-4">
        {data?.map(template => <UserTemplateDetails key={template.id} template={template} />)}
      </div>
    </div>
  );
};

export default UserTemplates;
