import dynamic from 'next/dynamic';

const EditorPage = dynamic(() => import('@/app/editor/[templateId]/EditorContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <EditorPage />;
}
