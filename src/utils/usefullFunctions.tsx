import React from 'react';
import type { ReactElements } from './types';

export const renderElementOrComponent = (Comp?: ReactElements) => {
  if (typeof Comp === 'function') {
    return <Comp />;
  } else if (React.isValidElement(Comp)) {
    return Comp;
  }
  return null;
};
