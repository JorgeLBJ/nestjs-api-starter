# Email Environment Variables

Quick reference for email service environment variables in NestJS projects.

## Current Project Variables

Review existing variables before adding new ones:

- `NODE_ENV` - Environment (development | production | test)
- `PORT` - Server port (optional, default: 8000)
- `LOGGER_LEVEL` - Logging level (optional, default: 'log')

---

## SMTP (Generic Email Server)

### Required Variables

- `SMTP_HOST` (string) - SMTP server host (e.g., smtp.gmail.com)
- `SMTP_USER` (string) - SMTP username for authentication
- `SMTP_PASSWORD` (string) - SMTP password for authentication
- `SMTP_FROM` (string, email) - Default sender email address

### Optional Variables with Default

- `SMTP_PORT` (number, default: 587) - SMTP server port
  - Port 587: STARTTLS (recommended)
  - Port 465: SSL/TLS
  - Port 25: Unencrypted (not recommended)
- `SMTP_SECURE` (boolean, default: false) - Use SSL/TLS connection

### Optional Variables without Default

- `SMTP_NAME` (string) - Sender display name
- `SMTP_REPLY_TO` (string, email) - Default reply-to address

### Configuration Notes

- Use port 587 with STARTTLS for most providers
- Gmail requires app-specific password, not account password
- Verify sender email with provider before sending

---

## SendGrid

### Required Variables

- `SENDGRID_API_KEY` (string) - SendGrid API key from dashboard
- `SENDGRID_FROM_EMAIL` (string, email) - Verified sender email

### Optional Variables without Default

- `SENDGRID_FROM_NAME` (string) - Sender display name
- `SENDGRID_TEMPLATE_ID` (string) - Default template ID for transactional emails

### Configuration Notes

- API key from SendGrid dashboard (Settings > API Keys)
- Sender email must be verified in SendGrid
- Templates enable consistent email styling

---

## AWS SES (Simple Email Service)

### Required Variables

- `AWS_REGION` (string) - AWS region (e.g., us-east-1, eu-west-1)
- `AWS_ACCESS_KEY_ID` (string) - AWS access key
- `AWS_SECRET_ACCESS_KEY` (string) - AWS secret key
- `SES_FROM_EMAIL` (string, email) - Verified sender email

### Optional Variables without Default

- `SES_CONFIGURATION_SET` (string) - Configuration set name for tracking

### Configuration Notes

- Sender email must be verified in SES console
- Start with SES sandbox mode, request production access later
- Configuration sets provide delivery analytics
- Consider using IAM role instead of access keys in production

---

## Mailgun

### Required Variables

- `MAILGUN_API_KEY` (string) - Mailgun API key
- `MAILGUN_DOMAIN` (string) - Verified domain for sending
- `MAILGUN_FROM_EMAIL` (string, email) - Default sender email

### Optional Variables with Default

- `MAILGUN_HOST` (string, default: 'api.mailgun.net') - API host
  - EU region: 'api.eu.mailgun.net'

### Configuration Notes

- Domain must be verified in Mailgun dashboard
- EU customers should use EU-specific host
- Free tier available for testing
