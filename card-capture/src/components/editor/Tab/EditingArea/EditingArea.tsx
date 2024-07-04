import CardArea from '@/components/editor/Tab/EditingArea/components/CardArea';
import LayerAddBox from '@/components/editor/Tab/EditingArea/components/LayerAddBox';
import Button from '@/components/common/Button';
import CardAddBox from '@/components/editor/Tab/EditingArea/components/CardAddBox';

const EditingArea = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[17px] bg-editorbg">
      <div className="flex w-[700px] flex-row justify-between">
        <CardAddBox />
        <div className="flex flex-row gap-[10px]">
          <LayerAddBox />
          <Button type="full" className="h-[43px] w-[170px]">
            Export
          </Button>
        </div>
      </div>
      <CardArea />
    </div>
  );
};

export default EditingArea;
