from fastapi import Request, status
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)


async def global_exception_handler(request: Request, exc: Exception):

    logger.error(f"Global error on {request.method} {request.url.path}: {exc}")

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "An unexpected internal server error occurred.",
            "path": str(request.url.path),
        },
    )
