import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $goldcolor: '$gold',
  $redcolor: '$red',
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginLeft5: {
    marginLeft: 5,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  text: {
    fontWeight: '300',
    fontSize: 15,
    color: '$gold',
    textAlign: 'auto',
    // fontFamily: 'Roboto',
  },
  textTitle: {
    fontSize: 14,
    color: '#252525',
  },
  warningtext: {
    fontSize: 12,
    color: '$red',
    textAlign: 'auto',
    // fontFamily: 'Roboto',
  },
  containerWarning: {
    alignSelf: 'flex-end',
  },
  row: {
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    width: '90%',
  },
  rowSpace: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    width: '90%',
    paddingVertical: 5,
  },

  text14: {
    fontSize: 14,
    marginLeft: 5,
  },
  bold14red: {
    '@media ios': {
      fontWeight: '600',
    },
    '@media android': {
      fontWeight: '300',
    },
    fontSize: 14,
    marginLeft: 5,
    color: '$red',
  },
});

export default styles;
