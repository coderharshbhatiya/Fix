module.exports = ({ config }) => ({
  ...config,
  name: 'FixWale',
  slug: 'fixwale',
  scheme: 'fixwale',
  ios: {
    bundleIdentifier: process.env.IOS_BUNDLE_ID || 'com.fixwale.app'
  },
  android: {
    package: process.env.ANDROID_PACKAGE || 'com.fixwale.app'
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080',
    razorpayKeyId: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxx',
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || ''
    },
    google: {
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || ''
    }
  }
});
