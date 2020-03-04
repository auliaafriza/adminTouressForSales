import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  icon: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  badgeIconContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '100%',
    top: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  badgeIconContainerIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeIconStyle: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
