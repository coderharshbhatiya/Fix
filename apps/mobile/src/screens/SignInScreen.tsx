import { View, Text, Button } from 'react-native';
import { useAuth } from '../state/auth';
import { signInWithGoogleNative } from '../auth/firebase';

export default function SignInScreen({ navigation }: any) {
  const setToken = useAuth((s) => s.setToken);
  const onContinue = async () => {
    const apiBase = (process.env as any).EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    // Try Google auth; fallback to demo token
    let idToken: string | undefined;
    try {
      const g = await signInWithGoogleNative();
      if (g.ok) idToken = g.idToken;
    } catch {}
    const authHeader = idToken ? `Bearer ${idToken}` : 'Bearer demo-token';
    const res = await fetch(apiBase + '/v1/auth/exchange-firebase', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: authHeader }, body: JSON.stringify({}) }).then((r) => r.json());
    setToken(res.token);
    // Register push token
    try {
      const pushToken = (await import('../push/registerPush')).registerForPushNotificationsAsync();
      pushToken.then((t) => {
        if (!t) return;
        fetch(apiBase + '/v1/devices/register', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${res.token}` }, body: JSON.stringify({ token: t }) });
      });
    } catch {}
    navigation.replace('Home');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Welcome to FixWale</Text>
      <Button title="Continue" onPress={onContinue} />
    </View>
  );
}
