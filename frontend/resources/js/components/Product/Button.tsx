import { h } from 'preact';

/** @jsx h */

interface Props {
  label: string;
  url: string;
}


const Button = ({ label, url }: Props) => (
  <div>
    <a href={url} target="_blank" rel="noreferrer">
      {label}
    </a>
  </div>

);

export default Button;