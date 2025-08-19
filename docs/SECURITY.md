### Security & fraud prevention

- Firebase ID token verification → short-lived API JWT
- OTP rate limits, device fingerprint, captcha after N attempts
- KYC validation; liveness for video; bank/VPA name match
- Webhook signatures (Razorpay/Paytm) + idempotency keys
- Data minimization; E2E chat; signed URLs; AV scan on uploads
- RBAC for admin; audit logs; immutable wallet ledger
- Abuse rules: velocity of bids/cancellations; GPS consistency checks
- Rate limiting: per-IP/user/endpoint via Redis token buckets
