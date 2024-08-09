import dynamic from 'next/dynamic';

const TermsPage = dynamic(() => import('./TermsContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <TermsPage />;
}
