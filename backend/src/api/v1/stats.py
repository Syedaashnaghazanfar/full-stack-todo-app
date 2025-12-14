from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.api.dependencies import get_db
from src.services.history_service import HistoryService
from src.utils.response import success_response

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/weekly")
async def get_weekly_stats(db: Session = Depends(get_db)):
    """Get weekly task statistics"""
    stats = HistoryService.get_weekly_stats(db)
    
    return success_response({
        "tasks_created_this_week": stats["tasks_created_this_week"],
        "tasks_completed_this_week": stats["tasks_completed_this_week"],
        "total_completed": stats["total_completed"],
        "total_incomplete": stats["total_incomplete"],
        "week_start": stats["week_start"].isoformat() + "Z",
        "week_end": stats["week_end"].isoformat() + "Z",
        "total_tasks": stats["total_tasks"]
    })
