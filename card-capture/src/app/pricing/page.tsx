import dynamic from 'next/dynamic';

const PricingPage = dynamic(() => import('./PricingContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <PricingPage />;
}
