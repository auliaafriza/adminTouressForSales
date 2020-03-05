import EStyleSheet from "react-native-extended-stylesheet";
import { Platform } from "react-native";

export default EStyleSheet.create({
  $goldcolor: "$gold",
  container: {
    paddingTop: 30,
    width: "60%"
  },
  imageNoPackages: {
    height: "100%",
    width: "90%"
  },
  containerImageNoPackages: {
    marginTop: Platform.OS === "ios" ? 20 : 40,
    width: "100%",
    height: 150
  },
  heightWidth: { width: "100%", height: "100%" },
  content1: {
    alignItems: "center",
    width: "100%"
  },
  containerAuth: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerScroll: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  containerImage: {
    height: 250,
    width: "100%",
    overflow: "hidden"
  },
  imageBanner: {
    width: "100%",
    height: 250
  },
  overlayGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 50
  },
  containerTitle: {
    position: "absolute",
    // top: 80,
    left: 0,
    right: 0,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 10
  },
  textTitile: {
    fontSize: 18.3,
    fontWeight: "bold",
    color: "#252525"
  },
  containerSubTitle: {
    flexDirection: "row",
    marginTop: 30
  },
  col50: {
    width: "50%"
  },
  paddingRight40: {
    paddingRight: 40
  },
  paddingRight30: {
    paddingRight: 30
  },
  text14Bold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#252525"
  },
  text16Bold: {
    fontSize: 16,
    fontWeight: "600",
    color: "#252525"
  },
  paddingLeft20: {
    paddingLeft: 20
  },
  paddingLeft15: {
    paddingLeft: 15
  },
  paddingTop20: {
    paddingTop: 20
  },
  alignSelfLeft: {
    alignSelf: "flex-start"
  },
  row100: {
    width: "100%",
    flexDirection: "row"
  },
  marginBottom20: {
    marginBottom: 20
  },
  containerIcon: {
    width: "33%",
    justifyContent: "center",
    alignSelf: "center"
  },
  paddingHorizontal20: {
    paddingHorizontal: 20
  },
  alignItemsEnd: {
    alignItems: "flex-end"
  },
  text16Blue: {
    fontSize: 16,
    color: "#6b82e6"
  },
  row: {
    flexDirection: "row",
    flex: 1
  }
});
