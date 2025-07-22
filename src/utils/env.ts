import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env';

export const validateEnvironmentVariables = (): void => {
  const requiredEnvVars = {
    GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(
      ([_, value]) =>
        !value ||
        value === 'your_google_web_client_id_here' ||
        value === 'your_google_ios_client_id_here',
    )
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing or invalid environment variables: ${missingVars.join(', ')}. ` +
        'Please check your .env file and ensure all required variables are set.',
    );
  }
};

export const getEnvironmentVariables = () => ({
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
});
