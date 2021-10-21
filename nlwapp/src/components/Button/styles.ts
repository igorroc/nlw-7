import { StyleSheet } from "react-native"
import { FONTS } from "../../theme"

export const styles = StyleSheet.create({
	title: {
		fontSize: 14,
		fontFamily: FONTS.BOLD,
		textTransform: "uppercase",
	},
	button: {
		width: "100%",
		height: 48,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		marginRight: 12,
	},
})
