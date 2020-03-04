import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const widthsepar = Dimensions.get('window').width;

export default EStyleSheet.create({
  $layColor: '$layColorList',
  $goldcolor: '$gold',
  colorGrey: { color: '#777777' },
  paddingHorizontalwithwrap: {
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  positionListItemCountry: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  positionListCountry: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paddingLeft5: { paddingLeft: 5 },
  $backgroundColor: '$background',
  row: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '$background',
  },
  rowNoPadding: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  rowEnd: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  padding: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  round: {
    backgroundColor: '$gold',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col5: {
    width: '5%',
  },
  textgold: {
    color: '$gold',
    fontSize: 16,
    marginLeft: 5,
    // fontFamily: 'Roboto',
    flexWrap: 'wrap',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  text1: {
    color: '#aaa',
    fontSize: 12,
    // fontFamily: 'Roboto',
  },
  iconFrameAdd: {
    width: 30,
    height: 30,
    backgroundColor: '#252525',
    borderRadius: 20,
  },
  subTitle: {
    color: 'black',
    fontSize: 12,
    marginLeft: 5,
  },
  separator: {
    backgroundColor: '$layColorList',
    width: widthsepar,
    height: 2,
  },
  separatorRepeat: {
    backgroundColor: '$layColorList',
    width: widthsepar,
    height: 2,
    marginRight: 2,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 2,
  },
  separatorRepeatVertical: {
    backgroundColor: '$tintColor',
    width: widthsepar,
    height: 2,
    marginRight: 20,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 20,
  },
  separatorvertical: {
    backgroundColor: '$layColorList',
    width: 2,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  text12BoldActive: {
    fontSize: 12,
    '@media ios': {
      fontWeight: '600',
    },
    '@media android': {
      fontWeight: '300',
    },
    color: '$darkBlue',
  },

  text12BoldInActive: {
    fontSize: 12,
    '@media ios': {
      fontWeight: '600',
    },
    '@media android': {
      fontWeight: '300',
    },
    color: '$red',
  },
  imageFrame: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d3d3d3',
    width: 50,
    height: 50,
    padding: 10,
  },
});
