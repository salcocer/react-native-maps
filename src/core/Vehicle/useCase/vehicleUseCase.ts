import { Vehicle } from "core/Vehicle/domain/Vehicle"
import { VehicleRepository } from "core/Vehicle/domain/VehicleRepository"

export interface VehicleUseCase {
  all: () => Promise<Vehicle[]>
}

export const vehicleUseCase = ({ vehicleRepository }: { vehicleRepository: VehicleRepository }): VehicleUseCase => ({
  all: () => vehicleRepository.all()
})
