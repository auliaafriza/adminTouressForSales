import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
  $darkBlueColor: '$darkBlue',
  $goldColor: '$gold',
  $goldlightcolor: '$goldlight',
  $layColor: '$layColorList',
  paddingLeft5: {
    paddingLeft: 5,
  },
  paddingLeft20: {
    paddingLeft: 20,
  },
  paddingAllMinusLeft: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 20,
  },
  top20: {
    top: 20,
  },
  padding: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  colNoPaddingLeft: {
    flexDirection: 'column',
    width: '90%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  rowBackground: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 2.5,
    backgroundColor: '$gold',
  },

  col25: {
    width: '15%',
  },
  col75: {
    width: '85%',
  },
  textbold14: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
    color: 'black',
  },
  textbold16: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
    color: 'black',
  },
  textbold18: {
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '600' : '300',
    color: 'black',
  },
  text14: {
    fontSize: 14,
    color: 'black',
  },
  text14Blue: {
    fontSize: 14,
    color: '$darkBlue',
  },
  text: {
    color: 'black',
    fontSize: 16,
    // fontFamily: 'Roboto',
    flexWrap: 'wrap',
  },
  subTitle: {
    color: '#666666',
    fontSize: 12,
    marginLeft: 5,
    // fontFamily: 'Roboto',
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f4f4f4',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    zIndex: 0,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  containerDropDownAndroid: {
    height: 43,
    width: fullWidth * 0.85,
  },
  $greylight2color: '$greylight2',
  colorgreylight2: { color: '$greylight2' },
  containerScroll: {
    flex: 1,
    width: '100%',
    marginBottom: 60,
  },
  iconFrameAdd: {
    width: 30,
    height: 30,
    padding: 10,
    backgroundColor: '$softblue',
    borderRadius: 20,
  },
  containerDropDown: {
    borderColor: '$border',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
    width: '100%',
    height: 50,
  },
  textPicker: {
    color: '$blacklight',
    fontSize: 14,
  },
  dropdownIos: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 5,
    height: 43,
    alignItems: 'center',
    padding: 0,
  },
  //NEW

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
  searchBarList: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  searcBarInputStyle: { backgroundColor: '#f4f4f4', borderRadius: 20 },
  textShowing: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  showingContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  container1: {
    flex: 1,
    marginTop: 90,
    paddingTop: 30,
    width: '100%',
  },
  textTourType: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '$blacklight3',
  },
  titleAirport: {
    backgroundColor: '$gold',
    paddingVertical: 5,
  },
});
