import React from 'react';
import {Box, Radio, Table, TablePaginationProps, Text} from '@bigcommerce/big-design';
import {
  ChevronRightIcon,
  ExpandMoreIcon,
} from '@bigcommerce/big-design-icons';
import {useExpandable} from '../hooks';
import {StyleableButton} from './StyleableButton';

interface Props {
  treeNodes: [];
  headerless: boolean;
  keyField: string;
  pagination: TablePaginationProps;
  defaultExpanded: string[];
  emptyComponent: JSX.Element;
  onSelect: (id: number | string, url: string) => void,
  onAddChild?: () => void,
  onDelete?: () => void,
}


const StatefulTree = (
  {
    treeNodes,
    headerless,
    keyField,
    defaultExpanded,
    emptyComponent,
    onSelect,
    pagination
  }: Props) => {
  const {expandedIds, onToggle} = useExpandable({defaultExpanded});

  const transformTreeNodesToTableRows = (treeNodes, level = 1) => {
    return treeNodes !== undefined && treeNodes.reduce((rows, treeNode) => {

      const has_children = treeNode.children && treeNode.children.length > 0;
      rows.push({...treeNode, level, has_children});

      if (has_children && expandedIds.includes(treeNode.id)) {
        rows = rows.concat(transformTreeNodesToTableRows(treeNode.children, level + 1));
      }

      return rows;
    }, []);
  };

  const tableRows = transformTreeNodesToTableRows(treeNodes);

  return (
    <Table
      border='0px'
      items={tableRows}
      pagination={pagination}
      headerless={headerless}
      keyField={keyField}
      stickyHeader
      columns={[
        {
          header: 'Name',
          hash: 'name',
          withPadding: false,
          render: ({id, images, custom_url, name, has_children, level}) => {
            return (
              <Box style={{
                marginLeft: (level - 1) * 2 + 'rem',
                minHeight: '3rem',
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center'
              }}>
                {
                  has_children &&
                  <StyleableButton
                    variant="subtle"
                    mobileWidth="auto"
                    onClick={() => onToggle(id)}
                    style={{
                      padding: '0',
                      height: 'auto',
                      marginRight: '0.25rem',
                      verticalAlign: 'middle',
                      width: 'auto'
                    }}
                  >
                    {
                      expandedIds.includes(id) ?
                        <ExpandMoreIcon size="xLarge" color="secondary60"/>
                        :
                        <ChevronRightIcon size="xLarge" color="secondary60"/>
                    }
                  </StyleableButton>
                }
                <span>
                  <Box
                    as="span"
                    style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                    onClick={custom_url ? () => onSelect(id, custom_url.url) : undefined}
                  >
                    {custom_url && <Radio/>}
                    {images && images.length > 0 ? (
                      <Box as='span' marginLeft='medium'>
                        <img style={{width: 25}} src={images[0].url_thumbnail} alt={`${name} image`}/>
                      </Box>
                    ) : null}
                    <Text as="span" marginLeft='medium'>{name}</Text>
                  </Box>
                </span>
              </Box>
            )
          },
          width: '55%'
        },
      ]}
      emptyComponent={emptyComponent}
    />
  )
}

export {StatefulTree};
