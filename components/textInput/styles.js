import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $goldcolor: '$gold',
  $blacklight2color: '$blacklight2',
  $blacklightcolor: '$blacklight',
  $disabelColor: '$disabel',
  $DarkGrey: '$darkGrey',
  container: {
    paddingTop: 30,
    width: '60%',
  },
  containerRoundedTextButton: {
    width: '30%',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#ccc',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginBottom: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRoundedTextButton70: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 10,
    padding: 15,
    marginBottom: 20,
    height: 45,
    width: '70%',
  },
  containertext: {
    width: '60%',
  },
  text: {
    height: 26,
    fontSize: 18,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    // fontFamily: 'Roboto',
  },
  textIcon: {
    height: 48,
    fontSize: 32,
    color: '$darkGrey',
  },
  marginBottomView: {
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 0,
    paddingRight: 10,
  },
  row: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    width: '90%',
  },
  col70: {
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '70%',
  },
  col30: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  col20: {
    width: '20%',
  },
  col80: {
    width: '80%',
  },
  col90: {
    width: '95%',
  },
  height30: {
    height: 30,
  },
  height80: {
    height: 80,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  col10: {
    width: '5%',
  },
  flexrow: {
    flexDirection: 'row',
    width: '100%',
  },
  textblack: {
    color: 'black',
    textAlign: 'center',
  },
  textinputduration: {
    fontSize: 14,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '$blacklight2',
    // fontFamily: 'Roboto',
    width: '100%',
    textAlign: 'center',
  },
  //BARU
  labelStyleFix: {
    position: 'absolute',
    left: 0,
    top: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  containerRounded: {
    borderRadius: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '$border',
    paddingLeft: 20,
    borderRadius: 5,
    height: 45,
    fontSize: 16,
    backgroundColor: 'white',
  },
  borderRight1: {
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  styleTouchable: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
});
