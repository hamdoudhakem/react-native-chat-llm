// Copyright LocalChat 2023, all rights reserved.

import React from 'react';
import { Text } from 'react-native';

export const ItalicizeText = ({ text }: { text: string }) => {
  const regex = /\*([^*\n]+)\*/g;
  const matches = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match);
  }

  if (matches.length > 0) {
    const italicizedText: React.ReactElement[] = [];
    let currentIndex = 0;

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const matchIndex = match?.index || 0;
      const matchText = match?.[1]; // Captured group without asterisks

      if (matchIndex > currentIndex) {
        // Add non-italicized text between matches
        const nonItalicText = text.substring(currentIndex, matchIndex);
        italicizedText.push(
          <Text key={`nonItalic-${i}`}>{nonItalicText}</Text>
        );
      }

      // Add italicized text
      italicizedText.push(
        <Text key={`italic-${i}`} style={{ fontStyle: 'italic' }}>
          {matchText}
        </Text>
      );

      currentIndex = matchIndex + match![0].length;
    }

    if (currentIndex < text.length) {
      // Add any remaining non-italicized text after the last match
      const remainingText = text.substring(currentIndex);
      italicizedText.push(<Text key="remainingText">{remainingText}</Text>);
    }

    return italicizedText;
  }

  return <>{text}</>;
};
