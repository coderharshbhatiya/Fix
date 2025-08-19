import { useState } from 'react';
import { View, Text, TextInput, Switch, Button } from 'react-native';
import { apiPost } from '../api/client';
import { useAuth } from '../state/auth';

export default function PostRequestScreen({ route, navigation }: any) {
  const token = useAuth((s) => s.token);
  const [title, setTitle] = useState('Leaking tap');
  const [emergency, setEmergency] = useState(false);
  const category_id = route.params?.category_id || 1;

  const onSubmit = async () => {
    const r = await apiPost('/v1/requests', { category_id, title, emergency }, token);
    navigation.replace('Bids', { request_id: r.id });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18 }}>Post a Request</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" style={{ borderWidth: 1, padding: 8, marginVertical: 8 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Switch value={emergency} onValueChange={setEmergency} />
        <Text style={{ marginLeft: 8 }}>Emergency (+15%)</Text>
      </View>
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}
