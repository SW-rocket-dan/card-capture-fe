import dynamic from 'next/dynamic';

const PromptPage = dynamic(() => import('./PromptContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <PromptPage />;
}
