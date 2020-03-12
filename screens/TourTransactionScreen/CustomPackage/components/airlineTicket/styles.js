import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $goldlightcolor: '$goldlight',
  info: {
    borderColor: '$gold',
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
  },
  paddingLeft34: {
    paddingLeft: 34,
  },
  cardInfo: {
    borderColor: '$gold',
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FBF5E3',
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
  verticalDots: {
    position: 'absolute',
    left: 5,
    top: 20,
  },
});

export default styles;
