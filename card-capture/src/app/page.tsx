'use client';

import { useBearStore } from '@/store/useTestStore';

export default function Home() {
  const bears = useBearStore(state => state.bears);
  const increase = useBearStore(state => state.increase);

  return (
    <>
      <div className="bg-blue-400">{bears}</div>
      <button
        onClick={() => {
          increase(1);
        }}
      >
        버튼!!
      </button>
    </>
  );
}
