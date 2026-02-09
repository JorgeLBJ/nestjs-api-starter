# Authentication Environment Variables

Quick reference for authentication-related environment variables in NestJS projects.

## Current Project Variables

Review existing variables before adding new ones:

- `NODE_ENV` - Environment (development | production | test)
- `PORT` - Server port (optional, default: 8000)
- `LOGGER_LEVEL` - Logging level (optional, default: 'log')

---

## JWT (JSON Web Tokens)

### Required Variables

- `JWT_SECRET` (string, min 32 chars) - Secret key for signing tokens

### Optional Variables with Default

- `JWT_EXPIRATION_TIME` (string, default: '1h') - Token expiration time
  - Common formats: '1h', '7d', '30m', '365d'
- `JWT_REFRESH_EXPIRATION` (string, default: '7d') - Refresh token expiration
- `JWT_ALGORITHM` (string, default: 'HS256') - Signing algorithm
  - Valid values: HS256, HS384, HS512, RS256

### Optional Variables without Default

- `JWT_REFRESH_SECRET` (string, min 32 chars) - Secret for refresh tokens
- `JWT_ISSUER` (string) - Token issuer identifier
- `JWT_AUDIENCE` (string) - Token audience

### Configuration Notes

- Secret minimum length: 32 characters recommended
- Use separate secrets for access and refresh tokens in production
- Audience and issuer add additional validation layer

---

## OAuth 2.0

### Required Variables

- `OAUTH_CLIENT_ID` (string) - OAuth client ID from provider
- `OAUTH_CLIENT_SECRET` (string) - OAuth client secret
- `OAUTH_REDIRECT_URI` (string, URL) - Callback URL after authentication

### Optional Variables

- `OAUTH_SCOPE` (string) - Requested scopes (e.g., 'openid profile email')
- `OAUTH_PROVIDER` (string) - Provider identifier (google, github, facebook, etc.)

### Configuration Notes

- Redirect URI must match exactly what's configured in provider dashboard
- Common providers: Google, GitHub, Facebook, Microsoft, Apple
- Scopes vary by provider, check provider documentation

---

## API Keys (Third-party Services)

### Required Variables

- `API_KEY` (string) - Main API key for external service

### Optional Variables

- `API_SECRET` (string) - API secret key (if required by service)
- `API_HOST` (string, URL) - Custom API endpoint URL
- `API_VERSION` (string) - API version identifier

### Configuration Notes

- Often used for third-party integrations (payment gateways, email services, etc.)
- Some services require both key and secret
- Store in secrets manager for production environments
