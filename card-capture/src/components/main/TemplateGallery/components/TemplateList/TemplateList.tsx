import { DummyTemplateType } from '@/components/main/TemplateGallery/data/templateData';

type TemplateListType = {
  templateData: DummyTemplateType[];
};

const TemplateList = ({ templateData }: TemplateListType) => {
  return (
    <div className="flex flex-col gap-[25px] sm:flex-row md:gap-[50px]">
      {templateData.map(({ img, tags }, index) => (
        <div key={index} className="flex flex-col gap-[15px]">
          <div className="h-[300px] w-[300px] overflow-hidden rounded-[20px] bg-gray8 sm:h-[220px] sm:w-[220px] md:h-[270px] md:w-[270px]">
            <img src={img} alt="template" className="h-full w-full" />
          </div>
          <p className="flex gap-2 px-1 text-[13px] text-gray2">
            {tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
