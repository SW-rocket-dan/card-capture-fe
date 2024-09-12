import ReactQuill from 'react-quill';
import '@/components/editor/EditingArea/components/TextBox/TextStyles.css';
import '@/components/editor/EditingArea/components/TextBox/custom-quill-styles.css';
import TextToolbar from '@/components/editor/EditingArea/components/TextBox/TextToolbar';

const modules = {
  toolbar: {
    container: '#toolbar',
  },
};

const ReadOnlyTextBox = ({ text }: { text: ReactQuill.Value }) => {
  return (
    <div>
      <div className="hidden">
        <TextToolbar />
      </div>
      <ReactQuill
        value={text || ''}
        modules={modules}
        style={{
          minWidth: '80px',
          maxWidth: '700px',
        }}
        placeholder="Text"
        readOnly={true}
      />
    </div>
  );
};

export default ReadOnlyTextBox;
