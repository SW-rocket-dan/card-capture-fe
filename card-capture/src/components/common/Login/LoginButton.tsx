import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginIcon from '@/components/common/Icon/LoginIcon';
import Button from '@/components/common/Button/Button';

const LoginButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="default" className="h-[40px] w-[110px] rounded-[10px]">
          <LoginIcon width={15} />
          <p className="text-[14px]">Login</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[270px] w-[400px] px-7 py-10">
        <DialogHeader>
          <DialogTitle className="text-center">
            지금 로그인하고
            <br /> 3분만에 카드뉴스를 만들어보세요!
          </DialogTitle>
          <DialogDescription>로그인하면 Card Capture와 함께 AI 카드 포스터를 만들 수 있어요!</DialogDescription>

          <div className="flex flex-col py-5">
            <button>
              <img alt="google-login" src="/image/web_light_sq_SI.svg" className="w-[200px]" />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
