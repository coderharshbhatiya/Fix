import { Platform } from 'react-native';

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
};

export async function openRazorpayCheckout(opts: RazorpayOptions): Promise<{ success: boolean; payload?: any }> {
  try {
    if (Platform.OS === 'web') return { success: true };
    const RazorpayCheckout = require('react-native-razorpay').default;
    const data = await RazorpayCheckout.open({
      key: opts.key,
      amount: opts.amount,
      currency: opts.currency,
      name: opts.name,
      description: opts.description,
      order_id: opts.order_id,
      prefill: opts.prefill || {}
    });
    return { success: true, payload: data };
  } catch (e) {
    return { success: false, payload: e };
  }
}
