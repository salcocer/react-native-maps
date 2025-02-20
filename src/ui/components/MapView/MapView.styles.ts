import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		zIndex: 9,
	},
	maxWidth: { width: "100%" },
	map: {
		width: "100%",
		height: "100%",
	},
	containerBottomSheet: {
		width: "94%",
		marginLeft: "3%",
		borderRadius: 30,
		overflow: "hidden",
		backgroundColor: "red",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
	},
	contentBottomSheet: {
		padding: 24,
		paddingBottom: 30,
	},
	markerIcon: { width: 38, height: 38 },
	SPORT_CARImageContainer: {
		position: "absolute",
		right: 0,
		top: -40,
		height: "100%",
	},
	SPORT_CARImage: {
		height: 120,
		width: 100,
		objectFit: "contain",
		position: "relative",
		left: 0,
		top: 0,
	},
	brandImageContainer: {
		position: "absolute",
		right: 0,
		top: -20,
	},
	brandImage: {
		height: 40,
		width: 70,
		objectFit: "contain",
		position: "relative",
		right: 0,
		top: -10,
	},
	button: {
		backgroundColor: "red",
		borderRadius: 100,
		paddingVertical: 15,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},
});
