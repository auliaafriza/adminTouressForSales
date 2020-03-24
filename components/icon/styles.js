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
  marginRight10: { marginRight: 10 },
  marginLeft10: { marginLeft: 10 },
  paddingLeft10: { paddingLeft: 10 },
  paddingRight10: { paddingRight: 10 },
  width100: {
    width: '100%',
  },
  flexDirectionRow: { flexDirection: 'row' },
  image20: {
    height: 20,
    width: 20,
  },
  width100height100: { width: '100%', height: '100%' },
});

export default styles;
