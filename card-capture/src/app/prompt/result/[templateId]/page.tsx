import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({
    templateId: i.toString(),
  }));
}

const ResultPage = dynamic(() => import('./ResultContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <ResultPage />;
}
