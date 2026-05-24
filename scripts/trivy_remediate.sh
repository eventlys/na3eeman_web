#!/bin/bash
set -e

# Trivy auto-remediation script for Web Frontend

IMAGE_NAME="na3eeman_web:local"
MAX_ATTEMPTS=2
ATTEMPT=1

echo "Building standard Dockerfile..."
docker build -t "$IMAGE_NAME" -f Dockerfile .

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    echo "Scanning image (Attempt $ATTEMPT)..."
    
    # Run scan
    SCAN_OUTPUT=$(trivy image --severity HIGH,CRITICAL --format json "$IMAGE_NAME" || true)
    VULN_COUNT=$(echo "$SCAN_OUTPUT" | grep -o '"Severity": "HIGH"\|"Severity": "CRITICAL"' | wc -l)
    
    if [ "$VULN_COUNT" -eq 0 ]; then
        echo "No HIGH or CRITICAL vulnerabilities found. Image is clean."
        trivy image --severity HIGH,CRITICAL --format table "$IMAGE_NAME"
        exit 0
    else
        echo "Found $VULN_COUNT HIGH/CRITICAL vulnerabilities."
        if [ "$ATTEMPT" -eq 1 ]; then
            echo "Switching to Dockerfile.secure for remediation..."
            docker build -t "$IMAGE_NAME" -f Dockerfile.secure .
        else
            echo "Vulnerabilities still present after secure build. Manual intervention required."
            trivy image --severity HIGH,CRITICAL --format table "$IMAGE_NAME"
            exit 1
        fi
    fi
    ATTEMPT=$((ATTEMPT+1))
done
