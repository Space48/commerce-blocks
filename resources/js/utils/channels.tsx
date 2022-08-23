import {Channel} from '../types';
import React from 'react';
import {SelectOption, SelectOptionGroup} from '@bigcommerce/big-design/dist/components/Select/types';

export const channelsAsSelectOptions = (channels: Channel[]): SelectOption<any>[] | SelectOptionGroup<any>[] => {
  return channels?.map(({id, icon_url, name}) => {
    return {content: name, value: id, icon: <img src={icon_url} alt={name}/>};
  });
}
