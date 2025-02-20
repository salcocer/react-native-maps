import { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Alert,
	Image,
	Pressable,
	ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { UBER_LOGO, SPORT_CAR } from "../../../assets";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { inject } from "_di/container";
import { useQueryService } from "ui/_hooks/useService";
import { Vehicle } from "core/Vehicle/domain/Vehicle";
import { styles } from "./MapView.styles";
import { VehicleMarkerMethoods, VehicleMarker } from "./components/Marker";
import { isDefined, isUndefined } from "core/shared/domain/utils";

export const Map = () => {
	const vehicleUseCase = inject("vehicleUseCase");

	const mapRef = useRef<MapView>(null);
	const [location, setLocation] = useState<Location.LocationObject>();
	const [selectedVehicle, setSelectedVehicle] = useState<number>();
	const [vehicle, setVehicle] = useState<Vehicle>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPressed, setIsPressed] = useState<boolean>(false);
	const [bookedVehicle, setBookedVehicle] = useState<number>();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const markerRef = useRef<VehicleMarkerMethoods>(null);

	const { data: vehicles } = useQueryService<Vehicle[]>(
		"vehicles",
		[],
		() => vehicleUseCase.all(),
		{
			refetchInterval: isUndefined(bookedVehicle) ? 30_000 : undefined,
		},
	);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	useEffect(() => {
		try {
			bottomSheetRef?.current?.expand();
			if (location && mapRef.current) {
				const onCurrentMarkerRegion = mapRef.current as MapView;
				onCurrentMarkerRegion.animateToRegion({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				});
			}
		} catch (error: any) {
			console.log(`Error: ${error.message}`);
		}
	}, [location]);

	const deselectVehicle = () => {
		setVehicle(undefined);
		setSelectedVehicle(-1);
	};
	const pressToTrue = () => setIsPressed(true);
	const pressToFalse = () => setIsPressed(false);
	const onBookingVehicle = () => {
		setBookedVehicle(vehicle?.id);
		markerRef?.current?.showOnlySelectedVehicle(vehicle?.id);
	};
	const onFinishBookingVehicle = () => {
		deselectVehicle();
		setBookedVehicle(undefined);
		markerRef?.current?.disableVehicleFromMap(vehicle?.id);
	};

	return (
		<View style={styles.container}>
			<View>
				<MapView
					ref={mapRef}
					style={styles.map}
					showsUserLocation
					initialRegion={{
						latitude: 0,
						longitude: 0,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					{vehicles && (
						<VehicleMarker
							ref={markerRef}
							vehicles={vehicles}
							deselectVehicle={deselectVehicle}
							selectedVehicle={selectedVehicle}
							setIsLoading={setIsLoading}
							setVehicle={setVehicle}
							setSelectedVehicle={setSelectedVehicle}
							bottomSheetRef={bottomSheetRef}
						/>
					)}
				</MapView>
			</View>

			<BottomSheet
				style={styles.containerBottomSheet}
				ref={bottomSheetRef}
				enableDynamicSizing
				animateOnMount
			>
				<BottomSheetScrollView alwaysBounceVertical={false}>
					<View style={styles.contentBottomSheet}>
						{isLoading && <ActivityIndicator />}
						<View style={styles.maxWidth}>
							{!vehicle && (
								<View style={styles.brandImageContainer}>
									<Image source={UBER_LOGO} style={styles.brandImage} />
								</View>
							)}
							{vehicle && (
								<View style={styles.SPORT_CARImageContainer}>
									<Image source={SPORT_CAR} style={styles.SPORT_CARImage} />
								</View>
							)}
						</View>
						{vehicle && !isLoading && (
							<>
								<Text style={{ fontWeight: "bold", fontSize: 21 }}>
									{vehicle.customId}
								</Text>
								<Text>
									<Text style={{ fontWeight: "bold" }}>Modelo:</Text>{" "}
									{vehicle.model}
								</Text>
								<Text>
									<Text style={{ fontWeight: "bold" }}>Matrícula:</Text>{" "}
									{vehicle.id}
								</Text>

								<View style={{ width: "100%", height: 35 }}>
									{isDefined(bookedVehicle) && (
										<Text>
											<Text style={{ fontWeight: "bold" }}>Hora Reserva:</Text>{" "}
											{new Date().getHours()}:{new Date().getMinutes()}
										</Text>
									)}
								</View>

								<Pressable
									onPressIn={pressToTrue}
									onPressOut={pressToFalse}
									onPress={
										isUndefined(bookedVehicle)
											? onBookingVehicle
											: onFinishBookingVehicle
									}
									style={[styles.button, { opacity: isPressed ? 0.5 : 1 }]}
								>
									<Text style={styles.buttonText}>
										{" "}
										{isUndefined(bookedVehicle)
											? "Reservar"
											: "Finalizar Reserva"}
									</Text>
								</Pressable>
							</>
						)}
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
};
