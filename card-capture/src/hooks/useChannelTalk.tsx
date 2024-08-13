import { useEffect } from 'react';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';

const useChannelTalk = () => {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || '',
    });
  }, []);
};

export default useChannelTalk;
