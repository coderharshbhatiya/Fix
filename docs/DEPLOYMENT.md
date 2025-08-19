### Deployment checklist (India-first)

Environments
- dev, stage, prod with separate Firebase, Storage, FCM, PSP accounts

API
- Containerized Node 18+, HTTPS behind CDN/WAF, autoscaling
- Env: API_JWT_SECRET, DATABASE_URL, PSP keys
- Observability: logs, metrics, tracing

DB
- Managed Postgres 14+ with PostGIS, HA, PITR, read replica
- Backups verified; roles and least-privilege

Storage & Push
- Firebase Storage asia-south1; lifecycle policies
- FCM keys rotated

Mobile
- EAS builds; app signing; Google Maps keys restricted; PSP SDKs

Security
- Webhook signature verification; rate limits (Redis)
- Admin RBAC; audit logs

Compliance
- PCI via PSP; Aadhaar redaction; DPDP-ready exports/deletion
