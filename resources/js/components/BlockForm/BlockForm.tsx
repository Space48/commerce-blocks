import React, {FormEventHandler, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FlexItem,
  Form,
  FormGroup,
  Input,
  Panel,
  Select,
  Tabs,
} from '@bigcommerce/big-design';
import {useTabs} from '../../hooks';
import SaveBar from '../SaveBar';
import {Block, Channel, Design, DesignOptions, Errors, LAYOUT_TYPE} from '../../types';
import {channelsAsSelectOptions} from '../../utils';
import {AddIcon, DeleteIcon} from '@bigcommerce/big-design-icons';
import {blockTypeOptions} from '../../utils/block';
import {BlockPreview} from './BlockPreview';
import {BlockSnippet} from './BlockSnippet';
import {ProductsSearchQueryBuilder} from './ProductsSearchQueryBuilder';
import {FeatureBadge} from '../FeatureBadge';

interface Props {
  blockId?: string | null;
  storeHash: string;
  block: Block | null;
  designs: Design[] | null;
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
    designs,
    snippet,
    channels,
    onChange,
    onSubmit,
    errors,
    isLoading
  }: Props) => {
  const tabs = [
    {id: 'settings', title: 'Settings', ariaControls: 'settings-content'},
    {id: 'installation', title: 'Installation', ariaControls: 'installation-content'},
    // {id: 'preview', title: 'Preview', ariaControls: 'preview-content'},
  ];
  const [activeTab, onTabClick] = useTabs(tabs);
  const [showExclusionSection, setShowExclusionSection] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const returnLocation = location?.state?.backLinkHref ?? `/stores/${storeHash}`;

  const onInputChange = (event) => onChange(event.target.name, event.target.value);

  const channelOptions = channelsAsSelectOptions(channels);
  const designOptions = useMemo(() => {
    const options : DesignOptions[] = [];
    options.push({content: 'Default', value: null})
    if (designs && designs.length > 0) {
      designs?.forEach((design) => {
        options.push({
          content: design.name,
          value: design.id
        })
      });
    }
    return options;
  }, [designs]);

  // Auto-select the first channel
  useEffect(() => {
    if (block?.channel_id) return;
    onChange('channel_id', channels[0]?.id);
  }, [channels]);

  // Auto-select block type
  useEffect(() => {
    if (block?.block_type) return;
    onChange('block_type', LAYOUT_TYPE.Carousel);
  }, []);

  // Auto-select sort order
  useEffect(() => {
    if (block?.product_selection_sort_order) return;
    onChange('product_selection_sort_order', 'RELEVANCE');
  }, []);

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
        {
          block?.block_type === LAYOUT_TYPE.Grid ?
            <>
              <FormGroup>
                <Checkbox
                  label="Show filters"
                  checked={block?.enable_filters ?? true}
                  onChange={() => onChange('enable_filters', block.enable_filters === undefined ? false : !block.enable_filters)}/>
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label="Show search"
                  checked={block?.enable_search ?? true}
                  onChange={() => onChange('enable_search', block.enable_search === undefined ? false : !block.enable_search)}/>
              </FormGroup>
            </>
            : null
        }
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

  const renderInstallation = () => (
    <div id="installation-content">
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
      <ProductsSearchQueryBuilder storeHash={storeHash} block={block} onChange={onChange}/>
      <Button
        marginTop='large'
        variant='subtle' iconLeft={<AddIcon />}
        onClick={() => setShowExclusionSection(prev => !prev)}
      >
        Add exclusion rule
      </Button>
      {showExclusionSection && (
        <Box marginTop='large'>
          <FeatureBadge>Hide...</FeatureBadge>
          <Box marginTop='large' marginLeft='large'>
            <FormGroup>
              <Checkbox
                label="Out of stock products"
                checked={block?.hide_out_of_stock_products ?? false}
                onChange={() => onChange('hide_out_of_stock_products', block?.hide_out_of_stock_products === undefined ? false : !block.hide_out_of_stock_products)}/>
            </FormGroup>
          </Box>
        </Box>
      )}
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
              {activeTab === 'installation' && renderInstallation()}
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
