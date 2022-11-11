import React, {useContext} from 'react';
import {Button, Flex, FlexItem, H2, H3, Panel, Text} from "@bigcommerce/big-design";
import {ContentLoading, PageBody, PageHeader} from "../../components";
import ConfigContext from "../../context/ConfigContext";
import {Link as RouterLink} from "react-router-dom";
import {useStores} from "../../hooks";

const StoresList = () => {
  const context = useContext(ConfigContext);
  let [stores, error, isLoading] = useStores();

  return (
    <>
      <PageHeader title={context.appName}>
        <Text>{context.appDescription}</Text>
      </PageHeader>
      <PageBody>
        <ContentLoading
          loading={isLoading}
          error={(error !== undefined) ? "Unable to load stores" : ''}
        >
          <H2>Choose a store</H2>
          {
            stores && stores.map(store => (
              <RouterLink key={store.id} to={`/stores/${store.store_hash}`} style={{textDecoration: "none"}}>
                <Panel marginBottom="medium">
                  <Flex justifyContent="space-between">
                    <FlexItem>
                      <H3>{store.name}</H3>
                    </FlexItem>
                    <FlexItem>
                      <Button variant="secondary">View</Button>
                    </FlexItem>
                  </Flex>
                </Panel>
              </RouterLink>
            ))
          }
          {
            !stores &&
            <H2>No stores found</H2>
          }
        </ContentLoading>
      </PageBody>
    </>
  );
}

export {StoresList};
