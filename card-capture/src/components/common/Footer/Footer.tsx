import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-row items-start justify-between gap-5 bg-gray9 px-[100px] py-14">
      <div className="flex flex-col gap-4">
        <p className="text-[25px] font-semibold leading-tight text-white">Card Capture</p>
      </div>

      <div className="flex flex-row gap-5 text-white">
        <button onClick={() => router.push('/policy/privacy')} className="hover:font-semibold hover:text-gray6">
          개인정보 처리방침
        </button>
        <button onClick={() => router.push('/policy/terms')} className="hover:font-semibold hover:text-gray6">
          이용약관
        </button>
      </div>
    </div>
  );
};

export default Footer;
