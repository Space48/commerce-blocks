import axios, {AxiosResponse} from 'axios';
import {useState} from 'react';
import {mutate} from 'swr';

import {Design} from '../types';
import {blankDesign, CREATE, UPDATE} from '../utils/design';

export const useDesignForm = (
  formUrl: string,
  type: string = CREATE,
  onSuccess: ((Block) => void) | null = null,
  onError: ((string) => void) | null = null
) => {
  const [design, setDesign] = useState<Design | null>(type === CREATE ? blankDesign : null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onDesignChange = (key, value) => {
    // @ts-ignore
    setDesign((prevState) => {
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
        data: design,
      }
    )
      .then((response) => handleSuccess(response))
      .catch(event => handleFailure(event))
      .finally(() => {
        setIsLoading(false);
        mutate(formUrl);
      });
  };

  return [{onSubmit, onDesignChange, design, setDesign, errors, isLoading}];
};
