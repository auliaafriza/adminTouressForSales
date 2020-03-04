import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default EStyleSheet.create({
  $goldcolor: '$gold',
  $black: 'black',
  $blacklight2color: '$blacklight2',
  paddingTop: 50,
  alignCenter: { alignItems: 'center' },
  paddingLeft5: { paddingLeft: 5 },
  $greylight2color: '$greylight2',
  colorgreylight2: { color: '$greylight2' },
  colorblacklight: { color: '$blacklight' },
  alignEnd: { alignItems: 'flex-end' },
  positionButton: {
    position: 'absolute',
    right: '10%',
    top: '90%',
  },
  heightFull: {
    height: fullHeight,
  },
  styleRegis: {
    width: '90%',
    backgroundColor: 'white',
    borderTopRightRadius: 100,
    flex: 1,
    paddingBottom: 70,
  },
  styleTextRegis: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#252525',
    marginBottom: 30,
    marginTop: 64,
  },
  styleTextRegis1: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    color: '#252525',
    marginBottom: 30,
  },
  marginBottom15: {
    marginBottom: 15,
  },
  textPicker: {
    color: '$blacklight',
    fontSize: 14,
  },
  containerScroll: {
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
    fontSize: 20,
    color: '$gold',
    paddingTop: 20,
    paddingLeft: 10,
    // paddingRight: '10%',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  textblack: {
    fontSize: 14,
    color: 'black',
    paddingTop: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  headingblack: {
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
    fontSize: 20,
    color: 'black',
    paddingTop: 20,
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: 20,
    color: '$gold',
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  col100: {
    flexDirection: 'column',
    width: '100%',
  },
  col: {
    width: '90%',
  },
  image: {
    height: '40%',
    width: '40%',
  },
  paddingBottom: 20,
  imageBG: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  content1: {
    alignItems: 'center',
    width: '100%',
  },
  bgGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 700,
    opacity: 0.9,
  },
  containerImage: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    height: 80,
  },
  containerImageLogo: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    height: 50,
  },
  imgLogo: {
    width: '100%',
    height: '100%',
  },
  containerDropDown: {
    borderColor: '$border',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 10,
  },
  borderBottomColor: 'black',
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    flexDirection: 'row',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
    backgroundColor: 'transparent',
  },
  containerDropDownAndroid: {
    height: 43,
    width: fullWidth,
  },
  dropdownIos: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 5,
    height: 43,
    alignItems: 'center',
    padding: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$lightgrey1',
  },
  label: {
    borderRadius: 20,
    backgroundColor: '#e6ca6b',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttoncontainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  buttonPrev: {
    position: 'absolute',
    left: Platform.os == 'ios' ? 17 : 90,
    bottom: 17,
  },
  buttonNext: {
    position: 'absolute',
    right: Platform.os == 'ios' ? 80 : 17,
    bottom: 17,
  },
  containerAgreement: {
    width: '90%',
    backgroundColor: 'white',
    borderTopRightRadius: 100,
    alignSelf: 'flex-start',
    flex: 1,
    height: '100%',
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  textContainer: {
    fontSize: 25,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#252525',
    marginBottom: 30,
    marginTop: 64,
  },
});
