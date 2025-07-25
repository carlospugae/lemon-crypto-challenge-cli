import React from 'react';
import { render } from '@testing-library/react-native';
import SupplyInfo from '../supply-info';

describe('SupplyInfo', () => {
  it('renders correctly with supply data', () => {
    const { getByText } = render(
      <SupplyInfo
        circulatingSupply={19000000}
        totalSupply={21000000}
        maxSupply={21000000}
        symbol="BTC"
      />,
    );

    expect(getByText('Supply Information')).toBeTruthy();
    expect(getByText('Total Supply')).toBeTruthy();
    expect(getByText('Max Supply')).toBeTruthy();
  });

  it('renders with null total supply', () => {
    const { getByText } = render(
      <SupplyInfo
        circulatingSupply={1000000}
        totalSupply={null}
        maxSupply={2000000}
        symbol="ETH"
      />,
    );

    expect(getByText('Supply Information')).toBeTruthy();
    expect(getByText('Total Supply')).toBeTruthy();
    expect(getByText('Max Supply')).toBeTruthy();
  });

  it('renders with null max supply', () => {
    const { getByText } = render(
      <SupplyInfo
        circulatingSupply={5000000}
        totalSupply={10000000}
        maxSupply={null}
        symbol="ADA"
      />,
    );

    expect(getByText('Supply Information')).toBeTruthy();
    expect(getByText('Total Supply')).toBeTruthy();
    expect(getByText('Max Supply')).toBeTruthy();
  });

  it('renders with zero max supply', () => {
    const { getByText } = render(
      <SupplyInfo
        circulatingSupply={1000000}
        totalSupply={1000000}
        maxSupply={0}
        symbol="XRP"
      />,
    );

    expect(getByText('Supply Information')).toBeTruthy();
    expect(getByText('Total Supply')).toBeTruthy();
    expect(getByText('Max Supply')).toBeTruthy();
  });

  it('renders with large supply values', () => {
    const { getByText } = render(
      <SupplyInfo
        circulatingSupply={999999999999}
        totalSupply={999999999999}
        maxSupply={999999999999}
        symbol="DOGE"
      />,
    );

    expect(getByText('Supply Information')).toBeTruthy();
    expect(getByText('Total Supply')).toBeTruthy();
    expect(getByText('Max Supply')).toBeTruthy();
  });

  it('renders with different symbols', () => {
    const { getByText } = render(
      <SupplyInfo
        circulatingSupply={1000000}
        totalSupply={2000000}
        maxSupply={2000000}
        symbol="LTC"
      />,
    );

    expect(getByText('Supply Information')).toBeTruthy();
    expect(getByText('Total Supply')).toBeTruthy();
    expect(getByText('Max Supply')).toBeTruthy();
  });
});
