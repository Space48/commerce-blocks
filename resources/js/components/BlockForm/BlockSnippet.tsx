import {FormGroup, Panel, Text, Textarea} from '@bigcommerce/big-design';
import React from 'react';

interface Props {
  blockId?: string | null;
  snippet?: string;
}

const BlockSnippet = ({blockId, snippet}: Props) => {
  return (
    <Panel header='Snippet' id='snippet-content'>
      {blockId ?
        <FormGroup>
          <Textarea
            readOnly
            rows={7}
            value={snippet ?? ''}
          />
        </FormGroup>
        : <Text>The snippet will be shown once block has been created.</Text>
      }
    </Panel>
  )
}

export {BlockSnippet}
