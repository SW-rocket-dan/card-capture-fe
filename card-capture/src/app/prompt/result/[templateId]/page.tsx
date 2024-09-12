import dynamic from 'next/dynamic';

const ResultPage = dynamic(() => import('./ResultContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <ResultPage />;
}
