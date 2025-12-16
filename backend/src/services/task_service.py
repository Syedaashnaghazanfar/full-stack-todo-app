from sqlalchemy.orm import Session
from sqlalchemy import desc
from uuid import UUID
from datetime import datetime
from fastapi import HTTPException, status
from src.models.task import Task
from src.models.task_history import TaskHistory, ActionType

class TaskService:
    """Service for task operations with user isolation"""

    @staticmethod
    def create_task(db: Session, title: str, description: str = None, user_id: str = None) -> Task:
        """
        Create a new task for the authenticated user.

        Args:
            db: Database session
            title: Task title
            description: Task description (optional)
            user_id: User UUID who owns this task

        Returns:
            Created task instance
        """
        task = Task(title=title, description=description, user_id=user_id)
        db.add(task)
        db.commit()
        db.refresh(task)

        # Log history entry with user_id
        TaskService.log_history(db, task.id, ActionType.CREATED, "Task created", user_id)

        return task

    @staticmethod
    def get_all_tasks(db: Session, user_id: str):
        """
        Get all tasks for a specific user, ordered with incomplete first.

        Args:
            db: Database session
            user_id: User UUID to filter tasks

        Returns:
            List of tasks owned by the user
        """
        return db.query(Task).filter(
            Task.user_id == user_id
        ).order_by(
            Task.is_completed.asc(),
            desc(Task.created_at)
        ).all()

    @staticmethod
    def get_task(db: Session, task_id: UUID, user_id: str) -> Task:
        """
        Get a specific task by ID, verifying user ownership.

        Args:
            db: Database session
            task_id: Task UUID
            user_id: User UUID to verify ownership

        Returns:
            Task instance if found and owned by user

        Raises:
            HTTPException 403: If task exists but belongs to different user
            HTTPException 404: If task does not exist
        """
        task = db.query(Task).filter(Task.id == task_id).first()

        if not task:
            return None

        # Verify ownership
        if task.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access forbidden: You do not have permission to access this task"
            )

        return task

    @staticmethod
    def update_task(db: Session, task_id: UUID, title: str = None, description: str = None, user_id: str = None) -> Task:
        """
        Update task title and/or description, verifying user ownership.

        Args:
            db: Database session
            task_id: Task UUID
            title: New title (optional)
            description: New description (optional)
            user_id: User UUID to verify ownership

        Returns:
            Updated task instance

        Raises:
            HTTPException 403: If task belongs to different user
        """
        task = TaskService.get_task(db, task_id, user_id)
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

        TaskService.log_history(db, task_id, ActionType.UPDATED, "; ".join(change_details), user_id)

        return task

    @staticmethod
    def delete_task(db: Session, task_id: UUID, user_id: str) -> bool:
        """
        Delete a task, verifying user ownership.

        Args:
            db: Database session
            task_id: Task UUID
            user_id: User UUID to verify ownership

        Returns:
            True if deleted successfully

        Raises:
            HTTPException 403: If task belongs to different user
        """
        task = TaskService.get_task(db, task_id, user_id)
        if not task:
            return False

        # Log history entry before deletion
        TaskService.log_history(db, task_id, ActionType.DELETED, f"Task deleted: {task.title}", user_id)

        db.delete(task)
        db.commit()
        return True

    @staticmethod
    def mark_complete(db: Session, task_id: UUID, user_id: str) -> Task:
        """
        Mark task as completed, verifying user ownership.

        Args:
            db: Database session
            task_id: Task UUID
            user_id: User UUID to verify ownership

        Returns:
            Updated task instance

        Raises:
            HTTPException 403: If task belongs to different user
        """
        task = TaskService.get_task(db, task_id, user_id)
        if not task:
            return None

        task.is_completed = True
        task.completed_at = datetime.utcnow()
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)

        TaskService.log_history(db, task_id, ActionType.COMPLETED, "Task marked as completed", user_id)

        return task

    @staticmethod
    def mark_incomplete(db: Session, task_id: UUID, user_id: str) -> Task:
        """
        Mark task as incomplete, verifying user ownership.

        Args:
            db: Database session
            task_id: Task UUID
            user_id: User UUID to verify ownership

        Returns:
            Updated task instance

        Raises:
            HTTPException 403: If task belongs to different user
        """
        task = TaskService.get_task(db, task_id, user_id)
        if not task:
            return None

        task.is_completed = False
        task.completed_at = None
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)

        TaskService.log_history(db, task_id, ActionType.INCOMPLETED, "Task marked as incomplete", user_id)

        return task

    @staticmethod
    def log_history(db: Session, task_id: UUID, action: ActionType, description: str = None, user_id: str = None):
        """
        Log an action to task history with user tracking.

        Args:
            db: Database session
            task_id: Task UUID
            action: Action type enum
            description: Description of the action
            user_id: User UUID who performed the action
        """
        history = TaskHistory(
            task_id=task_id,
            action_type=action,
            description=description,
            user_id=user_id
        )
        db.add(history)
        db.commit()
