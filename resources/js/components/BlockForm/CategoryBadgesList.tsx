import {Flex, FlexItem, Small} from '@bigcommerce/big-design';
import {FeatureBadge} from '../FeatureBadge';
import {theme} from '@bigcommerce/big-design-theme';
import {CloseIcon} from '@bigcommerce/big-design-icons';
import React from 'react';
import {RemoveSelectionButton} from './styled';


interface Category {
  id: number,
  name: string
}

interface Props {
  categories: Category[]
  onDeselect: (number) => void
}

const CategoryBadgesList = ({categories, onDeselect}: Props) => {
  return (
    <Flex flexDirection="column">
      {categories.map(({id, name}) => (
        <FlexItem key={id} marginLeft="xSmall" marginVertical="xxSmall">
          <FeatureBadge bold={false} color={theme.colors.secondary20}>
            <Small color="secondary70" bold={true}>{name}</Small>
          </FeatureBadge>
          <RemoveSelectionButton
            variant="subtle"
            iconOnly={<CloseIcon/>}
            type="button"
            onClick={() => onDeselect(id)}
          >
            Remove
          </RemoveSelectionButton>
        </FlexItem>
      ))}
    </Flex>
  )
}

export {CategoryBadgesList};
