import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({
    templateId: i.toString(),
  }));
}

const TemplatesPage = dynamic(() => import('./TemplatesContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <TemplatesPage />;
}
