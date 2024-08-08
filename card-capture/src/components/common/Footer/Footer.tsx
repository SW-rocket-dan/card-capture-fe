const Footer = () => {
  return (
    <div className="flex w-full flex-col gap-2 bg-light-main p-10">
      <p className="text-xl font-bold">만들다람쥐</p>
      <div className="flex flex-col text-[14px]">
        <p>상호: 만들다람쥐 | 대표자: 양홍주 | 사업자등록번호: 728-15-02304 | 통신판매신고번호: 2004-부천원미-174</p>
        <p>소재지: 경기도 부천시 원미구 부흥로315번길 37, 2층 2226호(중동, 대명빌딩) | 전화번호: 070-8098-3983</p>
        <p>이메일: abc@example.com</p>
      </div>
      <div className="mt-3 flex flex-row gap-5">
        <button>개인정보 처리방침</button>
        <button>이용약관</button>
      </div>
    </div>
  );
};

export default Footer;
