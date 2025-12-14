from sqlalchemy.orm import Session
from sqlalchemy import desc
from uuid import UUID
from datetime import datetime
from src.models.task_history import TaskHistory, ActionType
from src.utils.timestamps import get_week_boundaries

class HistoryService:
    """Service for history and analytics operations"""
    
    @staticmethod
    def get_history_paginated(db: Session, page: int = 1, limit: int = 10, offset: int = None, task_id: UUID = None, action_type: str = None):
        """Get paginated history with filtering"""
        query = db.query(TaskHistory).order_by(desc(TaskHistory.timestamp))
        
        if task_id:
            query = query.filter(TaskHistory.task_id == task_id)
        
        if action_type:
            query = query.filter(TaskHistory.action_type == action_type)
        
        total_count = query.count()
        
        # Handle pagination
        if offset is not None:
            items = query.offset(offset).limit(limit).all()
            current_page = (offset // limit) + 1
        else:
            items = query.offset((page - 1) * limit).limit(limit).all()
            current_page = page
        
        total_pages = (total_count + limit - 1) // limit
        
        return {
            "items": items,
            "pagination": {
                "total_count": total_count,
                "total_pages": total_pages,
                "current_page": current_page,
                "page_size": limit,
                "has_next": current_page < total_pages,
                "has_prev": current_page > 1
            }
        }
    
    @staticmethod
    def get_weekly_stats(db: Session):
        """Get weekly and overall statistics"""
        from src.models.task import Task
        
        week_start, week_end = get_week_boundaries()
        
        # Total statistics
        total_tasks = db.query(Task).count()
        total_completed = db.query(Task).filter(Task.is_completed == True).count()
        total_incomplete = db.query(Task).filter(Task.is_completed == False).count()
        
        # Weekly statistics
        tasks_created_this_week = db.query(Task).filter(
            Task.created_at >= week_start,
            Task.created_at <= week_end
        ).count()
        
        tasks_completed_this_week = db.query(Task).filter(
            Task.completed_at >= week_start,
            Task.completed_at <= week_end
        ).count()
        
        return {
            "tasks_created_this_week": tasks_created_this_week,
            "tasks_completed_this_week": tasks_completed_this_week,
            "total_completed": total_completed,
            "total_incomplete": total_incomplete,
            "week_start": week_start,
            "week_end": week_end,
            "total_tasks": total_tasks
        }
