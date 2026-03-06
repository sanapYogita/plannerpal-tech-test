import { DB } from "../db/db";

export const getAllCars = async (search?: string) => {
  return DB.getAllCars(search);
};

export const getCarById = async (id: string) => {
  return DB.getCarById(id);
};