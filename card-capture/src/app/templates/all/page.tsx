import dynamic from 'next/dynamic';
import React from 'react';

const AllTemplatesPage = dynamic(() => import('./AllTemplatesContent'), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Page() {
  return <AllTemplatesPage />;
}
