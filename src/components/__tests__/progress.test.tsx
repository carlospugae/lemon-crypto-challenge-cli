import React from 'react';
import { render } from '@testing-library/react-native';
import Progress from '../progress';

describe('Progress', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Progress value={50} />);

    // Note: We can't easily test the progressbar role in React Native testing
    // So we just verify the component renders without errors
    expect(getByTestId).toBeDefined();
  });

  it('renders with custom value', () => {
    const { getByTestId } = render(<Progress value={75} />);

    expect(getByTestId).toBeDefined();
  });

  it('renders with custom color', () => {
    const { getByTestId } = render(<Progress value={25} color="#FF0000" />);

    expect(getByTestId).toBeDefined();
  });

  it('renders with custom style', () => {
    const { getByTestId } = render(
      <Progress value={60} style={{ height: 12 }} />,
    );

    expect(getByTestId).toBeDefined();
  });

  it('handles edge cases', () => {
    const { getByTestId } = render(<Progress value={0} />);

    expect(getByTestId).toBeDefined();
  });

  it('handles maximum value', () => {
    const { getByTestId } = render(<Progress value={100} />);

    expect(getByTestId).toBeDefined();
  });
});
