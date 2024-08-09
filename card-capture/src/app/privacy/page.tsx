import dynamic from 'next/dynamic';

const PrivacyPage = dynamic(() => import('./PrivacyContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <PrivacyPage />;
}
