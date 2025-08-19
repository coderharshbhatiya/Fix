import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAuth } from '../state/auth';
import { apiGet } from '../api/client';

export default function BidsScreen({ route }: any) {
  const token = useAuth((s) => s.token);
  const request_id = route.params?.request_id;
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiGet<{ items: any[] }>(`/v1/requests/${request_id}/bids?sort=price`, token);
      setBids(res.items);
    })().catch(console.error);
  }, [request_id, token]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Bids</Text>
      <FlatList data={bids} keyExtractor={(i) => i.id} renderItem={({ item }) => (
        <View style={{ padding: 8, backgroundColor: '#f1f1f1', marginBottom: 8 }}>
          <Text>Amount: ₹{item.amount}</Text>
          <Text>ETA: {item.eta_min || 60} min</Text>
        </View>
      )} />
    </View>
  );
}
