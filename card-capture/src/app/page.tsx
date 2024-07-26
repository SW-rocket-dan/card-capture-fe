import dynamic from 'next/dynamic';

const MainPage = dynamic(() => import('./MainContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <MainPage />;
}
