// export const getAllCars = async (dbCars: any, search: any) => {
//     // TODO
//     console.log(dbCars);
//     return []
//   }

import {Car} from "./types/types"

export const getAllCars = async (
  dbCars: Record<string, Car>,
  search?: string
): Promise<Car[]> => {

  const carsArray = Object.values(dbCars)

  if (!search) {
    return carsArray
  }

  const searchLower = search.toLowerCase()

  return carsArray.filter((car) =>
    car.make.toLowerCase().includes(searchLower) ||
    car.model.toLowerCase().includes(searchLower)
  )
}