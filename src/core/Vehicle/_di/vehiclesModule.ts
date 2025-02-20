import { asFunction } from "_di/resolvers"
import { VehicleRepository } from "core/Vehicle/domain/VehicleRepository"
import { vehicleUseCase, VehicleUseCase } from "core/Vehicle/useCase/vehicleUseCase"
import { apiVehicleRepository } from "core/Vehicle/infrastructure/apiVehicleRepository"


export const vehicleModule = {
  vehicleRepository: asFunction<VehicleRepository>(apiVehicleRepository),
  vehicleUseCase: asFunction<VehicleUseCase>(vehicleUseCase)
}
