
import { Vehicle, VehicleDTO } from 'core/Vehicle//domain/Vehicle'
import { Deserializer } from 'core/shared/domain/Serialization'
import { removeNullFields } from 'core/shared/infrastructure/Serialization/_utils/removeNullableEntries'

export const vehiclesSerializer: Deserializer<Vehicle[], VehicleDTO[]> = {
  parse: (data: VehicleDTO[]) => data.map(vehicles => vehicleSerializer.parse(vehicles))
}

export const vehicleSerializer: Deserializer<Vehicle, VehicleDTO> = {
  parse: (data: VehicleDTO) => {
    const vehicle = removeNullFields(data)

    return {
      id: vehicle.id,
      customId: vehicle.customId,
      batteryLevel: vehicle.batteryLevel,
      autonomy: vehicle.autonomy,
      position: vehicle.position
    }
  }
}

