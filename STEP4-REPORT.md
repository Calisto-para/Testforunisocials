# UniSocials — Step 4 Referral Relationship Codes

## Implemented
- Added relationship-scoped influencer referral portals.
- One accepted Influencer ↔ Influencer Admin relationship receives its own referral record and unique referral code.
- A single influencer account can therefore have separate codes for multiple Influencer Admins while keeping one login.
- Existing influencer referral links are migrated to a relationship only when there is exactly one accepted relationship, preserving the existing code rather than replacing it.
- Newly accepted relationships generate a dedicated referral code.
- The referral authorization check now uses the Influencer Admin attached to the referral relationship, rather than relying on the influencer's old single-admin ownership field.
- Influencer referral statistics can be requested by assignment ID.
- Added `/api/influencer/referral-portals` for the influencer dashboard.
- Kept `/api/influencer/referral-link` backward-compatible and made it return the first active portal.
- Influencer dashboard now has a responsive "Working for" selector and switches code/link/statistics by selected Influencer Admin.
- Influencer Admin dashboard referral code/statistics are relationship-scoped, so Admin A and Admin B see their own code for the same influencer.
- Existing sub-admin/global referral behavior remains unchanged.
- Referral codes continue to use cryptographically strong random generation via Node's `crypto.randomBytes`; Node documents this API as generating cryptographically strong pseudorandom data.

## Tests
1. `node --check server.js` — PASS.
2. Inline JavaScript syntax check for `influencer.html` — PASS.
3. Server startup on local test port — PASS.
4. `/api/health` — HTTP 200.
5. Influencer with two accepted relationships received two distinct referral codes — PASS.
6. Accepting a pending relationship generated a dedicated referral code and URL — PASS.
7. Admin A's referral code used on Admin B's event — HTTP 403, correctly blocked.
8. Admin B's referral code on Admin B's event passed the referral-authorization layer and reached the normal order validation — PASS (HTTP 400 for unrelated missing order fields; importantly, it was not rejected as an unauthorized referral).
9. Influencer Admin A's dashboard returned Admin A's relationship code; Admin B returned Admin B's relationship code — PASS.
10. ZIP integrity — PASS.

## Scope limitation
Tests were run against the packaged code locally. No claim is made that the package has been deployed or live-tested against Render/Neon in this step.
