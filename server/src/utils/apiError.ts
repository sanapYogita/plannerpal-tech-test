export class ApiError extends Error {
  statusCode: number; // HTTP status code associated with the error
  /**
   * Custom API error constructor.
   *
   * @param statusCode - HTTP status code (e.g., 404, 500)
   * @param message - Error message to return to the client
   */
  
  constructor(statusCode: number, message: string) {
    super(message); // Call the base Error constructor with the message
    this.statusCode = statusCode; // Set the HTTP status code
  }
}
