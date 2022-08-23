import React, {FormEventHandler, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  Box,
  Button,
  FlexItem,
  Form,
  FormGroup,
  Input,
  Panel,
  Select,
  Tabs
} from '@bigcommerce/big-design';
import {useTabs} from '../../hooks';
import SaveBar from '../SaveBar';
import {Block, Channel, Errors, LAYOUT_TYPE} from '../../types';
import {channelsAsSelectOptions} from '../../utils';
import {DeleteIcon} from '@bigcommerce/big-design-icons';
import {blockTypeOptions} from '../../utils/block';
import {BlockPreview} from './BlockPreview';
import {BlockSnippet} from './BlockSnippet';

interface Props {
  blockId?: string | null;
  storeHash: string;
  block: Block | null;
  snippet: string | undefined;
  channels: Channel[];
  onChange: (key: string, value: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: Errors;
  isLoading: boolean;
}

const BlockForm = (
  {
    blockId,
    storeHash,
    block,
    snippet,
    channels,
    onChange,
    onSubmit,
    errors,
    isLoading
  }: Props) => {
  const tabs = [
    {id: 'settings', title: 'Settings', ariaControls: 'settings-content'},
    {id: 'snippet', title: 'Snippet', ariaControls: 'snippet-content'},
    {id: 'preview', title: 'Preview', ariaControls: 'preview-content'},
  ];
  const [activeTab, onTabClick] = useTabs(tabs);
  const history = useHistory();
  const location = useLocation();

  const returnLocation = location?.state?.backLinkHref ?? `/stores/${storeHash}`;

  const onInputChange = (event) => onChange(event.target.name, event.target.value);

  const channelOptions = channelsAsSelectOptions(channels);
  const designOptions = [{content: 'Default', value: null}]

  // Auto-select the first channel
  useEffect(() => {
    if (block?.channel_id) return;
    onChange('channel_id', channels[0]?.id);
  }, [channels])

  // Auto-select block type
  useEffect(() => {
    if (block?.block_type) return;
    onChange('block_type', LAYOUT_TYPE.Carousel);
  }, [])

  const renderSettings = () => (
    <>
      <Panel header='Settings' id='settings-content'>
        <FormGroup>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="E.g. Featured products"
            required={true}
            value={block?.name ?? ''}
            error={errors?.name}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Select
            name="channel_id"
            label="Channel"
            required
            options={channelOptions}
            value={block?.channel_id ?? ''}
            onOptionChange={(value) => onChange('channel_id', value)}
            action={block?.channel_id ? {
              content: 'Remove',
              icon: <DeleteIcon/>,
              onActionClick: () => onChange('channel_id', null)
            } : undefined}
            placeholder="Assign to channel"
          />
        </FormGroup>
        <FormGroup>
          <Select
            name="block_type"
            label="Type"
            required
            options={blockTypeOptions}
            value={block?.block_type ?? ''}
            onOptionChange={(value) => onChange('block_type', value)}
            placeholder="Choose type"
          />
        </FormGroup>
        <FormGroup>
          <Select
            name="design_id"
            label="Design"
            required
            options={designOptions}
            value={block?.design_id ?? null}
            onOptionChange={(value) => onChange('design_id', value)}
            placeholder="Choose design"
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="valid_domain"
            type="text"
            label="Site URL"
            description="The site domain where the embed script will be loaded from. Please include protocol."
            required
            value={block?.valid_domain ?? ''}
            onChange={onInputChange}
            placeholder="https://www.bigcommerce.com"
          />
        </FormGroup>
      </Panel>
      {renderProductSelections()}
    </>

  )

  const renderSnippet = () => (
    <div id="snippet-content">
      <BlockSnippet blockId={blockId} snippet={snippet}/>
    </div>
  )

  const renderPreview = () => (
    <div id="preview-content">
      <BlockPreview block={block}/>
    </div>
  );

  const renderProductSelections = () => (
    <Panel header='Products'>

    </Panel>
  )

  const renderSave = () => (
    <SaveBar isLoading={isLoading}>
      <FlexItem flexBasis="auto" marginRight='large'>
        <Button variant='secondary' onClick={(event) => {
          event.preventDefault();
          history.push(returnLocation)
        }}>Cancel</Button>
      </FlexItem>
    </SaveBar>
  );

  return (
    <>
      {blockId ?
        <>
          <Tabs
            activeTab={activeTab}
            id="tabs"
            items={tabs}
            onTabClick={onTabClick}
          />
          <Box marginTop="large">
            <Form onSubmit={onSubmit}>
              {activeTab === 'settings' && renderSettings()}
              {activeTab === 'snippet' && renderSnippet()}
              {activeTab === 'preview' && renderPreview()}

              {renderSave()}
            </Form>
          </Box>
        </>
        :
        <>
          <Box>
            <Form onSubmit={onSubmit}>
              {renderSettings()}
              {renderSave()}
            </Form>
          </Box>
        </>
      }
    </>
  );
}

export {BlockForm};
