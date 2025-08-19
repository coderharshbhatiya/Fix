import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import PostRequestScreen from '../screens/PostRequestScreen';
import BidsScreen from '../screens/BidsScreen';
import InstantBookScreen from '../screens/InstantBookScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostRequest" component={PostRequestScreen} />
        <Stack.Screen name="Bids" component={BidsScreen} />
        <Stack.Screen name="InstantBook" component={InstantBookScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
