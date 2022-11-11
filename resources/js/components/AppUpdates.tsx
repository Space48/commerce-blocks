import {Panel, Text} from '@bigcommerce/big-design';
import React from 'react';
import {useLatestNoticeablePosts} from '../hooks';
import Spinner from './Spinner';
import {Timeline} from './Timeline';

const AppUpdates = () => {
  const [posts, , isLoading] = useLatestNoticeablePosts();

  const timelineItems = posts && posts.edges.map(({node}) => {
    return {
      id: node.id,
      title: node.title,
      publicationTime: node.publicationTime,
      description: node.excerpt,
      url: node.permalink
    }
  }).reverse();

  const timelineActions = [
    {
      label: 'View more',
      onClick: () => window.open('https://space48apps.noticeable.news/', '_blank')
    },
    {
      label: 'Subscribe to updates',
      onClick: () => window.open('https://space48apps.noticeable.news/subscriptions', '_blank')
    }
  ]

  return (
    <Panel header="Updates">
      <Text>Keep up-to-date with all of the new features and improvements.</Text>
      {
        isLoading ?
          <Spinner/>
          :
          <Timeline items={timelineItems} actions={timelineActions}/>
      }
    </Panel>
  )
}

export default AppUpdates;
