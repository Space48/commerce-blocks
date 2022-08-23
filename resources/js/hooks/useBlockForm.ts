import axios, {AxiosResponse} from 'axios';
import {useState} from 'react';
import {mutate} from 'swr';

import {blankBlock, CREATE, UPDATE} from '../utils/block';
import {Block} from '../types';

export const useBlockForm = (
  formUrl: string,
  type: string = CREATE,
  onSuccess: ((Block) => void) | null = null,
  onError: ((string) => void) | null = null
) => {
  const [block, setBlock] = useState<Block | null>(type === CREATE ? blankBlock : null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onBlockChange = (key, value) => {
    setBlock((prevState) => {
      return {...prevState, [key]: value}
    });
  };

  const handleSuccess = (response: AxiosResponse) => {
    if (typeof onSuccess === 'function') {
      onSuccess(response?.data?.data);
    }
  }

  const handleFailure = (event) => {
    setErrors(event.response?.data?.errors);
    if (typeof onError === 'function') {
      onError(event.response?.data?.error ?? event.response?.data?.message);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    axios({
        url: formUrl,
        method: type === UPDATE ? 'PATCH' : 'POST',
        data: block,
      }
    )
      .then((response) => handleSuccess(response))
      .catch(event => handleFailure(event))
      .finally(() => {
        setIsLoading(false);
        mutate(formUrl);
      });
  };

  return [{onSubmit, onBlockChange, block, errors, isLoading}];
};
