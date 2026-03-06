import { Request, Response, NextFunction } from "express";
import * as carService from "../services/car.service";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

export const getCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const search = req.query.search as string | undefined;

    const cars = await carService.getAllCars(search);

    res.status(200).json(new ApiResponse(true, cars));
  } catch (error) {
    next(error);
  }
};

export const getCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // In production, I would validate search and id inputs using a library like Zod or Joi
    // This ensures requests are always safe and properly formatted
    const car = await carService.getCarById(req.params.id);

    if (!car) {
      throw new ApiError(404, "Car not found");
    }

    res.status(200).json(new ApiResponse(true, car));
  } catch (error) {
    next(error);
  }
};
