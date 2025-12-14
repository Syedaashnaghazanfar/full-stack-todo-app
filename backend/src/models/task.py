from sqlalchemy import Column, String, Text, Boolean, DateTime, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from src.database.base import Base
from datetime import datetime
import uuid

class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    is_completed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)

    __table_args__ = (
        CheckConstraint('length(trim(title)) > 0', name='task_title_not_empty'),
        CheckConstraint('length(description) <= 5000', name='task_description_max_length'),
        CheckConstraint(
            '(is_completed = true AND completed_at IS NOT NULL) OR (is_completed = false AND completed_at IS NULL)',
            name='task_completed_at_consistency'
        ),
    )

    def __repr__(self):
        return f"<Task(id={self.id}, title={self.title}, is_completed={self.is_completed})>"
