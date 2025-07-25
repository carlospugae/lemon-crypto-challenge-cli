import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getCryptoIconName, getCryptoIconFamily } from '@/utils/crypto';

interface CryptoIconProps {
  symbol: string;
  size: number;
  color: string;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol, size, color }) => {
  const iconName = getCryptoIconName(symbol);
  const iconFamily = getCryptoIconFamily(symbol);

  switch (iconFamily) {
    case 'FontAwesome5':
      return <FontAwesome5 name={iconName} size={size} color={color} />;
    case 'Feather':
    default:
      return <Feather name={iconName} size={size} color={color} />;
  }
};

export default CryptoIcon;
