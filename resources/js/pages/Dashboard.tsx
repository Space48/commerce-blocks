import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {BlocksTable, PageBody, PageHeader, DesignsTable, ContentLoading} from '../components';
import {useBlocks, useChannels, useDesigns, useTabs} from '../hooks';
import {Box, Form, Grid, GridItem, Panel, Search, Select, Tabs} from '@bigcommerce/big-design';
import {DeleteIcon} from '@bigcommerce/big-design-icons';
import {channelsAsSelectOptions, notifyError, notifySuccess} from '../utils';
import axios from 'axios';
import {mutate} from 'swr';
import {useMatchMutate} from '../hooks';

const Dashboard = () => {
  const tabs = [
    {id: 'blocks', title: 'Blocks', ariaControls: 'blocks'},
    {id: 'designs', title: 'Designs', ariaControls: 'designs'},
  ];
  const [activeTab, onTabClick] = useTabs(tabs);
  const {store_hash} = useParams();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState(null);
  const onChannelFilterChange = channel => setChannelFilter(channel);

  const [blocksResponse, blocksError, isBlocksLoading] = useBlocks(
    store_hash,
    {
      page: currentPage,
      limit: itemsPerPage,
      ...(searchTerm) ? {['name:like']: searchTerm} : {},
      ...(channelFilter) ? {channel_id: channelFilter} : {}
    }
  );
  const blocks = blocksResponse?.data ?? [];
  const blocksErrorMessage = blocksError?.response?.data?.error ?? null;

  const pagination = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    totalItems: blocksResponse?.meta?.total,
    onPageChange: (val) => setCurrentPage(val),
    onItemsPerPageChange: (val) => {
      setCurrentPage(1)
      setItemsPerPage(val);
    },
    itemsPerPageOptions: [25, 50, 100]
  };

  const [channelsResponse, channelsError] = useChannels(store_hash);
  const channels = channelsResponse?.data ?? [];
  const channelOptions = channelsAsSelectOptions(channels);

  const channelsErrorMessage = channelsError?.response?.data?.error ?? null;

  const onAddBlock = () => history.push(`/stores/${store_hash}/blocks/create`);
  const onSearchChange = event => setSearchTerm(event.target.value);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSearchSubmit = () => {
  };

  const onEdit = (id: string | null | undefined): void => {
    if (!id) return;
    history.push(`/stores/${store_hash}/blocks/${id}`);
  }

  const onDesignEdit = (id: string | null | undefined): void => {
    if (!id) return;
    history.push(`/stores/${store_hash}/designs/${id}`);
  }

  const matchMutate = useMatchMutate();

  const onDelete = (id: string): void => {
    axios.delete(`/api/stores/${store_hash}/blocks/${id}`)
      .then(() => {
        notifySuccess('Block deleted');
        mutate(`/api/stores/${store_hash}/blocks`);
        mutate(`/api/stores/${store_hash}/blocks/${id}`);
        matchMutate(new RegExp(`^/api/stores/${store_hash}/blocks?`));

      })
      .catch(error => {
        const message = error.response?.data?.error ??
          (error.response?.data?.message ?? 'There was a problem deleting this block. Please try again later');
        notifyError(message);
      });
  }

  const onDesignDelete = (id: string): void => {
    axios.delete(`/api/stores/${store_hash}/designs/${id}`)
      .then(() => {
        notifySuccess('Design deleted');
        mutate(`/api/stores/${store_hash}/designs`);
        mutate(`/api/stores/${store_hash}/designs/${id}`);
        matchMutate(new RegExp(`^/api/stores/${store_hash}/designs?`));

      })
      .catch(error => {
        const message = error.response?.data?.error ??
          (error.response?.data?.message ?? 'There was a problem deleting this design. Please try again later');
        notifyError(message);
      });
  }

  const onAddDesign = () => history.push(`/stores/${store_hash}/designs/create`);
  const [designs, designError, isDesignsLoading] = useDesigns(store_hash);

  const renderBlocks = () => (
    <Panel header="Blocks" action={{text: 'Add block', onClick: onAddBlock}} marginBottom='xxLarge'>
      <Grid gridColumns="3fr 1fr" gridGap="1em">
        <GridItem>
          <Search value={searchTerm} onChange={onSearchChange} onSubmit={onSearchSubmit}/>
        </GridItem>
        <GridItem>
          <Select
            options={channelOptions}
            value={channelFilter}
            onOptionChange={onChannelFilterChange}
            placeholder={'Filter by channel'}
            action={channelFilter ? {
              content: 'Remove filter',
              icon: <DeleteIcon/>,
              onActionClick: () => setChannelFilter(null)
            } : undefined}
          />
        </GridItem>
      </Grid>
      <BlocksTable
        storeHash={store_hash}
        blocks={blocks ?? []}
        channels={channels}
        pagination={pagination}
        error={blocksErrorMessage || channelsErrorMessage}
        searchTerm={searchTerm}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Panel>
  )

  const renderDesigns = () => (
    <Panel header="Designs" action={{text: 'Add design', onClick: onAddDesign}}>
      <DesignsTable
        storeHash={store_hash}
        designs={designs ?? []}
        error={designError ?? null}
        onEdit={onDesignEdit}
        onDelete={onDesignDelete}
      />
    </Panel>
  );

  return (
    <>
      <PageHeader
        title="Commerce Blocks"
        storeHash={store_hash}
      />
      <PageBody>
        <ContentLoading
          loading={isBlocksLoading || isDesignsLoading}
          error={blocksError ?? designError ?? null}
        >
          <Tabs
            activeTab={activeTab}
            id="tabs"
            items={tabs}
            onTabClick={onTabClick}
          />
          <Box marginTop="large">
            {activeTab === 'blocks' && renderBlocks()}
            {activeTab === 'designs' && renderDesigns()}
          </Box>
        </ContentLoading>
      </PageBody>
    </>
  );
}

export default Dashboard;
