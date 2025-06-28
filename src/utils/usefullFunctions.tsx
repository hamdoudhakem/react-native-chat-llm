import React from 'react';
import type { ReactElements } from './types';
import { Image } from 'react-native';

export function renderElementOrComponent(Comp?: ReactElements) {
  if (typeof Comp === 'function') {
    return <Comp />;
  } else if (React.isValidElement(Comp)) {
    return Comp;
  }
  return null;
}

export function renderImage(image: number | { uri: string } | ReactElements) {
  if (React.isValidElement(image)) {
    return image;
  } else if (typeof image === 'number' || 'uri' in image) {
    return <Image source={image} />;
  }
  return null;
}

export function optimizedReverseArray<T>(array: T[]): T[] {
  const len = array.length;
  if (len === 1) {
    return [...array];
  }

  const newArray = new Array(len);
  for (let i = 0, y = len - 1; i < len / 2; i++, y--) {
    newArray[i] = array[y];
    newArray[y] = array[i];
  }

  return newArray;
}
