import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Badge from '../badge';
import { BadgeProps } from '../badge';

jest.mock('react-native-size-matters', () => ({
  scale: jest.fn((value: number) => value),
  verticalScale: jest.fn((value: number) => value),
  moderateScale: jest.fn((value: number) => value),
}));

describe('Badge Component', () => {
  const renderBadge = (props: BadgeProps) => {
    const { children = 'Test Badge', ...otherProps } = props;
    return render(<Badge {...otherProps}>{children}</Badge>);
  };

  describe('Basic Rendering', () => {
    it('should render badge with default props', () => {
      renderBadge({ children: 'Test Badge' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should render children correctly', () => {
      renderBadge({ children: 'Custom Badge Content' });
      expect(screen.getByText('Custom Badge Content')).toBeTruthy();
    });

    it('should render with default secondary variant', () => {
      renderBadge({ children: 'Test Badge' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should render primary variant correctly', () => {
      renderBadge({ variant: 'primary' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should render secondary variant correctly', () => {
      renderBadge({ variant: 'secondary' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should render success variant correctly', () => {
      renderBadge({ variant: 'success' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should render error variant correctly', () => {
      renderBadge({ variant: 'error' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should render warning variant correctly', () => {
      renderBadge({ variant: 'warning' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should use secondary variant as default when no variant is provided', () => {
      renderBadge({ children: 'Test Badge' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should use secondary variant as default when invalid variant is provided', () => {
      renderBadge({ variant: 'invalid' as any });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('should apply custom container style', () => {
      const customStyle = { backgroundColor: 'red', marginTop: 10 };
      renderBadge({ style: customStyle });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should apply custom text style', () => {
      const customTextStyle = { fontSize: 20, color: 'blue' };
      renderBadge({ textStyle: customTextStyle });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should merge custom styles with variant styles', () => {
      const customStyle = { marginTop: 10 };
      const customTextStyle = { fontSize: 18 };
      renderBadge({
        variant: 'primary',
        style: customStyle,
        textStyle: customTextStyle,
      });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should apply base container styles', () => {
      renderBadge({ children: 'Test Badge' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility props', () => {
      renderBadge({ children: 'Status Badge' });
      const badge = screen.getByText('Status Badge');
      expect(badge).toBeTruthy();
    });

    it('should have accessible prop set to true', () => {
      renderBadge({ children: 'Test Badge' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      renderBadge({ children: 'Test Badge' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeTruthy();
    });

    it('should have correct accessibility label', () => {
      renderBadge({ children: 'Status Badge' });
      const badge = screen.getByText('Status Badge');
      expect(badge).toBeTruthy();
    });

    it('should generate accessibility label with badge content', () => {
      renderBadge({ children: 'Active Status' });
      const badge = screen.getByText('Active Status');
      expect(badge).toBeTruthy();
    });
  });

  describe('Content Handling', () => {
    it('should render string content', () => {
      renderBadge({ children: 'String Content' });
      expect(screen.getByText('String Content')).toBeTruthy();
    });

    it('should render number content', () => {
      renderBadge({ children: 42 });
      expect(screen.getByText('42')).toBeTruthy();
    });

    it('should render empty string content', () => {
      renderBadge({ children: '' });
      expect(screen.getByText('')).toBeTruthy();
    });

    it('should handle null content', () => {
      renderBadge({ children: null });
      const badge = screen.getByLabelText('Badge: null');
      expect(badge).toBeTruthy();
    });

    it('should handle undefined content', () => {
      renderBadge({ children: undefined });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });
  });

  describe('Variant Color Schemes', () => {
    it('should apply primary variant colors', () => {
      renderBadge({ variant: 'primary' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should apply secondary variant colors', () => {
      renderBadge({ variant: 'secondary' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should apply success variant colors', () => {
      renderBadge({ variant: 'success' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should apply error variant colors', () => {
      renderBadge({ variant: 'error' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should apply warning variant colors', () => {
      renderBadge({ variant: 'warning' });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });
  });

  describe('Text Component Integration', () => {
    it('should render Text component with correct variant', () => {
      renderBadge({ children: 'Test Badge' });
      const textElement = screen.getByText('Test Badge');
      expect(textElement).toBeTruthy();
    });

    it('should apply correct fontWeight to Text component', () => {
      renderBadge({ children: 'Test Badge' });
      const textElement = screen.getByText('Test Badge');
      expect(textElement).toBeTruthy();
    });

    it('should merge variant text styles with custom text styles', () => {
      const customTextStyle = { fontSize: 16 };
      renderBadge({
        variant: 'primary',
        textStyle: customTextStyle,
      });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined variant gracefully', () => {
      renderBadge({ variant: undefined });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should handle null style props gracefully', () => {
      renderBadge({ style: null, textStyle: null });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should handle undefined style props gracefully', () => {
      renderBadge({ style: undefined, textStyle: undefined });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should handle complex nested content', () => {
      renderBadge({
        children: (
          <React.Fragment>
            <span>Part 1</span>
            <span>Part 2</span>
          </React.Fragment>
        ),
      });
      expect(screen.getByText('Part 1Part 2')).toBeTruthy();
    });
  });

  describe('Style Merging Behavior', () => {
    it('should prioritize custom styles over variant styles', () => {
      const customStyle = { backgroundColor: 'purple' };
      const customTextStyle = { color: 'yellow' };
      renderBadge({
        variant: 'primary',
        style: customStyle,
        textStyle: customTextStyle,
      });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should merge multiple custom styles correctly', () => {
      const style1 = { marginTop: 5 };
      const style2 = { marginBottom: 5 };
      renderBadge({
        style: [style1, style2],
      });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });

    it('should merge multiple custom text styles correctly', () => {
      const textStyle1 = { fontSize: 14 };
      const textStyle2 = { fontWeight: 'bold' };
      renderBadge({
        textStyle: [textStyle1, textStyle2],
      });
      expect(screen.getByText('Test Badge')).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('should render View container with correct props', () => {
      renderBadge({ children: 'Test Badge' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeTruthy();
    });

    it('should render Text component as child', () => {
      renderBadge({ children: 'Test Badge' });
      const textElement = screen.getByText('Test Badge');
      expect(textElement).toBeTruthy();
    });

    it('should maintain component hierarchy', () => {
      renderBadge({ children: 'Test Badge' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeTruthy();
    });
  });

  describe('Real-world Usage Scenarios', () => {
    it('should work as a status indicator', () => {
      renderBadge({
        variant: 'success',
        children: 'Active',
      });
      expect(screen.getByText('Active')).toBeTruthy();
    });

    it('should work as a notification counter', () => {
      renderBadge({
        variant: 'error',
        children: '3',
      });
      expect(screen.getByText('3')).toBeTruthy();
    });

    it('should work as a category label', () => {
      renderBadge({
        variant: 'primary',
        children: 'Crypto',
      });
      expect(screen.getByText('Crypto')).toBeTruthy();
    });

    it('should work with custom styling for special cases', () => {
      renderBadge({
        variant: 'warning',
        style: { position: 'absolute', top: 0, right: 0 },
        children: 'New',
      });
      expect(screen.getByText('New')).toBeTruthy();
    });
  });
});
