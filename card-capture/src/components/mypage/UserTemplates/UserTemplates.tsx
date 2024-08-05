import UserTemplateDetails from '@/components/mypage/UserTemplates/components/UserTemplateDetails';

const UserTemplates = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex min-h-[150px] w-full flex-col items-center justify-center gap-[10px] bg-bannerbg md:min-h-[190px]">
        <p className="text-[30px] font-bold md:text-[35px]">내 템플릿 보기</p>
        <p className="text-[13px] text-gray2">내가 만든 템플릿을 모아서 볼 수 있어요!</p>
      </div>

      <div className="w-full px-[100px] py-[50px]">
        <UserTemplateDetails />
      </div>
    </div>
  );
};

export default UserTemplates;
