import React from 'react';
import {Flex, FlexItem, Panel, Table} from '@bigcommerce/big-design';
import {Block, Channel} from '../types';
import Link from './Link';
import TableEmptyComponent from './TableEmptyComponent';
import {TablePaginationProps} from '@bigcommerce/big-design/dist/components/Table/types';

interface Props {
  storeHash: string;
  blocks: Block[];
  channels: Channel[],
  pagination: TablePaginationProps,
  searchTerm?: string;
  error?: string;
}

const BlocksTable = ({storeHash, blocks, channels, pagination, searchTerm, error}: Props) => {
  const getChannel = (id) => channels.find(channel => channel.id === id)

  return (
    <>
      <Table
        columns={[
          {
            header: 'Name',
            hash: 'name',
            render: ({id, name}) => <Link to={`/stores/${storeHash}/blocks/${id}`}>{name}</Link>,
          },
          {
            header: 'Type',
            hash: 'block_type',
            render: ({block_type}) => block_type,
          },
          {
            header: 'Channel',
            hash: 'channel',
            render: ({channel_id}) => {
              const channel = getChannel(channel_id);
              return (
                channel ?
                  <Flex>
                    <FlexItem>
                      <img src={channel.icon_url} alt={channel.name}/>
                    </FlexItem>
                    <FlexItem>
                      <img src={channel.icon_url} alt={channel.name}/>
                    </FlexItem>
                  </Flex>
                  : null
              );
            }
          },
          {
            header: 'Domain',
            hash: 'domain',
            render: ({valid_domain}) => valid_domain
          }
        ]}
        items={blocks}
        pagination={pagination}
      />
      {blocks.length === 0 &&
        <TableEmptyComponent
          itemName="block"
          itemNamePlural="blocks"
          searchTerm={searchTerm}
          error={error}
        />
      }
    </>
  )
}

export default BlocksTable;
