import EStyleSheet from "react-native-extended-stylesheet";

import { Dimensions, Platform } from "react-native";

const cardWidth = Dimensions.get("window").width - 40;
const fullWidth = Dimensions.get("window").width;

export default EStyleSheet.create({
  $goldcolor: "$gold",
  $black: "black",
  $redcolor: "$red",
  $textnotecolor: "$textnote",
  $blacklightcolor: "$blacklight",
  colorred: { color: "$red" },
  paddingHorizontal5: { paddingHorizontal: 5 },
  $blacklight2color: "$blacklight2",
  tintColorRed: { tintColor: "$red" },
  paddingTop: 50,
  paddingTop30: {
    paddingTop: 30
  },
  alignCenter: { alignItems: "center" },
  height400: { height: 400 },
  lineHeight20: { lineHeight: 20 },
  paddingLeft5: { paddingLeft: 5 },
  $greylight2color: "$greylight2",
  colorgreylight2: { color: "$greylight2" },
  tintColorRed: {
    tintColor: "$red"
  },
  cardWarningMinPax: {
    width: "100%",
    flexDirection: "row",
    height: 28,
    backgroundColor: "$cardWarningOverlay",
    borderRadius: 10
  },
  stylebottom: {
    paddingBottom: 100
  },
  bottom: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  modalContainerDuration: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$lightgrey1"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "$lightgrey1"
  },
  innerContainer: {
    alignItems: "flex-start",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "70%",
    backgroundColor: "$whitelight",
    paddingRight: 20,
    paddingLeft: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  innerContainerSort: {
    alignItems: "flex-start",
    top: "25%",
    width: "100%",
    height: "50%",
    backgroundColor: "$whitelight",
    paddingRight: 20,
    paddingLeft: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  innerContainerFocus: {
    alignItems: "flex-start",
    // top: 0,
    // bottom: '25%',
    width: "100%",
    height: "100%",
    backgroundColor: "$whitelight",
    paddingRight: 20,
    paddingLeft: 20,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  innerContainerFilter: {
    alignItems: "flex-start",
    top: "20%",
    width: cardWidth,
    height: "60%",
    backgroundColor: "$whitelight"
  },
  rowCardAccomodation: {
    marginRight: 5,
    width: "100%"
  },
  contentContainer: {
    flex: 1,
    marginBottom: 10
  },
  containerScroll: {
    flex: 1,
    width: "100%",
    marginBottom: 70
  },
  // containerDropDown: {
  //   width: '100%',
  //   height: 25,
  //   borderTopColor: 'transparent',
  //   borderBottomColor: 'transparent',
  //   marginBottom: 2,
  //   backgroundColor: 'transparent',
  // },
  containerDropDown: {
    borderColor: "$border",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
    width: "100%",
    marginBottom: 10
  },
  textPicker: {
    color: "$blacklight",
    fontSize: 14
  },
  containerDropDownAndroid: {
    height: 43,
    width: fullWidth
  },
  dropdownIos: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 5,
    height: 43,
    alignItems: "center",
    padding: 0
  },
  cardAccomo: {
    width: cardWidth,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    alignItems: "center"
  },
  cardAccomoNew: {
    width: cardWidth + 40,
    paddingVertical: 2.5,
    alignItems: "center"
  },
  cardAccomoSingle: {
    width: cardWidth + 5,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    alignItems: "center"
  },
  cardAccomoSingleNew: {
    width: cardWidth + 40,
    paddingVertical: 2.5,
    alignItems: "center"
  },
  header: {
    position: "absolute",
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7
  },
  Topmargin: {
    marginTop: 2,
    marginBottom: 2
  },
  // row: {
  //   paddingHorizontal: 5,
  //   paddingVertical: 2.5,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   flex: 1,
  //   width: '90%',
  // },
  // row100: {
  //   paddingHorizontal: 5,
  //   paddingVertical: 2.5,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   flex: 1,
  //   width: '100%',
  //   // marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
  // },
  rowNoPadding: {
    flexDirection: "row",
    width: "100%"
  },
  rowNoPaddingFilter: {
    width: "100%",
    flexDirection: "row"
  },
  rowRight: {
    justifyContent: "flex-end",
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },

  col60: {
    alignItems: "flex-start",
    width: "60%"
  },
  col10: {
    alignItems: "flex-start",
    width: "10%"
  },
  col20: {
    width: "20%"
  },
  col25: {
    width: "25%"
  },
  col80: {
    width: "80%"
  },
  col5: {
    alignItems: "flex-start",
    width: "5%"
  },
  col: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "flex-start",
    flexDirection: "column"
  },

  textwrap: { flexWrap: "wrap" },

  text16gold: {
    fontSize: 16,
    color: "$gold"
  },
  text26gold: {
    fontSize: 26,
    color: "$gold"
  },
  text16: {
    fontSize: 16,
    marginLeft: 5
  },
  text14: {
    fontSize: 14,
    color: "black",
    marginLeft: 5
  },
  text14Wrap: {
    fontSize: 14,
    color: "black",
    flexWrap: "wrap"
  },
  text12NoBold: {
    textAlign: "left",
    // fontFamily: 'Roboto',
    fontSize: 12
  },
  bold12: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 12,
    paddingHorizontal: 5
  },
  bold14margin: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 14,
    marginLeft: 5
  },
  bold14: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 14,
    textAlign: "left"
    // fontFamily: 'Roboto',
  },

  bold16: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 16
  },
  bold18: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 18
  },
  bold22: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 22
  },
  bold16margin: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 16,
    marginLeft: 5
  },
  text20: {
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    textAlign: "left",
    // fontFamily: 'Roboto',
    fontSize: 20
  },
  Scroll: {
    width: "100%",
    flex: 1
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
  footerFilter: {
    backgroundColor: "#252525",
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

    // position: 'absolute',
    // flex: 1,
    // left: 0,
    // right: 0,
    // bottom: -10,
    // flexDirection: 'row',
    // height: 70,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '$gold',
    // shadowColor: '#ccc',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.7,
    // shadowRadius: 10,
    // elevation: 7,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // overflow: 'hidden',
  },
  imagestyle: {
    width: "100%",
    height: 175
  },
  timestyling: {
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    padding: 5,
    borderRadius: 13
  },
  imagelogo: {
    width: 20.7,
    height: 20.7
  },
  paddingVertical80: {
    paddingVertical: 80
  },
  paddingBottom80: {
    paddingBottom: 80
  },
  paddingTop50: {
    paddingTop: 50
  },
  styleLinear: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  marginBottom80: {
    marginBottom: 80
  },
  image: {
    width: "100%",
    height: 180
  },
  iosBackButton: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textBackButtonIos: {
    color: "white",
    paddingLeft: 10,
    fontSize: 18
  },
  filterInput: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  },
  containerFilterInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
  rowPriceBottom: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 60,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$goldcolor",
    width: "100%"
  },
  //BARU
  topNav: {
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 20
  },
  topNavText: {
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 30,
    paddingLeft: 50
  },
  headerText: {
    color: "#252525",
    fontWeight: "300",
    fontSize: 16
  },
  textShowing: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center"
  },
  showingContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 15
  },
  imageDetailPckg: {
    backgroundColor: "#252525",
    borderRadius: 20,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorSlider: {
    color: "#fff",
    width: 60,
    textAlign: "center"
  },

  right: { alignItems: "flex-end" },
  marginTop20: { marginTop: 20 },
  flexWrap: { flexWrap: "wrap" },
  text28Bold: {
    fontWeight: "300",
    fontSize: 28,
    color: "#252525"
  },
  text14Red: {
    color: "red",
    fontSize: 14
  },
  text28Red: {
    color: "red",
    fontSize: 28,
    marginRight: 5,
    fontWeight: "300"
  },
  rightBottom: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  containerPrice: {
    justifyContent: "space-between",
    padding: 0,
    alignItems: "flex-start",
    height: 50
  },
  paddingHorizontal10: {
    paddingHorizontal: 10
  },
  headerTop: {
    zIndex: 99,
    backgroundColor: "#fff"
  },
  searchBarList: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searcBarInputStyle: {
    backgroundColor: "#fff"
  },
  image30: {
    width: 30,
    height: 30
  },
  //NEW
  carouselImageContainer: {
    width: fullWidth,
    height: 350
  },
  containerScrollDetail: {
    backgroundColor: "#fff",
    flex: 1
  },
  containerStyle: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center"
  },
  carouselImage: {
    width: "100%",
    height: "100%"
  },
  colPadding20: {
    paddingHorizontal: 20
  },
  card: {
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
  rowNoPadding100: {
    flexDirection: "row",
    flex: 1,
    width: "100%"
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    marginBottom: 50
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imagestyleDetail: {
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "yellow"
  },
  item: {
    width: fullWidth,
    height: fullWidth
  },
  imageCard: {
    width: fullWidth
    // height: 300,
  },
  row: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },
  footerDetail: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    height: 70,
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
    shadowOpacity: 0.5
  },

  topNavDetail: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 20,
    marginLeft: 10,
    marginTop: 20
  },
  topNavTextDetail: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 30,
    marginTop: 20
  },
  row100: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    // flex: 1,
    width: "100%"
  },
  bold20: {
    fontWeight: "300",
    fontSize: 20
  },
  cardList: {
    backgroundColor: "#fff",
    width: "90%",
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 10,
    position: "absolute",
    marginTop: "60%",
    paddingTop: 20
  },
  imageContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  headerTransparent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 99,
    width: "100%",
    marginTop: -20
  },
  gradientFooter: {
    width: "100%",
    height: 180,
    position: "absolute",
    padding: 10,
    marginTop: 15
  },
  textHeader: {
    color: "#252525",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16
  },

  //PackagesDetail
  scrollContainerDetail: {
    width: "100%",
    height: 350
  },
  contentContainerDetail: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 275,
    zIndex: 10,
    marginTop: -20,
    width: "100%"
  },
  contentContainerDetail1: {
    paddingHorizontal: 20,
    zIndex: 10,
    width: "100%",
    top: -40,
    marginTop: -20
  },

  alignContentCenter: {
    alignContent: "center"
  },
  containerIndicator: {
    backgroundColor: "#252525",
    borderRadius: 20,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  containerIndicatorStart: {
    backgroundColor: "#252525",
    borderRadius: 20,
    paddingVertical: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  left: { alignItems: "flex-start" },
  paddingVertical20: {
    paddingVertical: 20
  },
  paddingVertical10: {
    paddingVertical: 10
  },
  textJustify25: {
    textAlign: "justify",
    lineHeight: 25,
    color: "#252525"
  },
  marginBottomCenter20: {
    justifyContent: "center",
    marginBottom: 20
  },
  marginTop10: {
    marginTop: 10
  },
  marginBottom20: {
    marginBottom: 20
  },
  marginBottom10: {
    marginBottom: 10
  },
  readMoreText: { fontWeight: "300", color: "$gold" },
  paddingBottom20: { paddingBottom: 20 },
  borderRadius80: { borderRadius: 80 },
  paddingLeft30: { paddingLeft: 30 },
  textInfo: { color: "#252525", lineHeight: 25 },
  paddingHorizontal20: { paddingHorizontal: 20 },
  borderBottom2: {
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 2,
    paddingBottom: 20,
    marginBottom: 20,
    paddingLeft: 15
  },
  paddingLeft10: { paddingLeft: 10 },
  text18: {
    fontSize: 18,
    lineHeight: 25
  },
  readMoreTextGold: { fontWeight: "300", color: "$gold" },

  paddingLeft20: { paddingLeft: 20 },
  totalContainer: {
    width: "70%",
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  bold20White: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 20
  },
  text12White: {
    color: "#fff",
    fontSize: 12,
    alignSelf: "flex-end"
  },
  text12Wrap: {
    fontSize: 12,
    color: "#252525",
    flexWrap: "wrap"
  },
  bookButtonContainer: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "$gold"
  },
  accomodationTypeText: {
    fontSize: 14,
    paddingLeft: 20
  },
  locationText: {
    fontSize: 14,
    color: "#a5a5a5"
  },
  seall: {
    fontSize: 12,
    color: "#0f63f7",
    marginTop: 10
  },
  colNoPadding100: {
    width: "100%"
  },
  textCenter: {
    textAlign: "center",
    marginTop: 10
  },
  center: {
    alignSelf: "center"
  },
  textPax: {
    marginRight: 5,
    textAlignVertical: "top"
  },
  alignSelfStart: {
    alignSelf: "flex-start"
  },

  stylesHeaderButton: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 2
  },
  stylesPageSchedule: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row"
  },
  stylesHeaderDate: {
    fontSize: 34,
    fontWeight: "600",
    color: "#e6ca6b",
    textAlign: "right",
    width: "100%"
  },
  textDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e6ca6b"
  },
  stylesScrollViewSchedule: {
    marginBottom: 0,
    width: Dimensions.get("window").width
  },
  paddingTop20: {
    paddingTop: 20
  },
  paddingTop60: {
    paddingTop: 60
  },
  padding: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  headerOverlay: {
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden"
  },
  headerDetail: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 3
  },
  cardWarning: {
    width: "100%",
    height: 55.7,
    backgroundColor: "$cardoverlay",
    marginBottom: 15,
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "$gold",
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  rowspacebetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%"
  },
  rowPadding: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    width: "90%",
    justifyContent: "center"
  },
  row100padding: {
    flexDirection: "row",
    width: "99%",
    paddingHorizontal: 10,
    justifyContent: "center"
  },
  rowBackground: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 2.5,
    backgroundColor: "$cardoverlay",
    marginBottom: 5
  },
  colNoPadding45: {
    flexDirection: "column",
    width: "45%"
  },
  colNoPadding10: {
    width: "10%"
  },
  colNoPadding90: {
    width: "90%"
  },
  size14: { fontSize: 14 },
  textblack: {
    fontSize: 12,
    color: "black",
    textAlign: "left"
  },
  elevation3: {
    elevation: 3
  },

  marginBottom60: {
    marginBottom: 60
  },
  bottom0: {
    bottom: 0
  },
  stylesTextCustomOption: {
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "flex-start",
    paddingLeft: 20,
    marginBottom: 20
  },
  stylesContainerRadioGrup: {
    justifyContent: "flex-start",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "$border",
    overflow: "hidden",
    height: 45
  },
  stylesButtonRadioGrup: {
    borderRadius: 0,
    borderWidth: 0,
    width: "50%"
  },
  marginTop20MarginBottom60: {
    marginTop: 20,
    marginBottom: 60
  },
  textblack15: {
    fontSize: 15
  },

  widthHeight22: {
    width: 22,
    height: 22
  },
  textbold15: {
    fontSize: 15,
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    color: "black"
  },
  textbold18: {
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    color: "black",
    textAlign: "center"
  },
  text16Wrap: {
    fontSize: 16,
    color: "black",
    flexWrap: "wrap"
  },
  marginRight3: { marginRight: 3 },

  containerDropDown45: {
    width: "45%",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginBottom: 2,
    backgroundColor: "transparent"
  },
  containerDropDown50: {
    width: "50%",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    backgroundColor: "transparent"
  },
  cardhidden: {
    height: 75,
    width: "100%"
  },
  cardRadius: {
    marginBottom: 20,
    width: "90%",
    paddingVertical: 20,
    backgroundColor: "white",
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
    overflow: "hidden",
    elevation: 3
  },
  rowNoPaddingLeft: {
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },
  colNoPaddingLeft: {
    flexDirection: "column",
    flex: 1,
    width: "90%"
  },
  col30: {
    width: "30%"
  },
  col70: {
    width: "70%"
  },
  col50: {
    width: "50%"
  },
  tabNavigation: {
    width: "100%",
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    zIndex: 5,
    marginBottom: 20
  },
  iconClose: { position: "absolute", top: 20, right: 20 },
  topRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  },
  scrollingStyle: {
    alignItems: "center",
    flexGrow: 1
  }
});
