import { View, Text, Button } from 'react-native';
import { useAuth } from '../state/auth';

export default function SignInScreen({ navigation }: any) {
  const setToken = useAuth((s) => s.setToken);
  const onContinue = async () => {
    // Demo: use a mock token for local dev
    const token = 'demo-token';
    setToken(token);
    navigation.replace('Home');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Welcome to FixWale</Text>
      <Button title="Continue" onPress={onContinue} />
    </View>
  );
}
