# Input validation

Right now, search query and :id params are lightly typed, but not strictly validated.
Suggestion: use Zod or Joi to validate incoming requests.
Example: ensure :id is a UUID or alphanumeric string.
Ensure search is a string and optional.
Benefit: prevents invalid data from reaching business logic, safer API.

# Logging

Currently errors are sent to the client but not logged anywhere.
Suggestion: Logger
Errors (including DB errors)
Request info (method, path, query)
Benefit: easier debugging, monitoring, and production observability.

# Testing
Tech test doesn't include automated tests.
Suggestion: add unit tests for getAllCars and getCarById functions, and integration tests for /api/cars endpoints using Jest or Vitest + Supertest.
Benefit: ensures API works as expected and prevents regressions.

# Caching (future improvement)
If getAllCars becomes heavy with many records, responses can be cached in Redis.
Benefit: improves performance for frequent requests.

# Rate limiting & security
Suggestion: use express-rate-limit and helmet for production APIs.
Benefit: protects API from abuse or common attacks.

# Pagination for /api/cars

Currently, all cars are returned at once.
Suggestion: add query params like ?page=1&limit=10.
Benefit: prevents sending huge payloads and improves performance.

# I can see some vulnerabilities 
When I used command npm audit I can see Vulnerabiltities which mush be removed.

# any type in db.ts

export interface Car {
  make: string;
  model: string;
  age: number;
  mileage: number;
  colour: string;
  description: string;
  cost: number;
  fuelType: "petrol" | "diesel";
  damage: string | null;
}

in db.ts for const cars: any = I would prefer  "Record<string, Car>"
 Incode - getCarById: async (id: string): Promise<any> 
suggestion - another getCarById: async (id: string): Promise<Car | null>

suggestion -getAllCars: async (search?: string): Promise<Car[]>

# Use Authentication
Implement JWT-based authentication for your API.
Users log in and receive a JWT token.
Every request to a protected route must include the token in the Authorization header (Bearer <token>).
Middleware verifies the token and attaches the user info (like id and role) to req.user.

# Use Authorization
Check user roles or permissions before allowing access to certain routes.
For example, only users with the admin role can add, update, or delete cars.
Middleware reads req.user.role and denies access if the role is insufficient.

# Protecting Routes

Public routes: e.g., viewing cars (getCars, getCar) could require authentication but allow all users.
Restricted routes: e.g., adding, updating, deleting cars should require both authentication and admin authorization. However these api not added in test it is just suggestion

# Security Best Practices

Use strong, secret keys for JWT (JWT_SECRET) and store them in environment variables.
Set token expiration times to limit risk if a token leaks.
Hash user passwords (bcrypt) if you implement login, however login is not included in thi test (suggestion).


# Error messages
1. Car Not Found
When: The requested car ID does not exist in the database.
Controller: getCar
Error: ApiError thrown in controller
Status Code: 404 Not Found
Message: "Car not found"
2. Database / Service Failure
When: carService.getAllCars or carService.getCarById throws an error (e.g., DB connection failed).
Controller: getCars or getCar
Status Code: 500 Internal Server Error
Message: "Internal Server Error" (or more detailed like "Failed to fetch cars" if needed)
3. Invalid ID Format
When: The req.params.id is invalid (e.g., not a string or wrong format)
Controller: getCar
Status Code: 400 Bad Request
Message: "Invalid car ID"
Optional validation can be added using a library like Zod or Joi.
4. Invalid Query Parameter
When: The search query parameter is invalid (e.g., not a string or too long)
Controller: getCars
Status Code: 400 Bad Request
Message: "Invalid search parameter"
5. Unauthorized / Forbidden Access
When: You protect your routes with authentication/authorization middleware (future enhancement).
Controller: Both getCars and getCar
Status Code:
401 Unauthorized → if no token or invalid token
403 Forbidden → if user is authenticated but does not have permission
Message: "Unauthorized" or "Forbidden"