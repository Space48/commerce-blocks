import React from 'react';
import {Text} from "@bigcommerce/big-design";
import {AppUpdates, OurApps, PageBody, PageHeader} from "../components";
import {useParams} from "react-router-dom";

const WhatsNew = () => {
  const {store_hash} = useParams();

  return (
    <>
      <PageHeader title="What's new" backLinkText="Back" storeHash={store_hash} backLinkHref={`/stores/${store_hash}`}>
        <Text>Get the latest news on new features, fixes, and other apps that we offer.</Text>
      </PageHeader>

      <PageBody>
        <AppUpdates/>
        <OurApps/>
      </PageBody>
    </>
  );
}

export default WhatsNew;
