import { Request, Response, NextFunction } from "express";
import * as carService from "../services/car.service";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

/**
 * Controller to get all cars, optionally filtered by a search query.
 */

export const getCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract optional search query from request
    const search = req.query.search as string | undefined;
    // Call service layer to get all cars (filtered if search is provided)
    const cars = await carService.getAllCars(search);
    // Send success response with retrieved cars
    res.status(200).json(new ApiResponse(true, cars));
  } catch (error) {
    // Pass any errors to the global error handler
    next(error);
  }
};

/**
 * Controller to get a single car by its ID.
 */
export const getCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Fetch the car by ID from the service layer
    const car = await carService.getCarById(req.params.id);
    // If the car doesn't exist, throw a 404 ApiError
    if (!car) {
      throw new ApiError(404, "Car not found");
    }
    // Send success response with the retrieved car
    res.status(200).json(new ApiResponse(true, car));
  } catch (error) {
    // Forward errors to the error-handling middleware
    next(error);
  }
};
