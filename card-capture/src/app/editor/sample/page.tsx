import dynamic from 'next/dynamic';

const EditorPage = dynamic(() => import('./SampleContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <EditorPage />;
}
