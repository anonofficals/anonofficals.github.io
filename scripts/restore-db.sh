#!/bin/bash

# MongoDB Restore Script
# Usage: ./scripts/restore-db.sh [backup_file]

set -e

if [ -z "$1" ]; then
    echo "Usage: ./scripts/restore-db.sh <backup_file.tar.gz>"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

if [ -z "$MONGO_URI" ]; then
    echo "Error: MONGO_URI environment variable is not set"
    exit 1
fi

echo "Starting MongoDB restore..."
echo "Backup file: $BACKUP_FILE"

# Extract backup
TEMP_DIR=$(mktemp -d)
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# Find the backup directory
BACKUP_DIR=$(find "$TEMP_DIR" -type d -name "backup_*" | head -n 1)

if [ -z "$BACKUP_DIR" ]; then
    echo "Error: Could not find backup directory in archive"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Restore database
mongorestore --uri="$MONGO_URI" --gzip --dir="$BACKUP_DIR" --drop

if [ $? -eq 0 ]; then
    echo "Restore completed successfully!"
else
    echo "Restore failed!"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Cleanup
rm -rf "$TEMP_DIR"
echo "Temporary files cleaned up"
