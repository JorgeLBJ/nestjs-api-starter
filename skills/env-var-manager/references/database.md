# Database Environment Variables

Quick reference for database-related environment variables in NestJS projects.

## Current Project Variables

Review existing variables before adding new ones:

- `NODE_ENV` - Environment (development | production | test)
- `PORT` - Server port (optional, default: 8000)
- `LOGGER_LEVEL` - Logging level (optional, default: 'log')

---

## PostgreSQL

### Required Variables

- `DATABASE_URL` (string, URL) - Complete connection URL
  - Format: `postgresql://user:password@host:port/database?options`

### Alternative: Individual Connection Parameters (instead of URL)

- `DATABASE_HOST` (string) - Database server host
- `DATABASE_PORT` (number, default: 5432) - Database server port
- `DATABASE_NAME` (string) - Database name
- `DATABASE_USER` (string) - Database username
- `DATABASE_PASSWORD` (string) - Database password

### Optional Variables with Default

- `DATABASE_POOL_SIZE` (number, default: 10) - Connection pool size
- `DATABASE_TIMEOUT` (number, default: 30) - Connection timeout in seconds
- `DATABASE_SSL` (boolean, default: false) - Enable SSL connection

### Configuration Notes

- Use `DATABASE_URL` (recommended) OR individual parameters, not both
- Enable SSL for production environments
- Adjust pool size based on expected concurrent connections

---

## MySQL / MariaDB

### Required Variables

- `DATABASE_URL` (string, URL) - Complete connection URL
  - Format: `mysql://user:password@host:port/database`

### Alternative: Individual Connection Parameters

- `DATABASE_HOST` (string) - Database server host
- `DATABASE_PORT` (number, default: 3306) - Database server port
- `DATABASE_NAME` (string) - Database name
- `DATABASE_USER` (string) - Database username
- `DATABASE_PASSWORD` (string) - Database password

### Optional Variables with Default

- `DATABASE_POOL_SIZE` (number, default: 10) - Connection pool size
- `DATABASE_SSL` (boolean, default: false) - Enable SSL connection

### Configuration Notes

- Port 3306 is default for MySQL
- MariaDB uses same connection parameters

---

## MongoDB

### Required Variables

- `MONGODB_URI` (string, URL) - Complete connection URI
  - Format: `mongodb://user:password@host:port/database?options`
  - Format (Cluster): `mongodb+srv://user:password@cluster.mongodb.net/database`

### Alternative: Individual Connection Parameters

- `MONGODB_HOST` (string) - MongoDB server host
- `MONGODB_PORT` (number, default: 27017) - MongoDB server port
- `MONGODB_DATABASE` (string) - Database name
- `MONGODB_USER` (string) - MongoDB username
- `MONGODB_PASSWORD` (string) - MongoDB password

### Optional Variables with Default

- `MONGODB_AUTH_SOURCE` (string, default: 'admin') - Authentication database

### Configuration Notes

- Use `MONGODB_URI` (recommended) for cloud services like MongoDB Atlas
- Auth source typically 'admin' for standard setups
- Connection string format varies for replica sets and sharded clusters
