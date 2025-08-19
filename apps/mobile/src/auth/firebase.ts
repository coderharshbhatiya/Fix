import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google';

const cfg = (Constants?.expoConfig?.extra as any)?.firebase || {};
const app = initializeApp(cfg);
export const auth = getAuth(app);

export async function signInWithGoogleNative() {
  const webClientId = (Constants?.expoConfig?.extra as any)?.google?.webClientId;
  const [request, response, promptAsync] = Google.useAuthRequest({ expoClientId: webClientId, webClientId });
  if (!request) return { ok: false };
  const res = await promptAsync();
  if (res?.type !== 'success') return { ok: false };
  const idToken = res.authentication?.idToken as string;
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  const token = await result.user.getIdToken();
  return { ok: true, idToken: token };
}
