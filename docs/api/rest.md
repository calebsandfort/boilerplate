# REST API Endpoints

This document describes the REST API endpoints available in the backend.

## Health Check

### GET /health

Returns the health status of the backend service.

**URL**: `http://localhost:8000/health`

**Response**:
```json
{
  "status": "ok"
}
```

**File**: `backend/src/api/health.py`

## Next Steps

- [CopilotKit Integration](./copilotkit.md) - AI chat endpoints
- [Database Schema](./database.md) - Drizzle schema reference
