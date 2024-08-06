import dynamic from 'next/dynamic';

const MyPage = dynamic(() => import('./MyPageContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <MyPage />;
}
