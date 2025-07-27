module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@env$': '<rootDir>/__mocks__/@env.js',
    '^@react-native-google-signin/google-signin$':
      '<rootDir>/__mocks__/@react-native-google-signin/google-signin.ts',
    '^@react-native-vector-icons/feather$':
      '<rootDir>/__mocks__/@react-native-vector-icons/feather.js',
    '^@react-native-vector-icons/fontawesome6$':
      '<rootDir>/__mocks__/@react-native-vector-icons/fontawesome6.js',
    '^@react-native-vector-icons/common$':
      '<rootDir>/__mocks__/@react-native-vector-icons/common.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-size-matters|react-native-vector-icons|react-native-skeleton-placeholder|@react-native-masked-view|@react-native-google-signin)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
