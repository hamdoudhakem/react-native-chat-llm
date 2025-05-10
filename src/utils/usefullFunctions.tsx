import React from 'react';
import type { ReactElements } from './types';

export function renderElementOrComponent(Comp?: ReactElements) {
  if (typeof Comp === 'function') {
    return <Comp />;
  } else if (React.isValidElement(Comp)) {
    return Comp;
  }
  return null;
}

export function optimizedReverseArray<T>(array: T[]): T[] {
  const len = array.length;
  if (len == 1) {
    return [...array];
  }

  const newArray = new Array(len);
  for (let i = 0, y = len - 1; i < len / 2; i++, y--) {
    newArray[i] = array[y];
    newArray[y] = array[i];
  }

  return newArray;
}
