import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  //COLOR
  $goldColor: '$gold',
  $greyColor: '$darkGrey1',
  greyColor: {
    color: '$darkGrey1',
  },
  blueColor: {
    color: '$darkBlue',
  },
  backgroundColorGold: {
    backgroundColor: '$gold',
  },
  backgroundColorLightGold: {
    backgroundColor: '$lightgold',
  },
  backgroundColorBlack: {
    backgroundColor: '$blacklight',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAlignBottom: {
    textAlignVertical: 'bottom',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  rowEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  justifyContentStart: {
    justifyContent: 'flex-start',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  rowStart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rowPadding: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  rowNoPadding: {
    flexDirection: 'row',
  },
  colNoPadding: {
    flexDirection: 'column',
    width: '90%',
  },
  styleSafeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  styleSafeAreaWhite: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexSize: { flex: 1 },

  //WIDTH
  width100: {
    width: '100%',
  },
  width90: {
    width: '90%',
  },
  width80: {
    width: '80%',
  },
  width70: {
    width: '70%',
  },
  width75: {
    width: '75%',
  },
  width65: {
    width: '65%',
  },
  width60: {
    width: '60%',
  },
  width50: {
    width: '50%',
  },
  width55: {
    width: '55%',
  },
  width45: {
    width: '45%',
  },
  width40: {
    width: '40%',
  },
  width30: {
    width: '30%',
  },
  width20: {
    width: '20%',
  },
  width25: {
    width: '25%',
  },
  width15: {
    width: '15%',
  },
  width10: {
    width: '10%',
  },
  width5: {
    width: '5%',
  },
  width95: {
    width: '95%',
  },
  //ROW
  row: {
    flexDirection: 'row',
  },
  row100: {
    flexDirection: 'row',
    width: '100%',
  },
  row90: {
    flexDirection: 'row',
    width: '90%',
  },
  row30: {
    flexDirection: 'row',
    width: '30%',
  },
  row40: {
    flexDirection: 'row',
    width: '40%',
  },
  row20: {
    flexDirection: 'row',
    width: '20%',
  },
  row50: {
    flexDirection: 'row',
    width: '50%',
  },
  row70: {
    flexDirection: 'row',
    width: '70%',
  },

  row60: {
    flexDirection: 'row',
    width: '60%',
  },
  row5: {
    flexDirection: 'row',
    width: '5%',
  },

  //TEXT
  textGold: {
    color: '$gold',
  },
  colorWhite: { color: '$background' },
  textGrey: {
    color: '$lightGrey',
  },
  textDarkGrey: {
    color: '$darkGrey',
  },
  textWhite: {
    color: '$background',
  },
  textBold: {
    '@media ios': {
      fontWeight: '600',
    },
    '@media android': {
      fontWeight: '400',
    },
  },

  textSemiBold: {
    '@media ios': {
      fontWeight: '300',
    },
    '@media android': {
      fontWeight: '400',
    },
  },
  textAlignVerCenter: {
    textAlignVertical: 'center',
  },
  textJustify: {
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
  text8: {
    fontSize: 8,
  },
  text10: {
    fontSize: 10,
  },
  text11: {
    fontSize: 11,
  },
  text15: {
    fontSize: 15,
  },
  text12: {
    fontSize: 12,
  },
  text14: {
    fontSize: 14,
  },
  text16: {
    fontSize: 16,
  },
  text18: {
    fontSize: 18,
  },
  text20: {
    fontSize: 20,
  },
  text22: {
    fontSize: 22,
  },
  text26: {
    fontSize: 26,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfLeft: {
    alignSelf: 'flex-start',
  },
  alignSelfRight: {
    alignSelf: 'flex-end',
  },
  alignTextCenter: {
    textAlign: 'center',
  },
  alignTextRight: {
    textAlign: 'right',
  },
  alignTextLeft: {
    textAlign: 'left',
  },
  alignContentStart: {
    alignContent: 'flex-start',
  },
  colorGold: { color: '$gold' },
  colorRed: { color: '$red' },
  colorBlackLight: { color: '$blacklight' },

  //PADDING
  padding5: {
    padding: 5,
  },
  padding20: {
    padding: 20,
  },
  padding10: {
    padding: 10,
  },
  padding15: {
    padding: 15,
  },
  padding2: {
    padding: 2,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  paddingBottom5: {
    paddingBottom: 5,
  },
  paddingTop20: {
    paddingTop: 20,
  },
  paddingTop30: {
    paddingTop: 30,
  },
  paddingTop50: {
    paddingTop: 50,
  },
  paddingTop70: {
    paddingTop: 70,
  },
  paddingTop90: {
    paddingTop: 90,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  paddingTop5: {
    paddingTop: 5,
  },
  paddingBottom20: {
    paddingBottom: 20,
  },
  paddingBottom80: {
    paddingBottom: 80,
  },
  paddingVertical80: {
    paddingVertical: 80,
  },
  paddingVertical20: { paddingVertical: 20 },
  paddingHorizontal20: {
    paddingHorizontal: 20,
  },
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
  leftCenter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  //background
  backgroundColorGrey: {
    backgroundColor: '#ccc',
  },
  backgroundColorWhite: {
    backgroundColor: '#fff',
  },

  //MARGIN
  marginRight20: {
    marginRight: 20,
  },
  marginRight10: {
    marginRight: 10,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom15: {
    marginBottom: 15,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginBottom30: {
    marginBottom: 30,
  },
  marginBottom80: {
    marginBottom: 80,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop50: {
    marginTop: 50,
  },
  marginTop80: {
    marginTop: 80,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  paddingRight20: {
    paddingRight: 20,
  },
  paddingRight5: {
    paddingRight: 5,
  },
  paddingRight10: {
    paddingRight: 10,
  },
  paddingLeft5: {
    paddingLeft: 5,
  },
  paddingLeft20: {
    paddingLeft: 20,
  },

  //CONTAINER
  containerIcon30: {
    width: 30,
    height: 30,
  },
  containerIcon40: {
    width: 40,
    height: 40,
  },
  containerIcon20: {
    width: 20,
    height: 20,
  },
  containerScroll: {
    flex: 1,
    width: '100%',
  },

  //Image
  imageIcon: {
    width: '100%',
    height: '100%',
  },
  tintColorGrey: {
    tintColor: '#777',
  },
  colorGrey: {
    color: '#777777',
  },
  tintColorRed: {
    tintColor: '$red',
  },
  tintColorBlack: {
    tintColor: '#252525',
  },
  seeMorePhoto: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#252525',
    opacity: 0.5,
    zIndex: 1,
    borderBottomLeftRadius: 10,
  },

  //borderRadius
  borderRadius10: {
    borderRadius: 10,
  },
  borderRadius20: {
    borderRadius: 20,
  },
  borderRadius5: {
    borderRadius: 5,
  },

  hidden: {
    overflow: 'hidden',
  },

  //header serachbar
  header: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
  },
  headerTop: {
    zIndex: 99,
    backgroundColor: '#fff',
  },
});

export default styles;
