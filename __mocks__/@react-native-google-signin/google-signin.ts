export const User = {
  user: {
    id: 'mock-user-id',
    name: 'Mock User',
    email: 'mock@example.com',
    photo: 'https://example.com/photo.jpg',
    familyName: 'User',
    givenName: 'Mock',
  },
  scopes: ['email', 'profile'],
  idToken: 'mock-id-token',
  serverAuthCode: null,
};

export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn().mockResolvedValue(true),
  signIn: jest.fn(),
  signInSilently: jest.fn(),
  signOut: jest.fn(),
  revokeAccess: jest.fn(),
  isSignedIn: jest.fn(),
  getCurrentUser: jest.fn(),
  getTokens: jest.fn(),
  addScopes: jest.fn(),
};

export const statusCodes = {
  SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
};
