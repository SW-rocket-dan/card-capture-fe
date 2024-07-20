import { DummyTemplateType } from '@/components/main/TemplateGallery/TemplateGallery';

type TemplateListType = {
  templateData: DummyTemplateType[];
};

const TemplateList = ({ templateData }: TemplateListType) => {
  return (
    <div className="flex flex-row gap-[50px]">
      {templateData.map(({ img, tags }) => (
        <div className="flex flex-col gap-[15px]">
          <div className="h-[270px] w-[270px] rounded-[20px] bg-gray8">{img}</div>
          <p className="flex gap-2 text-[13px] text-gray2">
            {tags.map(tag => (
              <span>#{tag}</span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
