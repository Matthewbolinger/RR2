# WordPress Backup and Rollback Runbook

**Status:** Prepared, not executed

**Rule:** Do not delete WordPress, cancel Name.com hosting, change name servers, or overwrite the live site during preparation.

## Roles

- **Account owner:** signs into Name.com/cPanel and downloads account-only data
- **Migration operator:** verifies the backup, deploys the preview, performs cutover, and records evidence
- **Business approver:** validates lead delivery, phone/email, brand, content, and tracking
- **Rollback operator:** has independent Name.com access and the prior DNS values

One person may hold multiple roles, but each responsibility must be explicitly assigned before cutover.

## Full backup package

Create a dated folder outside the Name.com hosting account:

```text
raccoon-restoration-pre-migration-2026-07-31/
  cpanel-full-account-backup/
  public_html/
  wordpress-database/
  wp-content-uploads/
  configuration/
  dns/
  screenshots/
  checksums/
```

Collect all of the following:

- cPanel full-account backup, if the plan exposes that option
- Entire `public_html` directory
- Entire `wp-content/uploads` directory
- WordPress database export in SQL format
- `wp-config.php`
- `.htaccess`
- A plugin and theme inventory with versions
- WordPress Tools/Health export if available
- Name.com DNS-zone export
- Current SSL and hosting-product details
- Current form configuration and notification recipients
- Current Meta/Facebook plugin settings, Pixel ID, and CAPI settings
- Current analytics, Search Console, Google Business Profile, and ad-account ownership notes
- Screenshots of the current home, contact form, confirmation behavior, and critical account settings

Treat configuration files and database exports as confidential. Do not commit them to GitHub.

## Verify the backup

- [ ] The SQL export is non-empty and contains WordPress tables
- [ ] `public_html` contains the live `wp-admin`, `wp-content`, and `wp-includes` directories
- [ ] The uploads archive contains current images
- [ ] `wp-config.php` and `.htaccess` are present in the private backup
- [ ] The full backup can be downloaded to a second location
- [ ] A checksum manifest is created
- [ ] At least two people know where the backup is stored
- [ ] The recovery credentials are available independently of the website

Example checksum command:

```bash
shasum -a 256 <backup-file> > <backup-file>.sha256
```

## Pre-cutover freeze

Twenty-four hours before cutover:

1. Avoid nonessential WordPress content, plugin, form, and DNS changes.
2. Record any lead or form submissions that must be reconciled.
3. Take a final incremental database and uploads backup.
4. Confirm the old site remains available at `169.60.159.40`.
5. Confirm the Vercel preview commit SHA and acceptance-test result.
6. Confirm the rollback operator can sign into Name.com.

## Rollback triggers

Rollback immediately if any of the following occurs and cannot be corrected within the agreed cutover window:

- Production domain does not resolve or TLS cannot be issued
- Home, contact, or primary service routes fail
- The quote form does not create a durable CRM lead
- Business email stops sending or receiving
- Canonical URLs or redirects are materially wrong
- Analytics produces duplicate or prohibited events
- A severe accessibility, security, or visual defect appears

## DNS rollback

1. In Name.com DNS, restore the prior web records:
   - apex A → `169.60.159.40`
   - `www` A → `169.60.159.40`
   - TTL → `300`
2. Do not change MX, TXT, NS, or mail-related records.
3. Verify both `https://raccoonrestoration.com` and `https://www.raccoonrestoration.com`.
4. Verify the old contact form and business email.
5. Record the rollback time, reason, DNS values, and observed recovery time.
6. Keep the failed deployment available for diagnosis, but remove it from the production domain.

## Stabilization and retirement

Keep WordPress and Name.com hosting intact through a minimum 14-day stabilization window after a successful cutover. Thirty days is safer when paid campaigns, form automation, or call tracking are active.

Retire WordPress only after:

- DNS and TLS have been stable
- Search Console has processed the new sitemap
- Legacy redirects have been sampled in production
- Lead delivery and attribution have been verified repeatedly
- Email has remained unaffected
- The business owner has accepted the production site
- The full backup has been tested and retained according to policy

## Provider references

- [Name.com: Backing up your website](https://www.name.com/support/articles/205190598-backing-up-your-website)
- [Name.com: Uploading files through cPanel](https://www.name.com/support/articles/360014511934-uploading-files-through-the-cpanel)
- [Name.com: Pointing a domain to Name.com hosting](https://www.name.com/support/articles/206127267-pointing-a-domain-to-name-com-hosting)
