import {Panel, Text} from '@bigcommerce/big-design';
import React from 'react';
import {Block} from '../../types';

interface Props {
  block: Block | null
}

const BlockPreview = ({block}: Props) => {
  return (
    <Panel header='Preview'>
      {block?.id ?
        <Text>TODO, add a preview</Text>
        : <Text>The snippet will be shown once block has been created.</Text>
      }
    </Panel>
  )
}

export {BlockPreview}
