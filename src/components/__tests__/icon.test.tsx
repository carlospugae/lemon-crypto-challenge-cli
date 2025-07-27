import React from 'react';
import { render } from '@testing-library/react-native';
import Icon from '../icon';

describe('Icon', () => {
  it('renders Feather icon correctly', () => {
    const { getByTestId } = render(
      <Icon
        family="feather"
        name="home"
        size={24}
        color="#000"
        testID="test-icon"
      />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
  });

  it('renders FontAwesome6 icon correctly', () => {
    const { getByTestId } = render(
      <Icon
        family="fontawesome6"
        name="star"
        size={20}
        color="#FFD700"
        testID="test-icon"
      />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
  });

  it('renders with default props', () => {
    const { getByTestId } = render(
      <Icon family="feather" name="home" testID="test-icon" />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(
      <Icon
        family="feather"
        name="user"
        size={32}
        color="#3B82F6"
        testID="test-icon"
      />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
  });

  it('renders FontAwesome6 with solid prop', () => {
    const { getByTestId } = render(
      <Icon
        family="fontawesome6"
        name="star"
        size={20}
        color="#FFD700"
        solid
        testID="test-icon"
      />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
  });

  it('falls back to Feather for unsupported family', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { getByTestId } = render(
      <Icon family={'unsupported' as any} name="home" testID="test-icon" />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Icon family "unsupported" is not supported. Falling back to Feather.',
    );

    consoleSpy.mockRestore();
  });

  it('handles case insensitive family names', () => {
    const { getByTestId } = render(
      <Icon family={'FEATHER' as any} name="home" testID="test-icon" />,
    );

    expect(getByTestId('test-icon')).toBeDefined();
  });
});
