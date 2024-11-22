import * as amplitude from '@amplitude/analytics-browser';
import { useEffect, useState } from 'react';
import { commonUtils } from '@/utils';

type UseExperimentProps = {
  experimentName: string;
  variants: string[];
};

const useExperiment = ({ experimentName, variants }: UseExperimentProps) => {
  const [variant, setVariant] = useState<string>('');

  useEffect(() => {
    // 사용자별 고유 variant 할당
    const userId = amplitude.getUserId() || localStorage.getItem('userId');
    const hash = commonUtils.hashString(userId + experimentName);
    const variantIndex = hash % variants.length;

    setVariant(variants[variantIndex]);

    amplitude.track('experiment-view', {
      experimentName,
      variant: variants[variantIndex],
    });
  }, []);

  return variant;
};

export default useExperiment;
