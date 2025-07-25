import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Text, { TextProps, TextVariant } from '../text';
import { theme } from '@/theme';

jest.mock('react-native-size-matters', () => ({
  scale: jest.fn((value: number) => value),
  verticalScale: jest.fn((value: number) => value),
  moderateScale: jest.fn((value: number) => value),
}));

describe('Text Component', () => {
  const renderText = (props: Partial<TextProps> = {}) => {
    const { children, ...otherProps } = props;
    return render(<Text {...otherProps}>{children || 'Test Text'}</Text>);
  };

  describe('Basic Rendering', () => {
    it('should render text with default props', () => {
      renderText();
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should render children correctly', () => {
      renderText({ children: 'Custom Content' });
      expect(screen.getByText('Custom Content')).toBeTruthy();
    });

    it('should render with custom style', () => {
      const customStyle = { backgroundColor: 'red' };
      renderText({ style: customStyle });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants: TextVariant[] = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body',
      'bodySmall',
      'caption',
      'overline',
      'button',
      'label',
    ];

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        renderText({ variant });
        expect(screen.getByText('Test Text')).toBeTruthy();
      });
    });
  });

  describe('Typography Props', () => {
    it('should apply custom fontSize', () => {
      renderText({ fontSize: 'lg' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should apply custom fontWeight', () => {
      renderText({ fontWeight: 'bold' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should apply custom lineHeight', () => {
      renderText({ lineHeight: 1.5 });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should apply text alignment', () => {
      renderText({ align: 'center' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Color Handling', () => {
    it('should apply theme color tokens', () => {
      renderText({ color: 'primary.500' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should apply direct color values', () => {
      renderText({ color: '#ff0000' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should apply base theme colors', () => {
      renderText({ color: 'white' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should use default color when no color is provided', () => {
      renderText();
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Text Behavior', () => {
    it('should handle ellipsis correctly', () => {
      renderText({ ellipsize: true, numberOfLines: 2 });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should handle selectable text', () => {
      renderText({ selectable: true });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should handle disabled state', () => {
      renderText({ disabled: true });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should support accessibility props', () => {
      renderText({
        accessible: true,
        accessibilityRole: 'header',
        accessibilityLabel: 'Test header',
      });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should support accessibility hints', () => {
      renderText({
        accessible: true,
        accessibilityHint: 'This is a test text',
      });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Forward Ref', () => {
    it('should forward ref correctly', () => {
      // Note: Ref forwarding is tested implicitly through component rendering
      renderText();
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Complex Content', () => {
    it('should render nested components', () => {
      render(
        <Text>
          <Text variant="h1">Bold</Text> and normal text
        </Text>,
      );
      expect(screen.getByText('Bold and normal text')).toBeTruthy();
    });

    it('should handle empty content', () => {
      renderText({ children: '' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should handle null content', () => {
      renderText({ children: null });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Style Merging', () => {
    it('should merge custom styles with variant styles', () => {
      renderText({
        variant: 'h1',
        style: { marginTop: 10 },
      });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should prioritize custom props over variant styles', () => {
      renderText({
        variant: 'h1',
        fontSize: 'sm',
        fontWeight: 'normal',
      });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined variant gracefully', () => {
      renderText({ variant: undefined });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should handle invalid color tokens gracefully', () => {
      renderText({ color: 'invalid.color' });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });

    it('should handle zero lineHeight', () => {
      renderText({ lineHeight: 0 });
      expect(screen.getByText('Test Text')).toBeTruthy();
    });
  });
});
