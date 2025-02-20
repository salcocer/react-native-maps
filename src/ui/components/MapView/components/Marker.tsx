import { isEmpty, isUndefined } from 'core/shared/domain/utils'
import { Vehicle } from 'core/Vehicle/domain/Vehicle'

import { Pressable, Image } from 'react-native'
import { Callout, Marker } from 'react-native-maps'
import { styles } from '../MapView.styles'
import { MOTORBIKE, SELECTED_MOTORBIKE } from 'src/assets'
import { forwardRef, MutableRefObject, useImperativeHandle, useState } from 'react'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

interface Props {
    vehicles: Vehicle[],
    deselectVehicle: () => void,
    setIsLoading: (value: boolean) => void,
    selectedVehicle: number | undefined,
    setVehicle: (value: Vehicle) => void
    setSelectedVehicle: (value: number) => void
    bottomSheetRef: MutableRefObject<BottomSheetMethods | null>,
}
export interface VehicleMarkerMethoods {
    disableVehicleFromMap: Function,
    showOnlySelectedVehicle: Function
}


export const VehicleMarker = forwardRef(({
    vehicles,
    deselectVehicle,
    selectedVehicle,
    setIsLoading,
    setVehicle,
    setSelectedVehicle,
    bottomSheetRef
}: Props, ref) => {
    const [showVehicle, setShowVehicle] = useState<number>()
    const [disabledVehicles, setDisabledVehicles] = useState<number[]>([])

    const loadVehicle = (vehicleIndex: number, event: any) => {
        event.stopPropagation()
        if (disabledVehicles.includes(vehicles![vehicleIndex].id)) return

        setIsLoading(true)
        setVehicle(vehicles![vehicleIndex])
        setSelectedVehicle(vehicleIndex)
        setTimeout(() => setIsLoading(false), 400)
    }
    const disableVehicleFromMap = (id: number) => {
        setDisabledVehicles(prev => [...prev, id])
        setShowVehicle(undefined)

        setTimeout(() => {
            setDisabledVehicles(prev => prev.filter((vehicleId) => vehicleId !== id))
        }, 1000 * 60 * 2)
    }
    const showOnlySelectedVehicle = (id: number) => {
        setShowVehicle(id)
    }

    useImperativeHandle(ref, () => ({
        disableVehicleFromMap,
        showOnlySelectedVehicle
    }))

    return (
        <>
            {!isEmpty(vehicles) && !isUndefined(vehicles) && vehicles?.filter((vehicle: Vehicle) => !showVehicle || showVehicle === vehicle.id).map((vehicle: Vehicle, index: number) => {
                // if (disabledVehicle === vehicle.id) return null
                return (<Pressable key={index} onPress={() => {
                    bottomSheetRef?.current?.expand()
                }}>
                    <Marker
                        title={vehicle.customId}
                        onSelect={(event) => loadVehicle(index, event)}
                        onDeselect={deselectVehicle}
                        key={index}
                        coordinate={{ latitude: vehicle.position.lat, longitude: vehicle.position.lng }} >
                        <Image
                            source={selectedVehicle === index || showVehicle === vehicle.id ? SELECTED_MOTORBIKE : MOTORBIKE}
                            style={{ ...styles.markerIcon, opacity: disabledVehicles.includes(vehicle.id) ? 0.4 : 1 }}
                        />
                        <Callout tooltip />
                    </Marker>
                </Pressable>)
            }
            )}
        </>
    )
})
