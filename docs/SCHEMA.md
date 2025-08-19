### Database schema (PostgreSQL + PostGIS)

Note: All amounts are in paise (bigint). Timezones are UTC.

Tables (key fields)

- users: id (uuid, pk), firebase_uid (unique), role [user|provider|admin], name, phone, photo_url, default_address_id, loyalty_points, referral_code, referred_by, created_at
- addresses: id, user_id fk users, line1, line2, city, state, pincode, lat, lng, landmark, is_default
- providers: id (=users.id), trade, bio, service_radius_km, avg_rating, ratings_count, completion_rate, is_verified, subscription_plan, subscription_ends_at, badges jsonb, quality_score
- documents: id, provider_id fk, type [aadhaar|gstin|license], file_url, status [pending|approved|rejected], reviewed_by, reviewed_at
- categories: id, name, slug, parent_id
- services: id, provider_id, category_id, title, description, pricing_type [fixed|range], price_min, price_max, base_price, est_duration_min, is_instant_book, is_active, promoted_until
- requests: id, user_id, category_id, title, description, photos jsonb, requested_date, emergency, status [open|bidding|awarded|canceled|expired], location (geog point), pincode, budget_min, budget_max
- bids: id, request_id, provider_id, amount, eta_min, note, status [active|withdrawn|accepted|rejected], created_at
- bookings: id, type [bid|instant], request_id?, service_id?, user_id, provider_id, scheduled_start, address_id, emergency, status [pending_payment|paid_escrow|in_progress|completed_pending_release|released|canceled|disputed|refunded], subtotal_amount, emergency_fee, service_fee, provider_commission, total_amount, payment_intent_id, escrow_hold_id
- wallet_ledger: id, wallet_id, booking_id?, type [user_topup|user_payment_hold|user_refund|provider_earning|commission_fee|payout|adjustment|promo_credit|loyalty_credit], amount_cents signed, meta jsonb, created_at
- wallet_accounts (view): id, owner_type [user|provider], owner_id, balance_cents, currency
- payments: id, provider [razorpay|paytm], provider_order_id, provider_payment_id, status [created|authorized|captured|failed|refunded], amount_cents, currency, user_id, booking_id, method, receipt_no, raw jsonb
- payouts: id, provider_id, amount_cents, status [requested|approved|processing|paid|failed], destination [upi|bank], upi_vpa, ifsc, account_no, provider_payout_id, raw jsonb
- subscriptions: id, provider_id, plan [free|pro|premium], started_at, ends_at, status [active|expired|canceled], payment_id
- promotions: id, provider_id, service_id?, kind [listing_boost|bundle_ad], starts_at, ends_at, status, payment_id
- reviews: id, booking_id unique, user_id, provider_id, rating int, comment, photos jsonb, sentiment [pos|neu|neg], created_at
- chat_threads: id, booking_id unique, user_id, provider_id, is_encrypted, created_at
- chat_messages: id, thread_id, sender_id, kind [text|image|system], ciphertext_or_url, created_at, delivered_at, read_at
- referrals: id, referrer_user_id, referee_user_id, role [user|provider], milestone [signup|1st|3rd], reward_status [locked|unlocked|redeemed]
- admins: id (=users.id), role [ops|finance|super], last_login_at
- disputes: id, booking_id, opened_by [user|provider], reason, status [open|in_review|resolved_refund|resolved_release], resolution_note

Indexes

- users: uniq(firebase_uid), idx(referred_by)
- addresses: idx(user_id), gist(geog)
- providers: idx(avg_rating desc), idx(quality_score desc)
- documents: idx(provider_id), idx(status)
- categories: uniq(slug), idx(parent_id)
- services: idx(provider_id), idx(category_id), idx(is_instant_book), idx(promoted_until desc)
- requests: idx(status), idx(category_id), gist(geog)
- bids: uniq(provider_id, request_id), idx(request_id), idx(status)
- bookings: idx(user_id), idx(provider_id), idx(status), idx(scheduled_start)
- wallet_ledger: idx(wallet_id), idx(booking_id), idx(type), idx(created_at)
- payments: uniq(provider_payment_id), idx(booking_id), idx(status)
- payouts: idx(provider_id), idx(status)
- subscriptions: idx(provider_id), idx(status)
- promotions: idx(provider_id), idx(service_id), idx(ends_at desc)
- reviews: idx(provider_id), idx(rating desc)
- chat_messages: idx(thread_id, created_at)

Triggers

- On reviews insert/update: update providers.avg_rating, ratings_count
- On bookings status changes: update completion_rate
- On wallet_ledger insert: materialize wallet_accounts balances

Geospatial

- Use PostGIS geography(Point, 4326) for addresses and requests
- Nearby match: ST_DWithin(provider_location, request_location, service_radius_meters)
