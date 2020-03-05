import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions, Platform } from "react-native";

const cardWidth = Dimensions.get("window").width - 40;
const cardHeight = Dimensions.get("window").height - 150;
const cardImageWidth = Dimensions.get("window").width;
const cardImageHeight = 200;
const ImageBGWidth = (cardWidth + 20) / 4;

const styles = EStyleSheet.create({
  $goldcolor: "$gold",
  $blacklightcolor: "$blacklight",
  $redcolor: "$red",
  $bluePrimaryColor: "$bluePrimary",
  $darkBlueColor: "$darkBlue",
  $greenFreetimeColor: "$greenFreetime",
  $greenExcrutionColor: "$greenExcrution",
  $orangeRestoColor: "$orangeResto",
  $greyTripColor: "$greyTrip",
  $yellowColor: "$yellow",
  $enddayColor: "$darkBlue1",
  $queuecolor: "$queueColor",
  $greenDisabelColor: "$greenDisabel",
  $redDisabelColor: "$redDisabel",
  $iosShadowColor: "$iosShadow",
  $lightGreyColor: "$lightGrey",
  $darkGrey1Color: "$darkGrey1",
  $tintColorStyle: "$tintColor",
  $cardWarningOverlayColor: "$cardWarningOverlay",
  marginTop20: { marginTop: 20 },
  marginTopnegatif22: { marginTop: -22 },
  $softblueColor: "$softblue",
  colorSoftBlue: { color: "$softblue" },
  $greenIconColor: "$greenIcon",
  tintColorItinerart: {
    tintColor: "$tintColor"
  },
  imageCardMedia: {
    height: "100%",
    backgroundColor: "#ccc"
  },
  positionImageCardMedia: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  positionCardTourOperator: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden"
  },
  positionTextCardMedia: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    alignItems: "center"
  },
  textAlignRight: { textAlign: "right" },
  marginBottomnegatif10: {
    marginBottom: -10
  },
  marginTopnegatif5: {
    marginTop: -10
  },
  tintColorRed: {
    tintColor: "$red"
  },
  colorTint: {
    color: "$tintColor"
  },
  padding5: { padding: 5 },
  positionLine: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 0
  },
  stylesWarningItinerary: {
    backgroundColor: "#e6ca6b",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0.5
  },
  stylesCardItinerary: {
    height: 80,
    borderRadius: 10,
    overflow: "hidden"
  },
  positionAccommodation: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden"
  },
  padding3: { padding: 3 },
  heightCardHistory: {
    height: 120,
    borderRadius: 10,
    overflow: "hidden"
  },
  rightPadding: {
    paddingRight: 5
  },
  rightPadding10: {
    paddingRight: 10
  },

  paddingVerticalAndAlign: {
    paddingVertical: 5,
    alignItems: "flex-end"
  },
  right: {
    marginRight: 5
  },
  justifySpace: {
    justifyContent: "space-between"
  },
  bottomMargin: {
    marginBottom: 5
  },
  leftPadding7: {
    paddingLeft: 7
  },
  ribbonPosition: {
    top: "10%",
    left: 5
  },
  margin: {
    marginHorizontal: 5
  },
  horizontalPadding: { paddingHorizontal: 5 },
  verticalPadding5: { paddingVertical: 5 },
  bottom: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  paddingLeftRight: {
    paddingLeft: 10,
    paddingRight: 10
  },
  alignSelfCenter: {
    alignSelf: "center"
  },
  positionDownlodBrochure: {
    alignItems: "center",
    marginBottom: 5
  },
  height20: {
    height: 20
  },
  width100: {
    width: 100
  },
  paddingLeft0: {
    paddingLeft: 0
  },
  backgroundColorGrey: {
    backgroundColor: "$layColorList"
  },
  checkBoxStyle: {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  containerCardView: {
    backgroundColor: "$whitelight",
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    "@media ios": {
      shadowColor: "$iosShadow"
    },
    "@media android": {
      shadowColor: "black"
    },
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 3,
    zIndex: 0,
    shadowRadius: 3,
    shadowOpacity: 1.0,
    borderRadius: 10
  },
  containerCardViewAccount: {
    backgroundColor: "$whitelight",
    width: "100%",
    height: 180,
    zIndex: 0
  },

  containerCardNoShadow: {
    backgroundColor: "$whitelight",
    width: "100%",
    borderRadius: 10,
    zIndex: 0
  },

  zeroPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  containerCardMaster: {
    backgroundColor: "$whitelight",
    width: cardWidth + 40,
    height: 210.7,
    // flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  containerIcon: {
    height: 75,
    width: 75,
    marginHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  containercard: {
    borderRadius: 0.7,
    backgroundColor: "$whitelight",
    width: 343,
    height: 90,
    marginVertical: 5,
    marginHorizontal: 10,
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
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  cardWarningMinPax: {
    width: "100%",
    height: 28,
    backgroundColor: "$cardWarningOverlay"
  },
  cardWarning: {
    width: "100%",
    height: 68.7,
    backgroundColor: "$cardoverlay",
    marginBottom: 15,
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "$gold",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  cardWarningFixPrice: {
    width: "100%",
    height: 68.7,
    backgroundColor: "$cardoverlay",
    marginBottom: 15,
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "$gold",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  card: {
    width: cardWidth - 10,
    height: cardHeight / 4,
    position: "relative",
    left: 5,
    right: 5,
    bottom: 5,
    backgroundColor: "$cardoverlay",
    marginBottom: 15,
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "$gold"
  },

  containermedia: {
    marginRight: 10,
    marginVertical: 10,
    width: 133.3,
    height: 166.7
  },

  containermediaNew: {
    marginLeft: 10,
    marginVertical: 10,
    width: 133.3,
    height: 166.7,
    borderRadius: 10
  },
  rowPadding: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "100%"
  },
  row90: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    width: "90%"
  },
  row: {
    flexDirection: "row",
    width: "90%"
  },
  row100: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start"
  },
  rowPadding100: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  rowAbleNoBorder: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 4
  },
  rowDisable: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5
  },
  rowSpace: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5
  },
  rowImage: {
    backgroundColor: "$whitelight",
    width: cardWidth,
    height: 150,
    paddingTop: 10,
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
    zIndex: 1,
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  text16withMargin: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: "left",
    flexWrap: "wrap"
  },
  col30: {
    //paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "30%"
  },
  colNoPadding5: {
    width: "5%"
  },
  colNoPadding55: {
    width: "95%"
  },
  colNoPadding45: {
    width: "45%"
  },
  colNoPadding40Center: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  textgrey14: {
    color: "$lightgrey1",
    fontSize: 14,
    "@media ios": {
      fontWeight: "600"
    },
    "@media android": {
      fontWeight: "300"
    },
    justifyContent: "flex-end"
    // fontFamily: 'Roboto',
  },
  textwhite: {
    color: "white",
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontSize: 10.6,
    paddingHorizontal: 5
  },
  textwhiteNoPadding: {
    color: "white",
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontSize: 10.6
  },
  textSizeBigRed: {
    fontSize: 30,
    "@media ios": {
      fontWeight: "600"
    },
    "@media android": {
      fontWeight: "300"
    },
    color: "$red",
    textAlign: "center"
  },
  textlabel: {
    width: ImageBGWidth - 15,
    textAlign: "center",
    fontSize: 12
    // fontFamily: 'Roboto',
  },
  textbold11: {
    color: "black",
    "@media ios": {
      fontWeight: "600"
    },
    "@media android": {
      fontWeight: "300"
    },
    fontSize: 11
  },
  text10: {
    color: "$blacklight",
    fontSize: 10
  },
  textbold16: {
    color: "black",
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 16
  },
  textbold16White: {
    color: "white",
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 16
  },
  text14marginLeft: {
    color: "black",
    fontSize: 14,
    marginLeft: 5
  },

  textbold22: {
    color: "black",
    "@media ios": {
      fontWeight: "600"
    },
    "@media android": {
      fontWeight: "300"
    },
    fontSize: 22
  },
  textbold20white: {
    color: "white",
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 20
  },
  textbold14white: {
    color: "white",
    fontWeight: Platform.OS === "ios" ? "600" : "300",
    fontSize: 14
  },
  textinputduration: {
    fontSize: 14,
    color: "black"
  },
  textinputdurationDisable: {
    fontSize: 14,
    color: "$Grey",
    // fontFamily: 'Roboto',
    width: "100%",
    textAlign: "center"
  },

  containerImage: {
    height: cardImageHeight,
    width: cardImageWidth,
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    // width: '100%',
    flex: 1
  },
  imageMedia: { width: 170, height: 150 },
  image100: {
    width: "100%",
    height: "100%"
  },
  image90: {
    width: "90%",
    height: "90%",
    alignSelf: "center"
  },
  Noimage: {
    width: "100%",
    height: 250,
    zIndex: 0
  },
  Noimage120: {
    width: "100%",
    height: 110,
    zIndex: 0
  },
  Noimage180: {
    width: "100%",
    height: 180,
    zIndex: 0
  },
  Noimage100: {
    width: "80%",
    height: 50
  },
  Noimage50: {
    width: "50%",
    height: 100
  },
  imagesBG: {
    alignSelf: "center",
    height: 70,
    width: 70,
    "@media ios": {
      borderRadius: 50
    },
    "@media android": {
      borderRadius: 80
    },
    marginTop: 5,
    marginBottom: 5
  },
  imageCategory: {
    height: "100%",
    width: "100%"
  },
  imageIcon: {
    height: 30,
    width: 30
  },
  imageIcon15: {
    height: 15,
    width: 15
  },
  image10: {
    width: 10,
    height: 10
  },
  overlaymedia: {
    position: "absolute",
    width: 133.3,
    height: 166.7,
    backgroundColor: "$coloroverlay"
  },
  overlayfull: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "$coloroverlay",
    justifyContent: "flex-end",
    overflow: "hidden"
  },

  overlayfull30: {
    position: "absolute",
    height: "30%",
    width: "100%",
    top: "70%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "$coloroverlay",
    justifyContent: "flex-end"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "50%",
    top: "55%",
    left: "3%",
    backgroundColor: "$coloroverlay"
  },

  overlayTitlemiddle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3
  },
  overlayTitlemiddleHistory: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    backgroundColor: "#252525",
    zIndex: 9
  },

  overlaycardmiddelcolor: {
    position: "absolute",
    "@media ios": {
      height: "48%"
    },
    "@media android": {
      height: "60%"
    },
    width: "100%",
    top: "48%",
    bottom: 0,
    backgroundColor: "$coloroverlay"
  },

  textbottom: {
    top: "60%",
    paddingHorizontal: 5
  },
  ontop: {
    top: 10,
    bottom: "70%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    zIndex: 10
  },
  ribbonGoldIOS: {
    zIndex: 10,
    elevation: 3
  },
  //BARU CARD PACKAGES
  containerImageTop: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  imageWidth100: { width: "100%", height: "100%" },
  containerCommission: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "$blacklight",
    position: "absolute",
    left: 10,
    bottom: 40,
    borderRadius: 20,
    opacity: 0.5
  },
  text12White: {
    color: "white",
    fontSize: 12
  },
  text12BoldWhite: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12
  },
  text12Grey: {
    fontSize: 12,
    color: "#484848"
  },
  text14Grey: {
    fontSize: 14,
    color: "#484848"
  },
  text16Grey: {
    fontSize: 16,
    color: "#484848"
  },
  colNoPadding50Right: { width: "50%", alignItems: "flex-end" },
  text16BoldGold: {
    fontSize: 16,
    color: "$gold",
    fontWeight: "600"
  },
  text18BoldGold: {
    fontSize: 18,
    color: "$gold",
    fontWeight: "600"
  },
  text12BoldGold: {
    fontSize: 12,
    color: "$gold",
    fontWeight: "600"
  },

  paddingBottom10: { paddingBottom: 10 },
  colPadding20: {
    paddingHorizontal: 20
  },
  bold20: {
    fontWeight: "bold",
    fontSize: 20
  },
  paddingTop20: {
    paddingTop: 20
  },
  containerRecomendedCard: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: Platform.OS === "ios" ? "$iosShadow" : "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3,
    zIndex: 1,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    overflow: "hidden"
  },
  imageRecomended: {
    width: "100%",
    height: "100%"
  },
  containerInsideText: {
    position: "absolute",
    bottom: 100,
    left: 10
  },
  containerCommissionText: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
  containerIntroducingText: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  containerTitleText: {
    width: 150,
    marginHorizontal: 5,
    flexWrap: "wrap",
    paddingTop: 10
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.06,
    color: "$blacklight",
    textAlign: "justify",
    marginBottom: 10
  },
  containerSubtitleText: {
    width: 150,
    flexDirection: "row"
  },
  subIcon: {
    width: 20,
    height: 20
  },
  containerTextIntroducing: {
    width: 200,
    flexDirection: "row"
  },
  textIntroducingDesc: {
    fontSize: 12,
    fontWeight: "300",
    color: "$blacklight"
  },
  imageTourOperator: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  memberLabel: {
    backgroundColor: "$blacklight",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    height: 20
  },
  textHistoryCard: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0
  },
  hiddenRadius: {
    overflow: "hidden",
    borderRadius: 10
  },
  unreadCard: {
    flex: 1,
    backgroundColor: "transparent"
  },
  readCard: {
    flex: 1,
    backgroundColor: "rgba(192,192,192,0.2)	"
  },
  containerIconTour: {
    height: 65,
    width: 65,
    marginHorizontal: 7,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  }
});

export default styles;
