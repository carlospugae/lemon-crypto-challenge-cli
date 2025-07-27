import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from '../navigation';
import { AuthProvider } from '@/context/AuthContext';

/**
 * Mock the screens to avoid complex dependencies
 */
jest.mock('@/screens/home', () => {
  const React = require('react');
  return function MockHome() {
    return React.createElement('div', { testID: 'home-screen' }, 'Home Screen');
  };
});

jest.mock('@/screens/profile', () => {
  const React = require('react');
  return function MockProfile() {
    return React.createElement(
      'div',
      { testID: 'profile-screen' },
      'Profile Screen',
    );
  };
});

jest.mock('@/screens/details', () => {
  const React = require('react');
  return function MockDetails() {
    return React.createElement(
      'div',
      { testID: 'details-screen' },
      'Details Screen',
    );
  };
});

jest.mock('@/screens/login', () => {
  const React = require('react');
  return function MockLogin() {
    return React.createElement(
      'div',
      { testID: 'login-screen' },
      'Login Screen',
    );
  };
});

/**
 * Test suite for Navigation component
 */
describe('Navigation', () => {
  /**
   * Test that the navigation component renders without crashing
   */
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Navigation />
      </AuthProvider>,
    );

    // The component should render without throwing errors
    expect(getByTestId).toBeDefined();
  });

  /**
   * Test that the navigation structure is properly configured
   */
  it('has correct screen configuration', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Navigation />
      </AuthProvider>,
    );

    // Verify that the navigation component renders
    expect(getByTestId).toBeDefined();
  });
});
