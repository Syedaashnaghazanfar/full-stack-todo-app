from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from uuid import UUID
from src.api.dependencies import get_db, get_current_user_id
from src.schemas.history import PaginatedHistoryResponse, HistoryResponse, PaginationMetadata
from src.services.history_service import HistoryService
from src.utils.response import success_response, error_response
from src.utils.validators import validate_pagination

router = APIRouter(prefix="/history", tags=["history"])

@router.get("")
async def get_history(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(None, ge=0),
    task_id: UUID = Query(None),
    action_type: str = Query(None),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Get paginated task history for the authenticated user"""
    if not validate_pagination(page, limit):
        return error_response("limit must be between 1 and 100")

    result = HistoryService.get_history_paginated(db, user_id, page, limit, offset, task_id, action_type)

    history_items = [HistoryResponse.from_orm(h).dict() for h in result["items"]]
    pagination = result["pagination"]

    return success_response({
        "items": history_items,
        "pagination": pagination
    })
