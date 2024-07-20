type TemplateSelectorProps = {
  selected: string;
  onChangeSelected: (value: string) => void;
};

const TemplateSelector = ({ selected, onChangeSelected }: TemplateSelectorProps) => {
  return (
    <div className="flex flex-row gap-5 text-[16px] font-semibold">
      <button
        onClick={() => onChangeSelected('instagram')}
        className={`rounded-[30px] px-[20px] py-[10px] ${selected === 'instagram' ? 'bg-main text-white' : 'bg-transparent text-gray5'}`}
      >
        Instagram
      </button>
      <button
        onClick={() => onChangeSelected('blog')}
        className={`rounded-[30px] px-[20px] py-[10px] ${selected === 'blog' ? 'bg-main text-white' : 'bg-transparent text-gray5'}`}
      >
        Blog
      </button>
      <button
        onClick={() => onChangeSelected('anything')}
        className={`rounded-[30px] px-[20px] py-[10px] ${selected === 'anything' ? 'bg-main text-white' : 'bg-transparent text-gray5'}`}
      >
        어디에나
      </button>
    </div>
  );
};

export default TemplateSelector;
