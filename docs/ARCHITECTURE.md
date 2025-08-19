### FixWale Architecture

- Mobile (Expo), API (Express), Admin (Next.js)
- DB: Postgres (Supabase) with PostGIS
- Auth: Firebase Auth (Phone/Google) → API JWT exchange
- Payments: Razorpay/Paytm; Payouts: RazorpayX/Paytm
- Chat: Socket.io, E2E at client, media in Firebase Storage
- Push: FCM
