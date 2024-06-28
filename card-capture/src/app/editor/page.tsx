import dynamic from 'next/dynamic';

const EditorPage = dynamic(() => import('./EditorContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <EditorPage />;
}
