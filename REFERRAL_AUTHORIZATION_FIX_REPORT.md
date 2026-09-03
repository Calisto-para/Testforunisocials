# UniSocials Referral Authorization Fix

Built from `UniSocials-v49-favicon-logo.zip`.

## Rule enforced

An influencer created by an Influencer Admin can use that influencer's referral/promo code only for an event that is either:

- explicitly authorized to the influencer's owning Influencer Admin; or
- owned/created by that Influencer Admin.

If the code is used on an unauthorized event, the order is rejected with HTTP 403 and no order is created. This also prevents the referral from receiving the unauthorized event's pricing/attribution.

Existing historical referral statistics shown to an Influencer Admin are scoped to the same authorization rule.

Sub-admin/global referral links retain their existing global behavior.

## Verification performed

- Node `server.js` syntax check: PASS
- Unauthorized influencer referral on unauthorized event: HTTP 403: PASS
- Blocked unauthorized order persisted to storage: NO: PASS
- Authorized event referral: HTTP 200 and referral code retained: PASS
- Influencer Admin-owned event referral: HTTP 200 and referral code retained: PASS
- Influencer Admin dashboard stats exclude historical unauthorized-event referral order: PASS
- Influencer Admin event overview only includes authorized events and correct sales: PASS
- `/api/health`: HTTP 200: PASS
- Final ZIP integrity check: PASS

No live Render/Neon/Flutterwave transaction test was performed.
