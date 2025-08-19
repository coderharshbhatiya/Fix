### REST API endpoints (v1)

Auth
- POST /v1/auth/exchange-firebase → Exchange Firebase ID token for API JWT

Me
- GET /v1/me → Profile summary

Categories & Services
- GET /v1/categories → List categories
- GET /v1/services/search → Search services (instant)

Requests & Bids
- POST /v1/requests → Create request
- GET /v1/requests/nearby → Providers fetch nearby
- POST /v1/requests/:id/bids → Submit bid
- GET /v1/requests/:id/bids → View bids
- POST /v1/requests/:id/award → Award job

Bookings
- POST /v1/bookings/instant → Instant booking
- GET /v1/bookings/:id → Booking detail

Payments & Wallet
- POST /v1/payments/intent → Create payment order
- POST /v1/payments/webhooks/razorpay → PSP webhook
- POST /v1/wallet/topup → Wallet topup
- GET /v1/wallet → Wallet balances + ledger

Payouts
- POST /v1/payouts → Provider payout request
- POST /v1/payouts/webhooks/razorpayx → Payout webhook

Subscriptions & Promotions
- POST /v1/subscriptions/checkout → Start/renew plan
- GET /v1/subscriptions/me → Current plan
- POST /v1/promotions → Create promotion

Reviews
- POST /v1/reviews → Create review
- GET /v1/providers/:id/reviews → List

Chat & Calls
- POST /v1/chat/threads → Create thread
- GET /v1/chat/threads/:id/messages → Paginate messages
- WS /v1/chat/connect → Socket.io for realtime
- POST /v1/call/token → Masked call token

Admin
- GET /v1/admin/queue/kyc
- POST /v1/admin/documents/:id/approve|reject
- GET /v1/admin/analytics
- POST /v1/admin/bookings/:id/release|refund
Example: Create bid
Request:
{
  "amount": 1200,
  "eta_min": 90,
  "note": "Includes materials."
}
Response:
{
  "id": "bd_9f2...",
  "status": "active"
}