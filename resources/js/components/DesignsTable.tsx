import React from 'react';
import { Text, Table, Dropdown} from '@bigcommerce/big-design';
import {Design} from '../types';
import Link from './Link';
import TableEmptyComponent from './TableEmptyComponent';
import {DeleteIcon, EditIcon, MoreHorizIcon} from '@bigcommerce/big-design-icons';

interface Props {
  storeHash: string;
  designs: Design[];
  error?: string;
  onEdit: (id?: string) =>  void;
  onDelete: (id?: string) => void;
}

const DesignsTable = ({storeHash, designs, error, onEdit, onDelete}: Props) => {

  return (
    <>
      <Table
        columns={[
          {
            header: 'Name',
            hash: 'name',
            render: ({id, name}) => <Link to={`/stores/${storeHash}/designs/${id}`}>{name}</Link>,
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
        items={designs}
        stickyHeader={true}
      />
      {designs.length === 0 &&
        <TableEmptyComponent
          itemName="design"
          itemNamePlural="designs"
          searchTerm={''}
          error={error}
        />
      }
    </>
  )
}

export default DesignsTable;
