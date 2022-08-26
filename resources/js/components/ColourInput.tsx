import {Button, Flex, FlexItem, Input} from '@bigcommerce/big-design';
import React, {useState} from 'react';
import {ColourPicker} from './ColourPicker';
import styled from 'styled-components';
import {BrushIcon} from '@bigcommerce/big-design-icons';

const ColourInputContainer = styled.div`
  position: relative;
`

const ColourPickerContainer = styled.div`
  position: absolute;
  bottom: -15em;
  left: 10.75em;
  z-index: 2
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const StyledPreview = styled.div`
  background-color: ${props => props.backgroundColor};
  width: 18px;
  height: 18px;
  border-radius: 5px;
`;

interface Props {
  label: string,
  name: string,
  placeholder?: string
  value: string
  error?: React.ReactNode | React.ReactNode[],
  onChange: (string) => void;
}

const ColourInput = (
  {
    label,
    name,
    placeholder = '#EBEBEB',
    value,
    error,
    onChange
  }: Props) => {

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onInputChange = (event) => onChange(event.target.value);

  return (
    <ColourInputContainer>
      <Flex flexDirection="row" alignItems="flex-end">
        <FlexItem marginRight="small">
          <Input
            iconLeft={value ? <StyledPreview backgroundColor={value ?? 'transparent'} /> : null}
            label={label}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            error={error}
            onChange={onInputChange}
            onFocus={() => setShowPicker(true)}
          />
        </FlexItem>
        <FlexItem>
          <Button
            type="button"
            variant="subtle"
            onFocus={() => setShowPicker(true)}
            iconOnly={<BrushIcon/>}
          >
            Pick colour
          </Button>
        </FlexItem>
      </Flex>

      {showPicker ?
        <ColourPickerContainer>
          <Cover onClick={() => setShowPicker(false)}/>
          <ColourPicker color={value} onChange={onChange}/>
        </ColourPickerContainer>
        : null}
    </ColourInputContainer>
  );
}

export {ColourInput}
