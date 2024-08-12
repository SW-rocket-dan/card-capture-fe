import React, { createContext, useEffect } from 'react';
import { init, track } from '@amplitude/analytics-browser';

export const AmplitudeContext = createContext({});

const AmplitudeContextProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Amplitude SDK를 초기화하는 부분
   * 초기화를 진행야 데이터를 올바르게 수집할 수 있음. 앱이 시작될 때 한번만 초기화 진행
   */
  useEffect(() => {
    init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '', undefined, {});
  }, []);

  /**
   * 특정 이벤트에 해당 메서드를 설정하면 amplitude에 의해 tracking됨
   * provider를 통해 내려주면 하위 컴포넌트들에서 호출해서 사용 가능
   */
  const trackAmplitudeEvent = (eventName: string, eventProperties: Record<string, any>) => {
    track(eventName, eventProperties);
  };

  const value = { trackAmplitudeEvent };

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>;
};

export default AmplitudeContextProvider;
