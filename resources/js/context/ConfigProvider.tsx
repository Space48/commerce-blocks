// @ts-nocheck
import React from 'react';
import ConfigContext from './ConfigContext';

interface Props {
  children: React.ReactNode
}

const ConfigProvider = ({children}: Props) => {
  const appId = document.head.querySelector('meta[name="app-id"]')?.content;
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content;
  const helpscoutBeaconId = document.head.querySelector('meta[name="helpscout-beacon-id"]')?.content;
  const noticeableToken = document.head.querySelector('meta[name="noticeable-token"]')?.content;
  const noticeableProjectId = document.head.querySelector('meta[name="noticeable-project-id"]')?.content;
  const noticeableLabelId = document.head.querySelector('meta[name="noticeable-label-id"]')?.content;
  const supportDocsUrl = document.head.querySelector('meta[name="support-docs-url"]')?.content;
  const supportDocsFAQUrl = document.head.querySelector('meta[name="support-docs-faq-url"]')?.content;
  const supportEmail = document.head.querySelector('meta[name="support-email"]')?.content;

  return (
    <ConfigContext.Provider value={{
      appId,
      appName: 'Commerce Blocks',
      appDescription: 'Create a browsable shopping experience on any website',
      csrfToken,
      helpscoutBeaconId,
      noticeableToken,
      noticeableProjectId,
      noticeableLabelId,
      supportDocsUrl,
      supportDocsFAQUrl,
      supportEmail,
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigProvider;
