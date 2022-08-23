import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useQueryParams} from './useQueryParams';

interface Tab {
  id: string,
  title: string
}

export const useTabs = (tabList: Tab[]): [string, (string) => void] => {
  const query = useQueryParams();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<string>(tabList[0].id);

  useEffect(() => {
    const tab = tabList.find(tab => query.get('tab') === tab.id) ?? tabList[0];
    setActiveTab(tab.id);
  }, [query]);

  const onTabClick = tabId => {
    if (tabId === tabList[0].id) {
      query.delete('tab');
    } else {
      query.set('tab', tabId);
    }
    history.push({search: query.toString()});
  };

  return [activeTab, onTabClick];
}
