import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {BlocksTable, PageBody, PageHeader} from '../components';
import {useBlocks, useChannels} from '../hooks';
import {Box, Grid, GridItem, Panel, Search, Select} from '@bigcommerce/big-design';
import {DeleteIcon} from '@bigcommerce/big-design-icons';

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
  const channelOptions = channels?.map(({id, icon_url, name}) => {
    return {content: name, value: id, icon: <img src={icon_url} alt={name}/>};
  });

  const channelsErrorMessage = channelsError?.response?.data?.error ?? null;

  const onAddBlock = () => history.push(`/stores/${store_hash}/blocks/create`);
  const onSearchChange = event => setSearchTerm(event.target.value);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSearchSubmit = () => {
  };

  return (
    <>
      <PageHeader title="Your products anywhere" storeHash={store_hash}/>
      <PageBody>
        <Panel header="Blocks" action={{text: 'Add block', onClick: onAddBlock}}>
          <Box marginVertical="medium">
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
          </Box>
          <BlocksTable
            storeHash={store_hash}
            blocks={blocks ?? []}
            channels={channels}
            pagination={pagination}
            error={blocksErrorMessage || channelsErrorMessage}
            searchTerm={searchTerm}
          />
        </Panel>
      </PageBody>
    </>
  );
}

export default Dashboard;
