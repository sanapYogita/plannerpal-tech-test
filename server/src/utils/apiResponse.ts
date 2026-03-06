/**
 * Generic API response constructor.
 *
 * @param success - Boolean flag indicating success or failure
 * @param data - Optional data returned by the API
 * @param message - Optional message describing the response
 */

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;

  constructor(success: boolean, data?: T, message?: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
