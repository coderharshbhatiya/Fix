import RootNavigator from './src/navigation/RootNavigator';
import { useEffect } from 'react';
import { registerForPushNotificationsAsync } from './src/push/registerPush';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync().catch(() => {});
  }, []);
  return <RootNavigator />;
}
