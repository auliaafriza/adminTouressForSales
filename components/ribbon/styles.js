import EStyleSheet from 'react-native-extended-stylesheet';
const styles = EStyleSheet.create({
  top20: {
    top: 20,
  },
  labelcontainer: {
    backgroundColor: '$gold',
    width: 100,
    height: 20,
    zIndex: 4,
    elevation: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linerContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  linerContainerIOS: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 4,
    elevation: 3,
  },

  labelcontainerParallelogram: {
    backgroundColor: 'transparent',
    width: 10,
    height: 10,
    //borderStyle: 'solid',
    borderTopWidth: 9,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: '$darkgold',
    borderRightColor: '$darkgold',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    zIndex: 4,
    position: 'absolute',
  },
  text: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    '@media ios': {
      fontWeight: '600',
      zIndex: 5,
      elevation: 3,
    },
    '@media android': {
      fontWeight: '300',
      zIndex: 0,
      elevation: 0,
    },
  },
  ribbonAbsolute: {
    padding: 5,
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default styles;
