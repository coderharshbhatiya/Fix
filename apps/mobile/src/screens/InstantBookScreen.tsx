import { View, Text, Button, Alert } from 'react-native';
import { useAuth } from '../state/auth';
import { apiPost } from '../api/client';

export default function InstantBookScreen({ route }: any) {
  const token = useAuth((s) => s.token);
  const service_id = route.params?.service_id;

  const onBook = async () => {
    const booking = await apiPost('/v1/bookings/instant', { service_id, emergency: false }, token);
    const intent = await apiPost('/v1/payments/intent', { booking_id: booking.id, source: 'razorpay' }, token);
    Alert.alert('Payment', `Order: ${intent.orderId}\nAmount: ₹${(intent.amount / 100).toFixed(2)}`);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Instant Book</Text>
      <Button title="Pay & Book" onPress={onBook} />
    </View>
  );
}
