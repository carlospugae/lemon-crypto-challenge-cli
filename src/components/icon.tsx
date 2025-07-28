import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export type IconFamily = 'feather' | 'fontawesome6';

export interface IconComponentProps {
  family: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  solid?: boolean;
  iconStyle?: 'brand' | 'solid' | 'regular' | 'light' | 'thin' | 'duotone';
}

const Icon: React.FC<IconComponentProps> = ({
  family,
  name,
  size = 24,
  color = '#000',
  style,
  testID,
  solid,
  iconStyle = 'regular',
  ...props
}) => {
  const iconProps = {
    name: name as any, // Type assertion to handle dynamic icon names
    size,
    color,
    style,
    testID,
    iconStyle,
    ...props,
  };

  switch (family.toLowerCase()) {
    case 'feather':
      return <Feather {...iconProps} />;
    case 'fontawesome6':
      return <FontAwesome6 {...iconProps} />;
    default:
      console.warn(
        `Icon family "${family}" is not supported. Falling back to Feather.`,
      );
      return <Feather {...iconProps} />;
  }
};

export default Icon;
