import { useContext } from 'react';
import { AmplitudeContext } from '@/utils/provider/AmplitudeContextProvider';

/**
 * amplitude context를 더 간편하게 사용할 수 있게 하는 hook
 */
const useAmplitudeContext = () => {
  const context = useContext(AmplitudeContext);

  if (context === undefined) {
    throw new Error('useAmplitudeContext는 AmplitudeContextProvider 내부에서만 사용 가능합니다.');
  }

  return context;
};

export default useAmplitudeContext;
