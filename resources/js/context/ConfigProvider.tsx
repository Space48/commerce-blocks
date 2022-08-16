// @ts-nocheck
import React from 'react';
import ConfigContext from './ConfigContext';

interface Props {
  children: React.ReactNode
}

const ConfigProvider = ({children}: Props) => {
  // .content here flags in TS
  const appId = document.head.querySelector('meta[name="app-id"]').content;
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
    <ConfigContext.Provider value={{
      appId,
      appName: 'Your Products Anywhere',
      appDescription: 'Add your Bigcommerce products to any website',
      csrfToken,
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
