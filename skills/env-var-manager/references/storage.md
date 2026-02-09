# Storage Environment Variables

Quick reference for cloud storage service environment variables in NestJS projects.

## Current Project Variables

Review existing variables before adding new ones:

- `NODE_ENV` - Environment (development | production | test)
- `PORT` - Server port (optional, default: 8000)
- `LOGGER_LEVEL` - Logging level (optional, default: 'log')

---

## AWS S3 (Simple Storage Service)

### Required Variables

- `AWS_REGION` (string) - AWS region (e.g., us-east-1, eu-west-1)
- `AWS_ACCESS_KEY_ID` (string) - AWS access key
- `AWS_SECRET_ACCESS_KEY` (string) - AWS secret key
- `S3_BUCKET_NAME` (string) - S3 bucket name

### Optional Variables with Default

- `S3_ACL` (string, default: 'private') - Default access control for uploaded files
  - Valid values: 'private', 'public-read', 'public-read-write'

### Optional Variables without Default

- `S3_ENDPOINT` (string, URL) - Custom S3 endpoint (for S3-compatible services like MinIO)
- `S3_MAX_FILE_SIZE` (number) - Max file size in bytes for uploads

### Configuration Notes

- Consider using IAM role instead of access keys in production
- Use 'private' ACL by default, expose specific files as needed
- Custom endpoint useful for MinIO, DigitalOcean Spaces, etc.

---

## Azure Blob Storage

### Required Variables (Option A: Connection String)

- `AZURE_STORAGE_CONNECTION_STRING` (string) - Complete connection string from Azure portal
- `AZURE_CONTAINER_NAME` (string) - Container name for blob storage

### Required Variables (Option B: Account Key)

- `AZURE_STORAGE_ACCOUNT_NAME` (string) - Azure storage account name
- `AZURE_STORAGE_ACCOUNT_KEY` (string) - Azure storage account key
- `AZURE_CONTAINER_NAME` (string) - Container name for blob storage

### Optional Variables without Default

- `AZURE_STORAGE_SAS_TOKEN` (string) - SAS token for temporary access without credentials

### Configuration Notes

- Use connection string (simpler) OR account name + key
- Container name must be lowercase, 3-63 characters
- SAS tokens provide time-limited access without exposing keys

---

## Google Cloud Storage (GCS)

### Required Variables

- `GCP_PROJECT_ID` (string) - GCP project ID from console
- `GCP_BUCKET_NAME` (string) - Storage bucket name
- `GCP_KEY_FILE` (string, path) - Path to service account key JSON file
  - Alternative: Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

### Optional Variables with Default

- `GCP_STORAGE_CLASS` (string, default: 'STANDARD') - Storage class for cost optimization
  - Valid values: 'STANDARD', 'NEARLINE', 'COLDLINE', 'ARCHIVE'

### Configuration Notes

- Service account key from IAM & Admin > Service Accounts
- Storage class affects cost and access speed
- STANDARD: Frequent access, NEARLINE: Monthly access, COLDLINE: Quarterly, ARCHIVE: Annual

---

## MinIO (Self-hosted S3-compatible)

### Required Variables

- `MINIO_ENDPOINT` (string, URL) - MinIO server endpoint (e.g., http://localhost:9000)
- `MINIO_ACCESS_KEY` (string) - MinIO access key
- `MINIO_SECRET_KEY` (string) - MinIO secret key
- `MINIO_BUCKET_NAME` (string) - Bucket name

### Optional Variables with Default

- `MINIO_USE_SSL` (boolean, default: false) - Use HTTPS for connections
- `MINIO_PORT` (number, default: 9000) - MinIO server port

### Configuration Notes

- S3-compatible API, can use AWS S3 SDK
- Ideal for local development and testing
- Enable SSL in production environments
