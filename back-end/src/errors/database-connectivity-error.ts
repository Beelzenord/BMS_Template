import { BaseError } from "./base-error";

export class DatabaseConnectionError extends BaseError {
    statusCode = 500;
    reason = 'Error connecting to database';
   
    constructor() {
      super("reason","500",500);
    
      Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
  }
  
  