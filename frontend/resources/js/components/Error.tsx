import { h } from 'preact';
import { CombinedError } from '@urql/core/dist/types/utils/error';
import { getClassName } from '../helpers';

/** @jsx h */

interface Props {
  error: CombinedError;
}

const Error = ({ error }: Props) => (
  <div className={getClassName('error')}>
    <div>{error.name}</div>
    <div>{error.message}</div>
  </div>
);

export default Error;