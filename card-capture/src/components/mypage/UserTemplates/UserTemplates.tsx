import UserTemplateDetails from '@/components/mypage/UserTemplates/components/UserTemplateDetails';

const UserTemplates = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex min-h-[150px] w-full flex-col items-center justify-center gap-[10px] bg-bannerbg md:min-h-[190px]">
        <p className="text-[30px] font-bold md:text-[35px]">내 템플릿 보기</p>
        <p className="text-[13px] text-gray2">내가 만든 템플릿을 모아서 볼 수 있어요!</p>
      </div>

      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-4 px-6 py-12 sm:grid-cols-2 sm:px-8 md:px-12 lg:grid-cols-3 lg:px-14 xl:grid-cols-4">
        <UserTemplateDetails />
        <UserTemplateDetails />
        <UserTemplateDetails />
        <UserTemplateDetails />
      </div>
    </div>
  );
};

export default UserTemplates;
