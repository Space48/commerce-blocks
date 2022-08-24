import {Button} from '@bigcommerce/big-design';
import React, {useState} from 'react';
import {ProductListModal} from '../Modal';

interface Props {
  storeHash: string;
}

const ProductSelector = ({storeHash}: Props) => {
  const [selectorVisible, setSelectorVisible] = useState(false);

  const onProductSelected = (id: number | string, url: string) => {
    console.log('Selected product ID: ' + id);
    setSelectorVisible(false);
  }

  return (
    <>
      <Button variant="secondary" type="button" onClick={() => setSelectorVisible(true)}>Choose products</Button>
      <ProductListModal
        storeHash={storeHash}
        visible={selectorVisible}
        setVisible={setSelectorVisible}
        onSelect={onProductSelected}
      />
    </>
  )
}

export {ProductSelector}
