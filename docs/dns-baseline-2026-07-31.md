# DNS and Email Baseline

**Captured:** July 31, 2026

**Source:** Public authoritative DNS responses

**Purpose:** Preserve website, email, verification, and rollback state before any hosting migration

This is a public snapshot, not a substitute for the full Name.com zone export. Records not publicly discoverable, delegated subdomains, provider UI metadata, and account-only values may still exist.

## Web records

| Host | Type | TTL | Value |
| --- | --- | ---: | --- |
| `raccoonrestoration.com` | A | 300 | `169.60.159.40` |
| `www.raccoonrestoration.com` | A | 300 | `169.60.159.40` |

No public apex AAAA, apex CNAME, `www` AAAA, or `www` CNAME answer was observed.

## Name servers

| Host | Type | TTL | Value |
| --- | --- | ---: | --- |
| `raccoonrestoration.com` | NS | 300 | `ns1dhl.name.com` |
| `raccoonrestoration.com` | NS | 300 | `ns2dqx.name.com` |
| `raccoonrestoration.com` | NS | 300 | `ns3ghw.name.com` |
| `raccoonrestoration.com` | NS | 300 | `ns4bty.name.com` |

The migration should leave these name servers in place. Only the minimum website records should change during cutover.

## Mail records

| Priority | Type | TTL | Value |
| ---: | --- | ---: | --- |
| 1 | MX | 3600 | `aspmx.l.google.com` |
| 5 | MX | 3600 | `alt1.aspmx.l.google.com` |
| 5 | MX | 3600 | `alt2.aspmx.l.google.com` |
| 10 | MX | 3600 | `alt3.aspmx.l.google.com` |
| 10 | MX | 3600 | `alt4.aspmx.l.google.com` |

The public MX set points to Google. Do not edit or remove it during the website move.

## TXT records

```text
google-site-verification=YuuMrfhMCPypRYszT0ncELzp5K-bFAOqp2A26r_J1zE
v=spf1 include:spf.titan.email ~all
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4LkilsepmP4/hG/UqcEbcm+qFaUNPeu3JCd3vzssDWHVqT1Npi6zSbalZ3CAiWe3uR7lCOlxvSs5Mgvz2Q2jqNiT23Vkh6XelFVdHnioedpYL2EMhqJoiMmMvVZmsiyRZmPRQJmmJm43QDo8gC3k9xFyT+CiM9Jlo6P1F4mibOQIDAQAB
```

No `_dmarc.raccoonrestoration.com` TXT answer was observed. No CAA answer was observed.

## Important mail inconsistency

The MX records point to Google, while the apex SPF record authorizes Titan. This may be intentional, historical, incomplete, or supplemented by records that were not part of this public query. It must not be “corrected” as part of the website migration.

Before cutover, the domain owner or mail administrator must:

1. Export the full DNS zone from Name.com.
2. Identify the active mailbox provider for every business address.
3. Confirm the expected SPF, DKIM selector/host, and DMARC policy.
4. Send and receive a test message before and after the website DNS change.
5. Confirm mail records are byte-for-byte unchanged unless a separate mail project is approved.

## Rollback value

The current website origin is `169.60.159.40`. If the production cutover fails, restore the prior apex and `www` records to this value with TTL 300, verify propagation, and keep the WordPress host active until the new site has completed the stabilization window.

Do not use this IP as a deletion or hosting-cancellation instruction. It is a recovery reference only.
