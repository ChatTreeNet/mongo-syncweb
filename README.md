# MongoDB Sync Tool

A robust MongoDB database synchronization tool that enables automated data synchronization between source and target MongoDB databases with configurable schedules, batch processing, and detailed logging.

## Features

- **Incremental Synchronization**:
  - Smart detection of new and modified documents
  - Timestamp and ID-based tracking
  - Automatic missing data补充
  - Change Stream real-time monitoring
- **Scheduled Synchronization**: Automated sync using cron schedules
- **Manual Sync**: On-demand synchronization capability
- **Time Window Control**: Configure specific time windows for sync operations
- **Batch Processing**: 
  - Configurable batch sizes (1000-10000)
  - Adjustable chunk sizes (100-5000)
  - Customizable batch delay (0-1000ms)
- **Real-time Monitoring**:
  - Live sync progress tracking
  - WebSocket-based real-time logs
  - Interactive sync control
  - Detailed sync statistics
- **Error Handling**: 
  - Automatic retry mechanism for failed operations
  - Detailed error logging and tracking
  - Connection error handling with comprehensive diagnostics
- **Verification**:
  - Document count verification
  - Index verification between source and target collections
  - Batch-level data validation
- **Internationalization**:
  - English and Chinese language support
  - Easy to add new languages
  - Real-time language switching
- **Web Interface**: 
  - User-friendly configuration interface
  - Real-time sync status display
  - Interactive log viewer
  - Responsive design
- **Docker Support**: Easy deployment using Docker and Docker Compose

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- Docker and Docker Compose (for containerized deployment)

### Local Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd mongo-sync
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

### Docker Setup

1. Build and start the containers:
```bash
docker-compose up -d
```

## Configuration

Configuration is managed through `src/config/sync-config.json`:

```json
{
  "sourceUrl": "mongodb://source-host:port/database",
  "targetUrl": "mongodb://target-host:port/database",
  "collections": "collection1,collection2",
  "schedule": "0 0 * * *",
  "timeWindow": {
    "start": "00:00",
    "end": "23:59"
  },
  "isActive": true
}
```

### Configuration Options

- **sourceUrl**: Source MongoDB connection URL
- **targetUrl**: Target MongoDB connection URL
- **collections**: Comma-separated list of collections to sync
- **schedule**: Cron expression for scheduled sync
- **timeWindow**: 
  - **start**: Daily start time for sync window (HH:mm)
  - **end**: Daily end time for sync window (HH:mm)
- **batchSize**: Number of documents per batch (1000-10000)
- **chunkSize**: Number of documents per write operation (100-5000)
- **batchDelay**: Delay between batches in milliseconds (0-1000)
- **isActive**: Enable/disable sync service

## Usage

### Starting the Service

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Manual Sync

Trigger a manual sync through the web interface or API endpoint:

```bash
curl -X POST http://localhost:3000/api/sync/manual
```

### Monitoring

1. Access the web interface at `http://localhost:3000`
2. View sync logs in `src/config/sync-logs.json`
3. Monitor sync progress and status through the web interface

### API Endpoints

- `GET /api/config`: Get current configuration
- `POST /api/config`: Update configuration
- `GET /api/config/collections`: Get available collections
- `GET /api/config/status`: Get sync status
- `GET /api/config/logs`: Get sync logs
- `POST /api/config/sync`: Trigger manual sync
- `POST /api/config/sync/stop`: Stop current sync
- `DELETE /api/config/logs`: Clear sync logs

## Features in Detail

### Batch Processing

- Data is synchronized in configurable batches to manage memory usage
- Default batch size: 1000 documents
- Automatic retry mechanism for failed batches
- Progress tracking for each batch

### Incremental Synchronization

- **Smart Detection**:
  - Uses document timestamps for change detection
  - Tracks document IDs for efficient updates
  - Automatically identifies missing documents
  - Optimizes sync operations based on changes

- **Change Stream Integration**:
  - Real-time monitoring of database changes
  - Immediate synchronization of updates
  - Automatic reconnection on connection loss
  - Efficient change propagation

### Real-time Monitoring

- **Live Progress Tracking**:
  - Document count and percentage complete
  - Current collection status
  - Insert and update statistics
  - Estimated time remaining

- **WebSocket Integration**:
  - Real-time log streaming
  - Instant status updates
  - Bidirectional communication
  - Low latency monitoring

### Error Handling

- **Connection Management**:
  - Automatic retry on connection failure
  - Graceful error recovery
  - Connection pool optimization
  - Timeout handling

- **Operation Handling**:
  - Write operation retries
  - Batch failure recovery
  - Transaction rollback support
  - Data consistency checks

- **Logging and Reporting**:
  - Detailed error diagnostics
  - Stack trace analysis
  - Error categorization
  - Automatic cleanup procedures

### Verification

- **Data Integrity**:
  - Document count verification
  - Content hash comparison
  - Index structure validation
  - Field-level verification

- **Performance Metrics**:
  - Sync duration tracking
  - Resource usage monitoring
  - Network latency analysis
  - Throughput measurement

### Time Window Control

- **Schedule Management**:
  - Flexible cron expressions
  - Multiple time windows support
  - Holiday schedule handling
  - Time zone awareness

- **Load Balancing**:
  - Peak hour avoidance
  - Resource utilization control
  - Concurrent operation limits
  - Priority-based scheduling

### Internationalization

- **Language Support**:
  - English and Chinese interfaces
  - Real-time language switching
  - Unicode support
  - Date/time localization

- **Extensibility**:
  - Easy language addition
  - Translation management
  - Locale configuration
  - Format customization

## Logging

Comprehensive logging system that tracks:

- Sync operations start/completion
- Error events with detailed diagnostics
- Progress updates
- Configuration changes
- Connection events
- Verification results

## Docker Deployment

The application can be deployed using Docker:

```yaml
# docker-compose.yml example
version: '3'
services:
  mongo-sync:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./src/config:/app/src/config
```

## Best Practices

1. **Configuration**:
   - Use secure database credentials
   - Set appropriate time windows for sync
   - Configure batch sizes based on document size

2. **Monitoring**:
   - Regularly check sync logs
   - Monitor system resources during sync
   - Verify sync completion status

3. **Maintenance**:
   - Regularly backup configuration
   - Monitor disk space for logs
   - Update dependencies periodically

## Troubleshooting

Common issues and solutions:

1. **Connection Failures**:
   - Verify database URLs
   - Check network connectivity
   - Ensure proper authentication

2. **Sync Timeouts**:
   - Adjust batch size
   - Check database performance
   - Verify network stability

3. **Index Mismatches**:
   - Compare index definitions
   - Check collection settings
   - Verify database permissions
