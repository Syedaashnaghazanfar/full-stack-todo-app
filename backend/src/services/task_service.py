from sqlalchemy.orm import Session
from sqlalchemy import desc
from uuid import UUID
from datetime import datetime
from src.models.task import Task
from src.models.task_history import TaskHistory, ActionType

class TaskService:
    """Service for task operations"""
    
    @staticmethod
    def create_task(db: Session, title: str, description: str = None) -> Task:
        """Create a new task"""
        task = Task(title=title, description=description)
        db.add(task)
        db.commit()
        db.refresh(task)
        
        # Log history entry
        TaskService.log_history(db, task.id, ActionType.CREATED, "Task created")
        
        return task
    
    @staticmethod
    def get_all_tasks(db: Session):
        """Get all tasks, ordered with incomplete first"""
        return db.query(Task).order_by(
            Task.is_completed.asc(),
            desc(Task.created_at)
        ).all()
    
    @staticmethod
    def get_task(db: Session, task_id: UUID) -> Task:
        """Get a specific task by ID"""
        return db.query(Task).filter(Task.id == task_id).first()
    
    @staticmethod
    def update_task(db: Session, task_id: UUID, title: str = None, description: str = None) -> Task:
        """Update task title and/or description"""
        task = TaskService.get_task(db, task_id)
        if not task:
            return None
        
        old_title = task.title
        old_desc = task.description
        
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)
        
        # Log history entry
        change_details = []
        if title and title != old_title:
            change_details.append(f"title: '{old_title}' -> '{title}'")
        if description != old_desc:
            change_details.append(f"description updated")
        
        TaskService.log_history(db, task_id, ActionType.UPDATED, "; ".join(change_details))
        
        return task
    
    @staticmethod
    def delete_task(db: Session, task_id: UUID) -> bool:
        """Delete a task"""
        task = TaskService.get_task(db, task_id)
        if not task:
            return False
        
        # Log history entry before deletion
        TaskService.log_history(db, task_id, ActionType.DELETED, f"Task deleted: {task.title}")
        
        db.delete(task)
        db.commit()
        return True
    
    @staticmethod
    def mark_complete(db: Session, task_id: UUID) -> Task:
        """Mark task as completed"""
        task = TaskService.get_task(db, task_id)
        if not task:
            return None
        
        task.is_completed = True
        task.completed_at = datetime.utcnow()
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)
        
        TaskService.log_history(db, task_id, ActionType.COMPLETED, "Task marked as completed")
        
        return task
    
    @staticmethod
    def mark_incomplete(db: Session, task_id: UUID) -> Task:
        """Mark task as incomplete"""
        task = TaskService.get_task(db, task_id)
        if not task:
            return None
        
        task.is_completed = False
        task.completed_at = None
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)
        
        TaskService.log_history(db, task_id, ActionType.INCOMPLETED, "Task marked as incomplete")
        
        return task
    
    @staticmethod
    def log_history(db: Session, task_id: UUID, action: ActionType, description: str = None):
        """Log an action to task history"""
        history = TaskHistory(
            task_id=task_id,
            action_type=action,
            description=description
        )
        db.add(history)
        db.commit()
