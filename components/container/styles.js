import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$background',
    flex: 1,
  },
  containerScroll: {
    backgroundColor: '$background',
    flex: 1,
  },
  backgroundText: {
    backgroundColor: '#eeeeee',
    marginRight: 10,
    padding: 3,
    borderRadius: 2,
  },
  styleSafeAreaWhite: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
