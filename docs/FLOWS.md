### UI/UX flows

User
- Auth → Onboarding → Home (categories) → Post Request or Instant Book → Checkout → Booking → Chat/Call → Review
- Wallet → Topup → Use at checkout → Loyalty/referrals visible on Dashboard

Provider
- Onboarding → KYC → Nearby Requests (list + heatmap) → Bid/Instant → Booking Inbox → Earnings → Payouts → Subscriptions/Promotions

Admin
- Dashboard → KYC queue → Bookings (release/refund) → Payouts → Users/Providers → Promotions/Notifications → Disputes → Settings

Realtime
- Bids via provider subscriptions to pincode+category rooms
- Chat E2E text + media via Storage, Socket.io events for delivery/read
