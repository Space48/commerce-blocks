import React, {FormEventHandler} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  Box,
  Button, Counter,
  FlexItem,
  Form, FormGroup, Input,
  Panel, Tabs,
} from '@bigcommerce/big-design';
import SaveBar from './SaveBar';
import {Design, Errors} from '../types';
import {useTabs} from '../hooks';
import {ColourInput} from './ColourInput';

interface Props {
  designId?: string | null;
  storeHash: string;
  design: Design | null;
  onChange: (key: string, value: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: Errors;
  isLoading: boolean;
}

const DesignForm = (
  {
    designId,
    storeHash,
    design,
    onChange,
    onSubmit,
    errors,
    isLoading
  }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const tabs = [
    {id: 'settings', title: 'Settings', ariaControls: 'settings'},
    {id: 'headings', title: 'Headings', ariaControls: 'headings'},
    {id: 'buttons', title: 'Buttons', ariaControls: 'buttons'},
    {id: 'links', title: 'Links', ariaControls: 'links'},
    {id: 'text', title: 'Text', ariaControls: 'text'},
    {id: 'prices', title: 'Prices', ariaControls: 'price'},
  ];
  const [activeTab, onTabClick] = useTabs(tabs);

  const returnLocation = location?.state?.backLinkHref ?? `/stores/${storeHash}`;

  const onInputChange = (event) => onChange(event.target.name, event.target.value);
  const onCounterChange = (input, value) => onChange(input, value);

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

  const renderSettings = () => (
    <Panel header='Settings'>
      <FormGroup>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="E.g. Featured products"
          required={true}
          value={design?.name ?? ''}
          error={errors?.name}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Counter
          label="Products per page"
          name="limit"
          placeholder="12"
          required={true}
          value={design?.limit ?? 12}
          error={errors?.limit}
          onCountChange={(value) => onCounterChange('limit', value)}
        />
      </FormGroup>
      <FormGroup>
        <Counter
          label="Products per grid row"
          name="columns"
          placeholder="3"
          required={true}
          value={design?.columns ?? 3}
          error={errors?.columns}
          onCountChange={(value) => onCounterChange('columns', value)}
        />
      </FormGroup>
    </Panel>
  );

  const renderHeadings = () => (
    <Panel header='Headings'>
      <FormGroup>
        <Input
          label="Font family"
          type="text"
          name="heading_font_family"
          placeholder="sans-serif"
          value={design?.heading_font_family ?? ''}
          error={errors?.heading_font_family}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font size"
          type="text"
          name="heading_font_size"
          placeholder="14px"
          value={design?.heading_font_size ?? ''}
          error={errors?.heading_font_size}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font weight"
          type="text"
          name="heading_font_weight"
          placeholder="bold"
          value={design?.heading_font_weight ?? ''}
          error={errors?.heading_font_weight}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Colour"
          name="heading_colour"
          value={design?.heading_colour ?? ''}
          onChange={(colour) => onChange('heading_colour', colour)}
          placeholder="#EBEBEB"
          error={errors?.heading_colour}
        />
      </FormGroup>
      <FormGroup>
      </FormGroup>
    </Panel>
  )

  const renderText = () => (
    <Panel header='Text'>
      <FormGroup>
        <Input
          label="Font family"
          type="text"
          name="text_font_family"
          placeholder="sans-serif"
          value={design?.text_font_family ?? ''}
          error={errors?.text_font_family}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font weight"
          type="text"
          name="text_font_weight"
          placeholder="bold"
          value={design?.text_font_weight ?? ''}
          error={errors?.text_font_weight}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font size"
          type="text"
          name="text_font_size"
          placeholder="14px"
          value={design?.text_font_size ?? ''}
          error={errors?.text_font_size}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Colour"
          name="text_colour"
          placeholder="#EBEBEB"
          value={design?.text_colour ?? ''}
          error={errors?.text_colour}
          onChange={(colour) => onChange('text_colour', colour)}
        />
      </FormGroup>
    </Panel>
  );

  const renderPrices = () => (
    <Panel header='Prices'>
      <FormGroup>
        <Input
          label="Font family"
          type="text"
          name="price_font_family"
          placeholder="sans-serif"
          value={design?.price_font_family ?? ''}
          error={errors?.price_font_family}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font weight"
          type="text"
          name="price_font_weight"
          placeholder="bold"
          value={design?.price_font_weight ?? ''}
          error={errors?.price_font_weight}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font size"
          type="text"
          name="price_font_size"
          placeholder="14px"
          value={design?.price_font_size ?? ''}
          error={errors?.price_font_size}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Colour"
          name="price_colour"
          placeholder="#EBEBEB"
          value={design?.price_colour ?? ''}
          error={errors?.price_colour}
          onChange={(colour) => onChange('price_colour', colour)}
        />
      </FormGroup>
    </Panel>
  );

  const renderSalePrices = () => (
    <Panel header='Sale prices'>
      <FormGroup>
        <Input
          label="Font family"
          type="text"
          name="sale_price_font_family"
          placeholder="14px"
          value={design?.sale_price_font_family ?? ''}
          error={errors?.sale_price_font_family}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font size"
          type="text"
          name="sale_price_font_size"
          placeholder="14px"
          value={design?.sale_price_font_size ?? ''}
          error={errors?.sale_price_font_size}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font weight"
          type="text"
          name="sale_price_font_weight"
          placeholder="bold"
          value={design?.sale_price_font_weight ?? ''}
          error={errors?.sale_price_font_weight}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Colour"
          name="sale_price_colour"
          placeholder="#EBEBEB"
          value={design?.sale_price_colour ?? ''}
          error={errors?.sale_price_colour}
          onChange={(colour) => onChange('sale_price_colour', colour)}
        />
      </FormGroup>
    </Panel>
  );

  const renderLinks = () => (
    <Panel header='Links'>
      <FormGroup>
        <ColourInput
          label="Colour"
          name="link_colour"
          placeholder="#EBEBEB"
          value={design?.link_colour ?? ''}
          error={errors?.link_colour}
          onChange={(colour) => onChange('link_colour', colour)}

        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Hover colour"
          name="link_hover_colour"
          placeholder="#EBEBEB"
          value={design?.link_hover_colour ?? ''}
          error={errors?.link_hover_colour}
          onChange={(colour) => onChange('link_hover_colour', colour)}
        />
      </FormGroup>
    </Panel>
  );

  const renderButtons = () => (
    <Panel header='Buttons'>
      <FormGroup>
        <Input
          label="Font family"
          type="text"
          name="button_font_family"
          placeholder="sans-serif"
          value={design?.button_font_family ?? ''}
          error={errors?.button_font_family}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font weight"
          type="text"
          name="button_font_weight"
          placeholder="bold"
          value={design?.button_font_weight ?? ''}
          error={errors?.button_font_weight}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label="Font size"
          type="text"
          name="button_font_size"
          placeholder="14px"
          value={design?.button_font_size ?? ''}
          error={errors?.button_font_size}
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Background colour"
          name="button_colour"
          placeholder="#EBEBEB"
          value={design?.button_colour ?? ''}
          error={errors?.button_colour}
          onChange={(colour) => onChange('button_colour', colour)}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Background hover colour"
          name="button_hover_colour"
          placeholder="#EBEBEB"
          value={design?.button_hover_colour ?? ''}
          error={errors?.button_hover_colour}
          onChange={(colour) => onChange('button_hover_colour', colour)}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Text colour"
          name="button_text_colour"
          placeholder="#EBEBEB"
          value={design?.button_text_colour ?? ''}
          error={errors?.button_text_colour}
          onChange={(colour) => onChange('button_text_colour', colour)}
        />
      </FormGroup>
      <FormGroup>
        <ColourInput
          label="Text hover colour"
          name="button_hover_text_colour"
          placeholder="#EBEBEB"
          value={design?.button_hover_text_colour ?? ''}
          error={errors?.button_hover_text_colour}
          onChange={(colour) => onChange('button_hover_text_colour', colour)}
        />
      </FormGroup>
    </Panel>
  );

  return (
    <Form onSubmit={onSubmit}>
      <Tabs
        activeTab={activeTab}
        id="tabs"
        items={tabs}
        onTabClick={onTabClick}
      />
      <Box marginTop="large">
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'headings' && renderHeadings()}
        {activeTab === 'text' && renderText()}
        {activeTab === 'prices' && <>{renderPrices()}{renderSalePrices()}</>}
        {activeTab === 'links' && renderLinks()}
        {activeTab === 'buttons' && renderButtons()}
      </Box>
      {renderSave()}
    </Form>

  );
}

export default DesignForm;
