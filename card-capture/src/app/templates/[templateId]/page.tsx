import dynamic from 'next/dynamic';

const TemplatesPage = dynamic(() => import('./TemplatesContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <TemplatesPage />;
}
