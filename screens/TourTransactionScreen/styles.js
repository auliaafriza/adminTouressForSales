import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const fullWidth = Dimensions.get("window").width * 0.85;

export default EStyleSheet.create({
  $goldcolor: "$gold",
  zIndex0: { zIndex: 0 },
  colorblacklight: { color: "$blacklight" },
  $blacklight2color: "$blacklight2",
  $whitelightcolor: "$whitelight",
  $cardoverlayColor: "$cardoverlay",
  $redcolor: "$red",
  paddingLeft8: { paddingLeft: 8 },
  marginBottom5: { marginBottom: 5 },
  marginTop70: { marginTop: 70 },
  paddingTop30: { paddingTop: 30 },
  paddingTop20: { paddingTop: 20 },
  $greylight2color: "$greylight2",
  marginBottom100: {
    marginBottom: 100
  },
  backgroundWaring: { backgroundColor: "$cardoverlay" },
  marginBottom10: { marginBottom: 10 },
  marginBottom30: { marginBottom: 30 },
  marginBottom20: { marginBottom: 20 },
  paddingBottom20: { paddingBottom: 20 },
  paddingLeft20: { paddingLeft: 20 },
  marginTop5: { marginTop: 5 },
  heightCommission: {
    height: 50,
    paddingTop: 0
  },
  colorgreylight2: { color: "$greylight2" },
  colNoPaddingLeft: {
    flexDirection: "column",
    flex: 1,
    width: "90%"
  },
  colNoPaddingLeft100: {
    flexDirection: "column",
    flex: 1,
    width: "100%"
  },
  containerDropDownAndroid: {
    height: 43,
    width: "100%"
  },
  cardWarningMinPax: {
    width: "100%",
    flexDirection: "row",
    height: 28,
    backgroundColor: "$cardWarningOverlay",
    borderRadius: 10
  },
  scrollPadding: {
    marginBottom: 80,
    paddingTop: 20
  },
  marginBottomTop: {
    marginBottom: 5,
    marginTop: 5
  },
  marginLeft5: { marginLeft: 5 },
  height50: {
    height: 50
  },

  padding: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  paddingHorizontal20: {
    paddingHorizontal: 20
  },
  paddingHorizontal10: {
    paddingHorizontal: 10
  },
  rowCenter: {
    justifyContent: "flex-start",
    alignItems: "center"
  },

  paddingHorizontal5: {
    paddingHorizontal: 5
  },
  paddingHorizontal2: {
    paddingHorizontal: 2.5
  },

  rowSpace: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    width: "90%",
    paddingVertical: 5
  },
  rowSpaceWithoutPadding: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },
  row: {
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },
  topRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  },

  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252525",
    shadowColor: "#f4f4f4",
    shadowOffset: {
      width: 5,
      height: 5
    },
    zIndex: 0,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    overflow: "hidden"
  },
  containerScroll: {
    flex: 1,
    width: "100%",
    marginBottom: 60
  },
  dropdownIos: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 5,
    height: 43,
    alignItems: "center",
    padding: 0
  },
  dropdownIosGuest: {
    width: fullWidth,
    backgroundColor: "transparent",
    borderRadius: 5,
    height: 43,
    alignItems: "flex-start",
    padding: 0
  },
  containerDropDown: {
    borderColor: "$border",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
    width: "100%"
  },
  cardpayment: {
    width: "100%",
    height: 22.7,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "$cardoverlay"
  },
  paddingBottom5: {
    paddingBottom: 5
  },
  cardWarning: {
    width: "100%",
    height: 125,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "$cardoverlay"
  },
  //BARU//
  cardRadius: {
    marginBottom: 20,
    width: "90%",
    paddingVertical: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    shadowColor: "#f4f4f4",
    shadowOffset: {
      width: 5,
      height: 5
    },
    zIndex: 0,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    borderRadius: 5,
    overflow: "hidden"
  },
  cardRadiusTop: {
    backgroundColor: "$whitelight",
    "@media ios": {
      shadowColor: "$iosShadow"
    },
    "@media android": {
      shadowColor: "black"
    },
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3,
    zIndex: 0,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: "90%",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardRadiusBottom: {
    backgroundColor: "$whitelight",
    "@media ios": {
      shadowColor: "$iosShadow"
    },
    "@media android": {
      shadowColor: "black"
    },
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 3,
    zIndex: 0,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: "90%",
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  colPadding20: {
    paddingHorizontal: 20
  },
  bold24: {
    fontWeight: "300",
    fontSize: 24
  },
  bold20: {
    fontWeight: "300",
    fontSize: 20
  },
  containerScrollPayment: {
    flex: 1,
    width: "100%",
    marginBottom: 60,
    marginTop: 70,
    paddingTop: 20,
    marginLeft: 10,
    paddingLeft: 20
  },
  topNav: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 20
  },
  topNavText: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 30
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: 70,
    zIndex: 99
  },
  gradientHeader: {
    width: "100%",
    height: 150,
    position: "absolute"
  },
  headerText: {
    color: "#252525",
    fontWeight: "300",
    textAlign: "center",
    fontSize: 16
  },
  detailText: {
    color: "$gold",
    fontWeight: "300",
    fontSize: 14
  },
  alignRight: {
    alignItems: "flex-end"
  },
  rowNoPadding: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },
  textPicker: {
    color: "$blacklight",
    fontSize: 14
  },
  footerFilter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    shadowColor: "#d3d3d3",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    elevation: 13
  },
  cardCommission: {
    borderColor: "$gold",
    borderRadius: 5,
    borderWidth: 1,
    overflow: "hidden",
    marginTop: 20
  },
  colNoPadding: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    marginBottom: 20
  },
  marginTopnegatif10: { marginTop: -10 },
  col70: {
    flexDirection: "column",
    width: "70%",
    alignItems: "flex-start"
  },
  rowNoPaddingOrderedItem: {
    // paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1
    // width: "90%"
  },
  row100: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    // flex: 1,
    width: "100%"
  },
  col50: {
    width: "50%"
  },
  col60: {
    width: "60%"
  },
  col15: {
    width: "15%"
  },
  col40: {
    width: "40%"
  },
  colorSoftBlue: { color: "$softblue" }
});
