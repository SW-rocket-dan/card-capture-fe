import TextToolbar from '@/app/components/Text/TextToolbar';
import TextBox from '@/app/components/Text/TextBox';
import 'react-quill/dist/quill.snow.css';

const TextTest = () => {
  return (
    <div className="flex flex-col gap-5 m-3 border-2 p-5">
      <TextToolbar />
      <TextBox />
    </div>
  );
};

export default TextTest;
