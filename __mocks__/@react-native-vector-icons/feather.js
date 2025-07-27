import React from 'react';
import { Text } from 'react-native';

const Feather = props => {
  const { name, size, color, style, testID, ...rest } = props;
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

export default Feather;
