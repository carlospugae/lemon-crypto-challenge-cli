module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@env$': '<rootDir>/__mocks__/@env.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
