import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({
    templateId: i.toString(),
  }));
}

const EditorPage = dynamic(() => import('@/app/editor/[templateId]/EditorContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <EditorPage />;
}
