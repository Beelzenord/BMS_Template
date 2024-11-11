import { BaseError } from "./base-error";

export class InvalidInputValuesError extends Error {
  public readonly timestamp: Date;
  public readonly query: string | undefined;

  constructor(message: string = "Database connection error") {
    super(message);
    this.timestamp = new Date();
    Object.setPrototypeOf(this, InvalidInputValuesError.prototype);
  }
}
  
  