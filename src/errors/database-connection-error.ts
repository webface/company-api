import { CustomError } from './custom-error';

export class DatabaseConnectError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 500;
  constructor() {
    super('Error connecting to db');

    // only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
