import { h } from 'preact';

/** @jsx h */

interface Props {
  name: string;
}

const Name = ({ name }: Props) => (
  <div>
    {name}
  </div>
);

export default Name;