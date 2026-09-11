import time
from fastapi import Request


async def log_request_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.2f}"
    print(f"[{request.method}] {request.url.path} - Finished in {process_time:.2f}ms")

    return response
