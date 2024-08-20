//page.tsx
'use client';

import React, { useEffect } from 'react';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/EditingArea/EditingArea';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useChannelTalk from '@/hooks/useChannelTalk';
import { useQuery } from '@tanstack/react-query';
import { Template, TemplateList } from '@/types';
import { templateApi } from '@/api';
import { useParams, useRouter } from 'next/navigation';
import { useCardsStore } from '@/store/useCardsStore';
import { jsonUtils } from '@/utils';

const EditorContent = () => {
  useChannelTalk();

  /**
   * 로그인 안되어있으면 메인으로 리디렉션
   */
  const isAuthenticated = useAuthRedirect();
  if (!isAuthenticated) return null;

  /**
   * 라우팅된 아이디 기반으로 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const { data } = useQuery<Template>({
    queryKey: [`template-${id}`],
    queryFn: () => templateApi.getTemplateData(Number(id)),
  });

  /**
   * 가져온 데이터 store에 저장하기
   */
  const setCards = useCardsStore(state => state.setCard);
  const setTemplateId = useCardsStore(state => state.setTemplateId);

  useEffect(() => {
    if (!data) return;

    const templateData = jsonUtils.parseEscapedJson(data.editor);
    setCards(templateData);
    setTemplateId(data.id);
  }, [data]);

  /**
   * 나의 템플릿이 아니면 확인할 수 없게 하는 로직
   * @TODO : 임시 확인용. 추후 백엔드에서 검사하도록 바뀔 예정
   */

  const { data: templateList } = useQuery<TemplateList>({
    queryKey: ['all-template'],
    queryFn: templateApi.getAllTemplateData,
  });
  const router = useRouter();

  useEffect(() => {
    if (!templateList) return;

    const templateIdList = templateList.map(template => template.id);
    if (!templateIdList.includes(Number(id))) {
      alert('접근할 수 없는 템플릿입니다. 마이페이지에서 나의 템플릿 리스트를 확인할 수 있습니다');

      router.push('/');
    }
  }, [templateList]);

  return (
    <div className="h-screen w-screen bg-editorbg font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-row !overscroll-y-none pt-[60px]">
        <Tab />
        <EditingArea />
      </div>
    </div>
  );
};

export default EditorContent;
