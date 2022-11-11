import React from 'react';
import {Text} from '@bigcommerce/big-design';
import {HelpPanel, LegalFooter, PageBody, PageHeader} from '../components';
import {useParams} from 'react-router-dom';

const Help = () => {
  const {store_hash} = useParams();

  return (
    <>
      <PageHeader title="Help" backLinkText="Back" storeHash={store_hash} backLinkHref={`/stores/${store_hash}`}>
        <Text>Find our support documentation and ways of getting in touch.</Text>
      </PageHeader>
      <PageBody>
        <HelpPanel/>
        <LegalFooter/>
      </PageBody>
    </>
  );
}

export default Help;
