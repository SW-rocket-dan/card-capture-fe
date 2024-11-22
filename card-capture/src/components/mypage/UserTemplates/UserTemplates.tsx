import UserTemplateDetails from '@/components/mypage/UserTemplates/components/UserTemplateDetails';
import { TemplateList } from '@/types';
import Title from '@/components/common/Title/Title';

type UserTemplatesProps = {
  data: TemplateList | undefined;
  title: string;
  content: string;
};

const UserTemplates = ({ data, title, content }: UserTemplatesProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Title title={title} content={content} />

      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-x-4 gap-y-7 px-6 py-12 sm:grid-cols-2 sm:px-8 md:px-12 lg:grid-cols-3 lg:px-14 xl:grid-cols-4">
        {data?.map(template => <UserTemplateDetails key={template.id} template={template} />)}
      </div>
    </div>
  );
};

export default UserTemplates;
