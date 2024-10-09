import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-row items-start justify-between gap-5 bg-gray9 px-[100px] py-14">
      <div className="flex flex-col gap-4">
        <p className="text-[25px] font-semibold leading-tight text-white">Card Capture</p>
        <div className="flex flex-col gap-1 text-[13px] text-gray6">
          <p>상호: 만들다람쥐 | 대표자: 양홍주 | 사업자등록번호: 728-15-02304 | 통신판매신고번호: 2004-부천원미-174</p>
          <p>소재지: 경기도 부천시 원미구 부흥로315번길 37, 2층 2226호(중동, 대명빌딩) | 전화번호: 070-8098-3983</p>
        </div>
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
