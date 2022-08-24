import {useEffect, useRef, useState} from 'react';
import {isEqual} from 'lodash';

interface Props {
  defaultExpanded: string[];
}

export const useExpandable = ({defaultExpanded}: Props) => {
  const [expandedIds, setExpandedIds] = useState(defaultExpanded ?? []);

  const defaultExpandedRef = useRef(defaultExpanded ?? []);

  if (!isEqual(defaultExpandedRef.current, defaultExpanded)) {
    defaultExpandedRef.current = defaultExpanded;
  }

  const onToggle = id => {
    setExpandedIds(prevState => {
      const idx = prevState.indexOf(id);
      if (idx >= 0) return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)]

      return [...prevState, id];
    })
  };

  useEffect(() => {
    if (!defaultExpanded) return;

    setExpandedIds(defaultExpanded);
  }, [defaultExpandedRef.current]);

  return {expandedIds, onToggle};
}
