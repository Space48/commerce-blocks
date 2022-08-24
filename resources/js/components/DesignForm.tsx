import React, {FormEventHandler} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  Button,
  FlexItem,
  Form, FormGroup, Input,
  Panel,
} from '@bigcommerce/big-design';
import SaveBar from './SaveBar';
import {Design, Errors} from '../types';

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

  const returnLocation = location?.state?.backLinkHref ?? `/stores/${storeHash}`;

  const onInputChange = (event) => onChange(event.target.name, event.target.value);

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
    <Form onSubmit={onSubmit}>
      <Panel header='Design'>
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
          <Input
            label="Limit"
            type="text"
            name="limit"
            placeholder="12"
            required={true}
            value={design?.limit ?? ''}
            error={errors?.limit}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Columns"
            type="text"
            name="columns"
            placeholder="4"
            value={design?.columns ?? ''}
            error={errors?.columns}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Heading font family"
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
            label="Heading font size"
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
            label="Heading font weight"
            type="text"
            name="heading_font_weight"
            placeholder="bold"
            value={design?.heading_font_weight ?? ''}
            error={errors?.heading_font_weight}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Heading colour"
            type="text"
            name="heading_colour"
            placeholder="#EBEBEB"
            value={design?.heading_colour ?? ''}
            error={errors?.heading_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Text font family"
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
            label="Text font weight"
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
            label="Text font size"
            type="text"
            name="text_font_size"
            placeholder="14px"
            value={design?.text_font_size ?? ''}
            error={errors?.text_font_size}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Text colour"
            type="text"
            name="text_colour"
            placeholder="#EBEBEB"
            value={design?.text_colour ?? ''}
            error={errors?.text_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Price font family"
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
            label="Price font weight"
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
            label="Price font size"
            type="text"
            name="price_font_size"
            placeholder="14px"
            value={design?.price_font_size ?? ''}
            error={errors?.price_font_size}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Price colour"
            type="text"
            name="price_colour"
            placeholder="#EBEBEB"
            value={design?.price_colour ?? ''}
            error={errors?.price_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Sale price font size"
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
            label="Sale price font weight"
            type="text"
            name="sale_price_font_weight"
            placeholder="bold"
            value={design?.sale_price_font_weight ?? ''}
            error={errors?.sale_price_font_weight}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Sale price colour"
            type="text"
            name="sale_price_colour"
            placeholder="#EBEBEB"
            value={design?.sale_price_colour ?? ''}
            error={errors?.sale_price_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Link colour"
            type="text"
            name="link_colour"
            placeholder="#EBEBEB"
            value={design?.link_colour ?? ''}
            error={errors?.link_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Link hover colour"
            type="text"
            name="link_hover_colour"
            placeholder="#EBEBEB"
            value={design?.link_hover_colour ?? ''}
            error={errors?.link_hover_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Button font family"
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
            label="Button font weight"
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
            label="Button font size"
            type="text"
            name="button_font_size"
            placeholder="14px"
            value={design?.button_font_size ?? ''}
            error={errors?.button_font_size}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Button colour"
            type="text"
            name="button_colour"
            placeholder="#EBEBEB"
            value={design?.button_colour ?? ''}
            error={errors?.button_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Button hover colour"
            type="text"
            name="button_hover_colour"
            placeholder="#EBEBEB"
            value={design?.button_hover_colour ?? ''}
            error={errors?.button_hover_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Button text colour"
            type="text"
            name="button_text_colour"
            placeholder="#EBEBEB"
            value={design?.button_text_colour ?? ''}
            error={errors?.button_text_colour}
            onChange={onInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Button hover text colour"
            type="text"
            name="button_text_colour"
            placeholder="#EBEBEB"
            value={design?.button_hover_text_colour ?? ''}
            error={errors?.button_hover_text_colour}
            onChange={onInputChange}
          />
        </FormGroup>
      </Panel>
      {renderSave()}
    </Form>

  );
}

export {DesignForm};
