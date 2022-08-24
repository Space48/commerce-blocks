import {Button} from '@bigcommerce/big-design';
import React, {useEffect, useState} from 'react';
import {CategoryListModal} from '../Modal';

interface Props {
  storeHash: string;
  onSelectionChange: (ids: number[]) => void;
  channel?: number
}

const CategoriesSelector = ({storeHash, onSelectionChange, channel}: Props) => {
  const [selectorVisible, setSelectorVisible] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const onCategorySelectionChange = (ids: number[]) => {
    setSelectedCategories(ids);
  }

  useEffect(() => {
    if (selectorVisible) return;
    onSelectionChange(selectedCategories);

  }, [selectorVisible])

  return (
    <>
      <Button variant="secondary" type="button" onClick={() => setSelectorVisible(true)}>Choose categories</Button>
      <CategoryListModal
        storeHash={storeHash}
        visible={selectorVisible}
        setVisible={setSelectorVisible}
        onSelectionChange={onCategorySelectionChange}
        selectable='multi'
        channelFilter={channel}
      />
    </>
  )
}

export {CategoriesSelector}
