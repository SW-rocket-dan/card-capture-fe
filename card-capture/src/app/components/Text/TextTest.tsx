import TextToolbar from '@/app/components/Text/TextToolbar';
import TextBox from '@/app/components/Text/TextBox';
import 'react-quill/dist/quill.snow.css';
import { useTextStore } from '@/store/useTextStore';
import {Delta, DeltaOperation} from 'quill';

const TextTest = () => {
  const text = useTextStore(state => state.text);
  const setText = useTextStore(state=> state.setText)
  const addTextBox = useTextStore(state=> state.addTextBox);

  /**
   * 새로운 TextBox 생성을 위해 text, ref 저장할 공간 마련
   */
  const addTextBoxHandler = () => {
    addTextBox();
  };

  const addTempHandler = () => {
    const temp: {ops : DeltaOperation[]} = {
      ops: [
        {
          insert: 's',
        },
        {
          attributes: {
            color: '#b21010',
          },
          insert: 'ss',
        },
        {
          attributes: {
            size: '24px',
            color: '#b21010',
          },
          insert: 'ss',
        },
        {
          attributes: {
            size: '24px',
          },
          insert: 's',
        },
        {
          attributes: {
            'letter-spacing': '4px',
            size: '24px',
          },
          insert: 'sss',
        },
        {
          attributes: {
            'letter-spacing': '4px',
          },
          insert: 'ss',
        },
        {
          insert: '\n',
        },
      ],
    };
    addTextBox();
    setText(text.length, temp as Delta);
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
      <button
        className="p-2 bg-gray-200 border-2 rounded-md"
        onClick={addTempHandler}
      >
        정해진 형식 가져오기
      </button>
      {text.map((_, index) => (
        <TextBox key={index} index={index} />
      ))}
    </div>
  );
};

export default TextTest;
