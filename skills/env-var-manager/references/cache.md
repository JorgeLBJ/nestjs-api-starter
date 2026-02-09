# Cache Environment Variables

Quick reference for cache-related environment variables in NestJS projects.

## Current Project Variables

Review existing variables before adding new ones:

- `NODE_ENV` - Environment (development | production | test)
- `PORT` - Server port (optional, default: 8000)
- `LOGGER_LEVEL` - Logging level (optional, default: 'log')

---

## Redis

### Required Variables

- `REDIS_URL` (string, URL) - Complete Redis connection URL
  - Format: `redis://[username:password@]host:port/db`
  - Format (TLS): `rediss://[username:password@]host:port/db`

### Alternative: Individual Connection Parameters

- `REDIS_HOST` (string) - Redis server host
- `REDIS_PORT` (number, default: 6379) - Redis server port

### Optional Variables with Default

- `REDIS_DB` (number, default: 0) - Redis database number (0-15)
- `REDIS_TLS` (boolean, default: false) - Enable TLS/SSL connection

### Optional Variables without Default

- `REDIS_PASSWORD` (string) - Redis password for authentication
- `REDIS_USERNAME` (string) - Redis username (for Redis 6+ ACL)

### Configuration Notes

- Use `REDIS_URL` (recommended) OR individual parameters
- Password optional for local development, required for production
- DB number (0-15) for data separation within same Redis instance
- Enable TLS for production environments

---

## Memcached

### Required Variables

- `MEMCACHED_URL` (string, URL) - Complete connection URL
  - Format: `memcached://[username:password@]host:port`

### Alternative: Individual Connection Parameters

- `MEMCACHED_HOST` (string) - Memcached server host
- `MEMCACHED_PORT` (number, default: 11211) - Memcached server port

### Optional Variables without Default

- `MEMCACHED_USERNAME` (string) - SASL username (optional)
- `MEMCACHED_PASSWORD` (string) - SASL password (optional)

### Configuration Notes

- Use `MEMCACHED_URL` (recommended) OR individual parameters
- SASL authentication optional, typically not used in local development
- No database selection like Redis (single namespace)
