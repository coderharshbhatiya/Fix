import { View, Text, Button } from 'react-native';
import { useAuth } from '../state/auth';

export default function SignInScreen({ navigation }: any) {
  const setToken = useAuth((s) => s.setToken);
  const onContinue = async () => {
    // Demo: obtain API JWT using dev token
    const res = await fetch((global as any).EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080' + '/v1/auth/exchange-firebase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer demo-token' },
      body: JSON.stringify({})
    }).then((r) => r.json());
    setToken(res.token);
    navigation.replace('Home');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Welcome to FixWale</Text>
      <Button title="Continue" onPress={onContinue} />
    </View>
  );
}
