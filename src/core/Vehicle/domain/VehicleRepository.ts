import { Vehicle } from 'core/Vehicle/domain/Vehicle'

export interface VehicleRepository {
  all: () => Promise<Vehicle[]>
}
