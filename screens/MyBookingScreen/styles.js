import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  containerScroll: {
    flex: 1,
    width: '100%',
  },
  $goldcolor: '$gold',
  scrollingStyle: {
    alignItems: 'center',
    flexGrow: 1,
  },
  paddingTop100: {
    paddingTop: 100,
  },
  textShowing: {
    fontSize: 14,
    color: '$lightGrey',
    textAlign: 'center',
  },
  showingContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
    height: 100,
  },
  headerTop: {
    zIndex: 99,
    backgroundColor: 'white',
  },
  searchBarList: {
    backgroundColor: 'white',
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searcBarInputStyle: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
  },
  paddingTop50: {
    paddingTop: 50,
  },
});
