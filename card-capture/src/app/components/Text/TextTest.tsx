import TextToolbar from '@/app/components/Text/TextToolbar';
import TextBox from '@/app/components/Text/TextBox';
import 'react-quill/dist/quill.snow.css';
import { useTextStore } from '@/store/useTextStore';

const TextTest = () => {
  const { text, addTextBox, setText } = useTextStore();

  /**
   * 새로운 TextBox 생성을 위해 text, ref 저장할 공간 마련
   */
  const addTextBoxHandler = () => {
    addTextBox();
  };

  return (
    <div className="flex flex-col gap-5 m-3 border-2 p-5 items-start">
      <TextToolbar />
      <button
        className="p-2 bg-gray-200 border-2 rounded-md"
        onClick={addTextBoxHandler}
      >
        텍스트 추가하기
      </button>
      {text.map((_, index) => (
        <TextBox key={index} index={index} />
      ))}
    </div>
  );
};

export default TextTest;
