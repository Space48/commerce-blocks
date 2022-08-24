import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {BlocksTable, PageBody, PageHeader} from '../components';
import {useBlocks, useChannels, useDesigns} from '../hooks';
import {Grid, GridItem, Panel, Search, Select} from '@bigcommerce/big-design';
import {DeleteIcon} from '@bigcommerce/big-design-icons';
import {channelsAsSelectOptions, notifyError, notifySuccess} from '../utils';
import axios from 'axios';
import {mutate} from 'swr';
import {useMatchMutate} from '../hooks';
import DesignsTable from "../components/DesignsTable";

const Dashboard = () => {
  const {store_hash} = useParams();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState(null);
  const onChannelFilterChange = channel => setChannelFilter(channel);

  const [blocksResponse, blocksError] = useBlocks(
    store_hash,
    {
      page: currentPage,
      limit: itemsPerPage,
      ...(searchTerm) ? {['name:like']: searchTerm} : {},
      ...(channelFilter) ? {channel_id: channelFilter} : {}
    }
  );
  const blocks = blocksResponse?.data?.filter(block => block.name.includes(searchTerm)) ?? [];
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

  const onAddDesign = () => history.push(`/stores/${store_hash}/designs/create`);
  const [designs, designError, isDesignsLoading] = useDesigns(store_hash);

  return (
    <>
      <PageHeader title="Your products anywhere" storeHash={store_hash}/>
      <PageBody>
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
        <Panel header="Designs" action={{text: 'Add design', onClick: onAddDesign}}>
          <DesignsTable
            storeHash={store_hash}
            designs={designs ?? []}
            error={designError ?? null}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Panel>
      </PageBody>
    </>
  );
}

export default Dashboard;
