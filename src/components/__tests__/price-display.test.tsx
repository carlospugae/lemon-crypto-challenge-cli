import React from 'react';
import { render } from '@testing-library/react-native';
import PriceDisplay from '../price-display';

describe('PriceDisplay', () => {
  it('renders correctly with positive price change', () => {
    const { getByText } = render(
      <PriceDisplay price={45000.5} percentChange24h={2.5} />,
    );

    expect(getByText('$45000.50')).toBeTruthy();
    expect(getByText('+2.50%')).toBeTruthy();
    expect(getByText('24h')).toBeTruthy();
  });

  it('renders correctly with negative price change', () => {
    const { getByText } = render(
      <PriceDisplay price={32000.75} percentChange24h={-1.2} />,
    );

    expect(getByText('$32000.75')).toBeTruthy();
    expect(getByText('-1.20%')).toBeTruthy();
    expect(getByText('24h')).toBeTruthy();
  });

  it('renders correctly with zero price change', () => {
    const { getByText } = render(
      <PriceDisplay price={50000.0} percentChange24h={0} />,
    );

    expect(getByText('$50000.00')).toBeTruthy();
    expect(getByText('+0.00%')).toBeTruthy();
    expect(getByText('24h')).toBeTruthy();
  });

  it('renders with large price values', () => {
    const { getByText } = render(
      <PriceDisplay price={1234567.89} percentChange24h={15.7} />,
    );

    expect(getByText('$1234567.89')).toBeTruthy();
    expect(getByText('+15.70%')).toBeTruthy();
  });

  it('renders with small price values', () => {
    const { getByText } = render(
      <PriceDisplay price={0.001234} percentChange24h={-5.5} />,
    );

    expect(getByText('$0.001234')).toBeTruthy();
    expect(getByText('-5.50%')).toBeTruthy();
  });

  it('handles decimal precision correctly', () => {
    const { getByText } = render(
      <PriceDisplay price={123.456789} percentChange24h={3.14159} />,
    );

    expect(getByText('$123.46')).toBeTruthy();
    expect(getByText('+3.14%')).toBeTruthy();
  });
});
