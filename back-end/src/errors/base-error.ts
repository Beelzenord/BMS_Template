import { DatabaseConnectionError } from "./database-connectivity-error"
import { InvalidInputValuesError } from "./invalid-input-error"
class BaseError extends Error {
    constructor(
      public message: string
    ) {
      super(message)
      this.name = this.constructor.name
      Error.captureStackTrace(this, this.constructor)
    }
  }

  export {BaseError,DatabaseConnectionError,InvalidInputValuesError}