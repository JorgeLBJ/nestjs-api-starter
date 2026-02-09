# Queue Environment Variables

Quick reference for queue and message broker environment variables in NestJS projects.

## Current Project Variables

Review existing variables before adding new ones:

- `NODE_ENV` - Environment (development | production | test)
- `PORT` - Server port (optional, default: 8000)
- `LOGGER_LEVEL` - Logging level (optional, default: 'log')

---

## BullMQ (Redis-based Queue)

### Required Variables

- `REDIS_URL` (string, URL) - Redis connection URL for job storage
  - Format: `redis://[username:password@]host:port/db`

### Optional Variables with Default

- `QUEUE_NAME` (string, default: 'default') - Default queue name
- `QUEUE_CONCURRENCY` (number, default: 5) - Jobs processed in parallel per worker
- `QUEUE_MAX_RETRIES` (number, default: 3) - Maximum retry attempts for failed jobs
- `QUEUE_RETRY_DELAY` (number, default: 5000) - Delay between retries in milliseconds

### Configuration Notes

- Uses Redis for job storage and state management
- Concurrency controls parallel job processing
- Adjust retries and delays based on job failure patterns
- Consider separate Redis instance for production queues

---

## RabbitMQ

### Required Variables

- `RABBITMQ_URL` (string, URL) - Complete connection URL
  - Format: `amqp://user:password@host:port/vhost`

### Alternative: Individual Connection Parameters

- `RABBITMQ_HOST` (string) - RabbitMQ server host
- `RABBITMQ_PORT` (number, default: 5672) - RabbitMQ server port
- `RABBITMQ_USER` (string, default: 'guest') - RabbitMQ username
- `RABBITMQ_PASSWORD` (string, default: 'guest') - RabbitMQ password

### Optional Variables with Default

- `RABBITMQ_VHOST` (string, default: '/') - Virtual host for namespace separation

### Optional Variables without Default

- `RABBITMQ_QUEUE_NAME` (string) - Default queue name

### Configuration Notes

- Use `RABBITMQ_URL` (recommended) OR individual parameters
- Change default guest credentials in production
- Virtual hosts provide logical separation within same RabbitMQ instance

---

## AWS SQS (Simple Queue Service)

### Required Variables

- `AWS_REGION` (string) - AWS region (e.g., us-east-1)
- `SQS_QUEUE_URL` (string, URL) - Queue URL from AWS console
  - Format: `https://sqs.{region}.amazonaws.com/{account-id}/{queue-name}`
- `AWS_ACCESS_KEY_ID` (string) - AWS access key
- `AWS_SECRET_ACCESS_KEY` (string) - AWS secret key

### Optional Variables with Default

- `SQS_MESSAGE_RETENTION` (number, default: 345600) - Message retention in seconds (4 days)
  - Range: 60 seconds to 1,209,600 seconds (14 days)

### Configuration Notes

- Queue URL from SQS console or AWS CLI
- Consider using IAM role instead of access keys in production
- FIFO queues require .fifo suffix in queue name
- Standard queues provide best-effort ordering

---

## Apache Kafka

### Required Variables

- `KAFKA_BROKERS` (string, comma-separated) - Kafka broker addresses
  - Format: `broker1:9092,broker2:9092,broker3:9092`
- `KAFKA_CLIENT_ID` (string) - Unique client identifier

### Optional Variables with Default

- `KAFKA_GROUP_ID` (string, default: 'default-group') - Consumer group ID

### Optional Variables without Default

- `KAFKA_USERNAME` (string) - SASL username (if authentication enabled)
- `KAFKA_PASSWORD` (string) - SASL password (if authentication enabled)

### Configuration Notes

- Multiple brokers provide fault tolerance
- Consumer groups enable parallel processing
- SASL authentication typically required in production
