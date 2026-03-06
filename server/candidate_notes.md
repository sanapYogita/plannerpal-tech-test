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

