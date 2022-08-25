import React from 'react'
import {ChromePicker} from 'react-color'

interface Props {
  color?: string;
  onChange: (string) => void;
}

const ColourPicker = ({color, onChange}: Props) => {

  const onColourChange = (color) => {
    onChange(color.hex);
  }
  return (
    <ChromePicker
      color={color ?? undefined}
      onChange={onColourChange}
      disableAlpha={true}
    />
  )
}

export {ColourPicker};
