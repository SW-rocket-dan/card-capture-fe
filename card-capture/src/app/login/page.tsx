import dynamic from 'next/dynamic';

const LoginModal = dynamic(() => import('@/components/common/Auth/LoginModal'), { ssr: false });

export default function Page() {
  return <LoginModal />;
}
