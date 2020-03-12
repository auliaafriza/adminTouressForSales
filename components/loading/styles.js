import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const cardWidth = Dimensions.get("window").width;
const cardHeight = Dimensions.get("window").height;

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: cardWidth,
    height: cardHeight,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "$coloroverlay",
    zIndex: 2,
    top: 30
  },
  loadingCardSlider: {
    marginRight: 10,
    borderRadius: 10
  },
  loadingCardMenu: {
    borderRadius: 30,
    marginBottom: 20
  },
  textLoading: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20
  },
  loading: {
    borderRadius: 10
  }
});
