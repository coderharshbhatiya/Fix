import { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../state/auth';

export default function ChatScreen() {
  const token = useAuth((s) => s.token);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const s = io('http://localhost:8080', { auth: { token } });
    s.on('welcome', () => {});
    s.on('message:new', (m: any) => setMessages((prev) => [...prev, m]));
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [token]);

  const send = () => {
    socket?.emit('message:new', { id: Date.now().toString(), text });
    setText('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList data={messages} keyExtractor={(i) => i.id} renderItem={({ item }) => <Text>{item.text}</Text>} />
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={{ flex: 1, borderWidth: 1, padding: 8 }} value={text} onChangeText={setText} />
        <Button title="Send" onPress={send} />
      </View>
    </View>
  );
}
