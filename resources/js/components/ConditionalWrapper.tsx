import React from "react";

interface Props {
  condition: boolean,
  wrapper: (children: React.ReactElement) => React.ReactElement,
  children: React.ReactElement,
}

const ConditionalWrapper = ({condition, wrapper, children}: Props) => {
  return condition ? wrapper(children) : children;
}

export {ConditionalWrapper};

