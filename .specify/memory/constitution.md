<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles: None
Added sections: VII. Version Control and Repository Management (new principle)
Removed sections: None
Templates requiring updates:
  - ✅ .specify/memory/constitution.md (updated)
  - No other template updates required for this amendment
Follow-up TODOs: None
-->
# Todo In-Memory Python Console Application Constitution

## Core Principles

### I. In-Memory Data Storage
All application data must be stored exclusively in program memory (RAM) with no file persistence or database dependencies. The application must restart with a clean empty state on each execution. This ensures simplicity and avoids complex persistence mechanisms during Phase I development.

### II. CLI-First Interface
Every feature must be accessible through command-line interface commands. The application follows text in/out protocol: stdin/args → stdout, errors → stderr. Support both human-readable and structured formats for all operations.

### III. Test-First Development (NON-NEGOTIABLE)
Test-driven development is mandatory: Tests written → User approved → Tests fail → Then implement. The Red-Green-Refactor cycle must be strictly enforced with 100% feature test coverage for Phase I features.

### IV. Type Safety and Code Quality
All code must include type hints and comply with PEP8 standards. Each module must follow single responsibility principle with clean architecture patterns. No global mutable state is permitted in the application.

### V. Minimalist Feature Scope
Implementation is strictly limited to the 5 Basic CRUD-style features: Add Task, View/List Tasks, Update Task, Delete Task, Mark Task Complete/Incomplete. No additional features or complexity beyond Phase I requirements.

### VI. Dependency Management with UV
All dependencies must be managed using UV package manager with Python 3.13+ as the minimum required version. Rich library must be used for colorful CLI output and user experience enhancement.

### VII. Version Control and Repository Management
All code changes must be committed to the official project repository at https://github.com/Syedaashnaghazanfar/hackathon-2-specskit. When users request to upload or commit changes, the agent MUST use Git to commit all modifications with descriptive commit messages following conventional commit format. All commits must include co-authorship attribution for AI-assisted development. Pull requests should be created using the GitHub CLI (gh) when deployment or review is requested.

## Functional Rules

Every task must have:
- Unique ID (auto-generated)
- Title (required)
- Description (optional)
- Status (complete/incomplete)

All operations must be accessible via CLI commands:
- `add` - Add a new task
- `list` - View all tasks
- `update` - Modify an existing task
- `delete` - Remove a task
- `complete` - Mark task as complete/incomplete

The application must maintain all data in memory only and never persist to files or databases.

## Technology Constraints

- Python 3.13+ required as minimum version
- UV package manager for dependency management
- Rich library for CLI output formatting
- Pytest for unit testing framework
- PEP8 compliance for code formatting
- Type hints required for all functions and methods
- Git for version control
- GitHub as the remote repository host

## Acceptance Criteria

### Add Task
- Command: `python todo.py add --title "Task Title" --description "Optional description"`
- Expected behavior: Creates new task with unique ID and incomplete status
- Expected in-memory state: Task list contains new task with auto-generated ID
- Failure conditions: Title is required; invalid input should return error message

### List Tasks
- Command: `python todo.py list`
- Expected behavior: Displays all tasks with ID, title, status, and description
- Expected in-memory state: Unchanged task list
- Failure conditions: None; should handle empty list gracefully

### Update Task
- Command: `python todo.py update --id <task_id> --title "New Title" --description "New description"`
- Expected behavior: Modifies existing task fields
- Expected in-memory state: Task updated with new values
- Failure conditions: Task ID must exist; invalid ID should return error

### Delete Task
- Command: `python todo.py delete --id <task_id>`
- Expected behavior: Removes task from in-memory storage
- Expected in-memory state: Task removed from list
- Failure conditions: Task ID must exist; invalid ID should return error

### Mark Complete/Incomplete
- Command: `python todo.py complete --id <task_id> --status [complete|incomplete]`
- Expected behavior: Updates task completion status
- Expected in-memory state: Task status updated in memory
- Failure conditions: Task ID must exist; invalid ID should return error

## Repository Structure Requirements

- `/src` directory for source code
- `/specs` directory for all specification history
- `README.md` for setup instructions
- `CLAUDE.md` for Claude Code usage rules
- Constitution file at `.specify/memory/constitution.md`
- All Phase I features must be implemented in this structure
- `.gitignore` for Python-specific exclusions
- `pyproject.toml` for dependency management

## Testing & Quality Gates

- 100% feature test coverage required for Phase I features
- CLI behavior tests must validate all commands
- In-memory state validation tests required
- No merge allowed if tests fail
- Unit tests must cover all functions and methods
- Integration tests for CLI command execution

## Development Workflow

- All code changes must follow Spec-Driven Development principles
- Each feature must have corresponding specification in `/specs`
- Pull requests require passing all tests before approval
- Code reviews must verify compliance with all constitution principles
- Automated checks enforce PEP8 compliance and type hint requirements
- All commits must follow conventional commit message format
- AI-assisted commits must include co-authorship attribution

## Version Control Standards

- Repository: https://github.com/Syedaashnaghazanfar/hackathon-2-specskit
- Branch naming: Feature branches should be descriptive (e.g., `feature/add-task`, `fix/validation-bug`)
- Commit messages: Follow conventional commits (e.g., `feat: add task creation`, `fix: resolve validation error`)
- Co-authorship: All AI-assisted commits must include:
  ```
  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```
- Pull requests: Use GitHub CLI (`gh pr create`) with descriptive titles and bodies
- Never force push to main/master branches
- All commits must be signed and verified when possible

## Governance

This constitution supersedes all other development practices and standards. All amendments must be documented with clear justification and approval process. All pull requests and code reviews must verify compliance with these principles. Code complexity must be justified against these foundational requirements.

### Amendment Process
- Constitution changes require explicit user approval
- All amendments must update the version number following semantic versioning
- Sync Impact Reports must be generated for every amendment
- Dependent templates and documentation must be updated to maintain consistency

### Version History
- **1.0.0** (2025-12-06): Initial constitution ratified with 6 core principles
- **1.1.0** (2025-12-06): Added Principle VII (Version Control and Repository Management) and Version Control Standards section

**Version**: 1.1.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
