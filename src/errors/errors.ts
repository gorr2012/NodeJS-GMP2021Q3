export class CustomError extends Error {
  statusCode: number;
  constructor(message = 'Unknown error', status = 500) {
    super(message);
    this.statusCode = status;
    this.message = message;
  }
}

export class UserNotFoundError extends CustomError {
  constructor(id: string) {
    super(`User with id ${id} not found`, 404);
    this.name = 'UserNotFoundError';
  }
}

export class GroupNotFoundError extends CustomError {
  constructor(id: string) {
    super(`Group with id ${id} not found`, 404);
    this.name = 'GroupNotFoundError';
  }
}

export class UnauthorizedError extends CustomError {
  constructor() {
    super(`UnauthorizedError`, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends CustomError {
  constructor() {
    super('Unauthorized Failed', 403);
    this.name = 'UnauthorizedError';
  }
}
