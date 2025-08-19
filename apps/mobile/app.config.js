module.exports = ({ config }) => ({
  ...config,
  name: 'FixWale',
  slug: 'fixwale',
  scheme: 'fixwale',
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080'
  }
});
