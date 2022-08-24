import {Button} from '@bigcommerce/big-design';
import React, {useEffect, useState} from 'react';
import {ProductListModal} from '../Modal';

interface Props {
  storeHash: string;
  onSelectionChange: (ids: number[]) => void;
}

const ProductSelector = ({storeHash, onSelectionChange}: Props) => {
  const [selectorVisible, setSelectorVisible] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const onProductSelectionChange = (ids: number[]) => {
    setSelectedProducts(ids);
  }

  useEffect(() => {
    if (selectorVisible) return;
    onSelectionChange(selectedProducts);

  }, [selectorVisible])

  return (
    <>
      <Button variant="secondary" type="button" onClick={() => setSelectorVisible(true)}>Choose products</Button>
      <ProductListModal
        storeHash={storeHash}
        visible={selectorVisible}
        setVisible={setSelectorVisible}
        onSelectionChange={onProductSelectionChange}
        selectable='multi'
      />
    </>
  )
}

export {ProductSelector}
