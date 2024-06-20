import { useTextStore } from '@/store/useTextStore';

const TextToolbar = () => {
  const { format, setFormat } = useTextStore();

  const clickItalicHandler = () => {
    const currentItalic = format.italic;
    setFormat({ italic: !currentItalic });
  };

  return (
    <div>
      <button onClick={clickItalicHandler}>Italic</button>
    </div>
  );
};

export default TextToolbar;
