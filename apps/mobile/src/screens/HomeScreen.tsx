import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../state/auth';
import { apiGet } from '../api/client';

export default function HomeScreen({ navigation }: any) {
  const token = useAuth((s) => s.token);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const cat = await apiGet<{ items: any[] }>('/v1/categories', token);
      setCategories(cat.items);
      const svc = await apiGet<{ items: any[] }>('/v1/services/search?instant=true', token);
      setServices(svc.items);
    })().catch(console.error);
  }, [token]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(i) => String(i.id)}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 8, backgroundColor: '#eee', marginRight: 8 }} onPress={() => navigation.navigate('PostRequest', { category_id: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{ fontSize: 20, marginVertical: 8 }}>Instant Book</Text>
      <FlatList
        data={services}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 8, backgroundColor: '#f8f8f8', marginBottom: 8 }}>
            <Text style={{ fontWeight: '600' }}>{item.title}</Text>
            <Button title="Book" onPress={() => navigation.navigate('InstantBook', { service_id: item.id })} />
          </View>
        )}
      />
    </View>
  );
}
