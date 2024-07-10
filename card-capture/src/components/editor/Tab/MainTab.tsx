import EditIcon from '@/components/common/Icon/EditIcon';
import PromptIcon from '@/components/common/Icon/PromptIcon';
import UserIcon from '@/components/common/Icon/UserIcon';

const MainTab = ({ currentTab, onChange }: { currentTab: string; onChange: (current: string) => void }) => {
  return (
    <div className="flex h-full w-[70px] flex-col items-center gap-[10px] border-r-[1px] border-border py-[20px]">
      <button
        onClick={() => onChange('edit')}
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-full ${currentTab === 'edit' ? 'bg-main' : 'bg-white'} `}
      >
        <EditIcon className={currentTab === 'edit' ? 'text-white' : 'text-icon'} width={17} />
      </button>
      <button
        onClick={() => onChange('prompt')}
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-full ${currentTab === 'prompt' ? 'bg-main' : 'bg-white'} `}
      >
        <PromptIcon className={currentTab === 'prompt' ? 'text-white' : 'text-icon'} width={19} />
      </button>
      <button
        onClick={() => onChange('my')}
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-full ${currentTab === 'my' ? 'bg-main' : 'bg-white'} `}
      >
        <UserIcon className={currentTab === 'my' ? 'text-white' : 'text-icon'} width={17} />
      </button>
    </div>
  );
};

export default MainTab;
