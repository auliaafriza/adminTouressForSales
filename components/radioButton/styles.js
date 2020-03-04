import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainerKanan: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardWarning: {
    width: '100%',
    height: 58.7,
    backgroundColor: '$cardoverlay',
    marginBottom: 5,
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: '$gold',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#e6ca6b',
  },
  $borderColor: '$border',
  paddingLeftRight10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  marginBottom30: {
    marginBottom: 30,
  },
  paddingLeft10: {
    paddingLeft: 10,
  },
});

export default styles;
