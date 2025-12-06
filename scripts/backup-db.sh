#!/bin/bash

# MongoDB Backup Script
# Usage: ./scripts/backup-db.sh

set -e

# Configuration
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$DATE"
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Starting MongoDB backup..."
echo "Backup name: $BACKUP_NAME"

# Perform backup
if [ -z "$MONGO_URI" ]; then
    echo "Error: MONGO_URI environment variable is not set"
    exit 1
fi

mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/$BACKUP_NAME" --gzip

if [ $? -eq 0 ]; then
    echo "Backup completed successfully!"
    echo "Backup location: $BACKUP_DIR/$BACKUP_NAME"
    
    # Create a compressed archive
    cd "$BACKUP_DIR"
    tar -czf "${BACKUP_NAME}.tar.gz" "$BACKUP_NAME"
    rm -rf "$BACKUP_NAME"
    
    echo "Backup compressed: ${BACKUP_NAME}.tar.gz"
    
    # Remove old backups
    find "$BACKUP_DIR" -name "backup_*.tar.gz" -type f -mtime +$RETENTION_DAYS -delete
    echo "Old backups (older than $RETENTION_DAYS days) removed"
else
    echo "Backup failed!"
    exit 1
fi
