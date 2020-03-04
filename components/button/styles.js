import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  containerShadow: {
    backgroundColor: 'transparent',
    height: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    '@media ios': {
      shadowColor: '$iosShadow',
    },
    '@media android': {
      shadowColor: 'black',
    },
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
    zIndex: 0,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  containerClear: {
    backgroundColor: 'transparent',
    height: 20,
    borderRadius: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerClearCircle: {
    backgroundColor: 'transparent',
    height: 30,
    width: 30,
    borderRadius: 50,
    borderColor: '#e6ca6b',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  containerClearCircleDisable: {
    backgroundColor: '#f2f2f2',
    height: 30,
    width: 30,
    borderRadius: 50,
    borderColor: '#777',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  containerClear100: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderColor: 'transparent',
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '$background',
    borderRadius: 50,
  },
  text: {
    '@media ios': {
      fontWeight: '600',
    },
    '@media android': {
      fontWeight: '300',
    },
    fontSize: 15,
    color: 'white',
  },
  borderWidth0: { borderWidth: 0 },
  widthHeight: {
    width: '100%',
    height: '100%',
  },
  containerAnimated: {
    height: 200,
    width: 50,
    transform: [{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }],
    backgroundColor: 'rgba(250,250,251,0.48)',
    position: 'absolute',
  },
  colNoPadding: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
  },
  positionButton: {
    justifyContent: 'center',
    left: '100%',
    position: 'relative',
  },

  IconImage: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
