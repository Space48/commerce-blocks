import {Button} from '@bigcommerce/big-design';
import React, {useEffect, useState} from 'react';
import {CategoryListModal} from '../Modal';

interface Props {
  storeHash: string;
  onSelectionChange: (id: number | undefined) => void;
  channel?: number
}

const CategorySelector = ({storeHash, onSelectionChange, channel}: Props) => {
  const [selectorVisible, setSelectorVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const onCategorySelectionChange = (ids: number[]) => {
    if (ids.length > 0) {
      setSelectedCategory(ids[0]);
      setSelectorVisible(false);
    } else {
      setSelectedCategory(undefined);
    }
  }

  useEffect(() => {
    if (selectorVisible) return;
    onSelectionChange(selectedCategory);

  }, [selectorVisible])

  return (
    <>
      <Button variant="secondary" type="button" onClick={() => setSelectorVisible(true)}>Choose category</Button>
      <CategoryListModal
        storeHash={storeHash}
        visible={selectorVisible}
        setVisible={setSelectorVisible}
        onSelectionChange={onCategorySelectionChange}
        selectable='radio'
        channelFilter={channel}
      />
    </>
  )
}

export {CategorySelector}
