from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, Cookie, status
from typing import Optional
from jose import JWTError
from src.database.connection import SessionLocal
from src.utils.jwt import decode_token


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user_id(auth_token: Optional[str] = Cookie(None)) -> str:
    """
    Extract user_id from JWT auth_token cookie.

    Args:
        auth_token: JWT token from Cookie header

    Returns:
        user_id: User UUID as string

    Raises:
        HTTPException 401: If token is missing, invalid, or expired

    Cache Behavior:
        - Uses JWT caching from decode_token (5-minute TTL)
        - Cache hit: <5ms response time
        - Cache miss: ~40ms for JWT validation
    """
    if not auth_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please login to access this resource."
        )

    try:
        # decode_token already implements caching with 5-minute TTL
        # It will raise JWTError if token is invalid, expired, or malformed
        payload = decode_token(auth_token, use_cache=True)
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user identifier"
            )

        return user_id

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}"
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {str(e)}"
        )
