from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from src.database.base import Base
from datetime import datetime
import uuid
import enum

class ActionType(str, enum.Enum):
    CREATED = "CREATED"
    UPDATED = "UPDATED"
    DELETED = "DELETED"
    COMPLETED = "COMPLETED"
    INCOMPLETED = "INCOMPLETED"

class TaskHistory(Base):
    __tablename__ = "task_history"

    history_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    task_id = Column(UUID(as_uuid=True), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    action_type = Column(Enum(ActionType), nullable=False)
    description = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (
        CheckConstraint(
            "action_type IN ('CREATED', 'UPDATED', 'DELETED', 'COMPLETED', 'INCOMPLETED')",
            name='history_valid_action_type'
        ),
    )

    def __repr__(self):
        return f"<TaskHistory(history_id={self.history_id}, task_id={self.task_id}, action={self.action_type})>"
