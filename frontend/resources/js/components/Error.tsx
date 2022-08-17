import { h } from 'preact';
import { CombinedError } from '@urql/core/dist/types/utils/error';

/** @jsx h */

interface Props {
  error: CombinedError;
}

const Error = ({ error }: Props) => {
  console.log('ERROR', error);
  return (
    <div>
      <div>{error.name}</div>
      <div>{error.message}</div>
    </div>
  )
};

export default Error;