import React from 'react';
import {Flex, FlexItem, Text, Table, Dropdown} from '@bigcommerce/big-design';
import {Block, Channel} from '../types';
import Link from './Link';
import TableEmptyComponent from './TableEmptyComponent';
import {TablePaginationProps} from '@bigcommerce/big-design/dist/components/Table/types';
import {toTitle} from '../utils';
import {DeleteIcon, EditIcon, MoreHorizIcon} from '@bigcommerce/big-design-icons';

interface Props {
  storeHash: string;
  blocks: Block[];
  channels: Channel[],
  pagination: TablePaginationProps,
  searchTerm?: string;
  error?: string;
  onEdit: (id?: string) =>  void;
  onDelete: (id?: string) => void;
}

const BlocksTable = ({storeHash, blocks, channels, pagination, searchTerm, error, onEdit, onDelete}: Props) => {
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
            render: ({block_type}) => <Text>{toTitle((block_type ?? '').toLowerCase())}</Text>,
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
                      <Text>{channel.name}</Text>
                    </FlexItem>
                  </Flex>
                  : null
              );
            }
          },
          {
            header: 'Domain',
            hash: 'domain',
            render: ({valid_domain}) => <Text>{valid_domain}</Text>
          },
          {
            header: 'Actions',
            hash: 'actions',
            align: 'right',
            render: ({id}) => {
              return (
                <Dropdown
                  items={[
                    {
                      content: 'Edit',
                      onItemClick: () => onEdit(id),
                      hash: 'edit',
                      icon: <EditIcon/>
                    },
                    {
                      content: 'Delete',
                      onItemClick: () => onDelete(id),
                      hash: 'delete',
                      icon: <DeleteIcon/>
                    },
                  ]}
                  toggle={<MoreHorizIcon/>}
                />
              );
            },
            width: '24px'
          }
        ]}
        items={blocks}
        pagination={pagination}
        stickyHeader={true}
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
