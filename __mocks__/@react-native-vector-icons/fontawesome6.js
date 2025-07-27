import React from 'react';
import { Text } from 'react-native';

const FontAwesome6 = props => {
  const { name, size, color, style, testID, solid, ...rest } = props;
  return React.createElement(
    Text,
    {
      testID,
      style: [{ fontSize: size, color }, style],
      ...rest,
    },
    name,
  );
};

export default FontAwesome6;
