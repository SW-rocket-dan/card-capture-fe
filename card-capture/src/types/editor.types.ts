export type TabType = 'edit' | 'prompt' | 'my';

export const isTabType = (tab: string): tab is TabType => {
  return ['edit', 'prompt', 'my'].includes(tab as TabType);
};
