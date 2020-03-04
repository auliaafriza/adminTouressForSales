import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $goldcolor: '$gold',
  $redColor: '$red',
  backgroundColorRed: {
    backgroundColor: '$red',
  },
  tintColorRed: {
    tintColor: '$red',
  },
  spaceBetweenRow: {
    justifyContent: 'space-between',
  },
  positionModalItinerary: {
    backgroundColor: '#e6ca6b',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  padding: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  row90: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  row90NoCenter: {
    flexDirection: 'row',
    width: '90%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  innerContainerSort: {
    width: '80%',
    height: 180,
    backgroundColor: '$whitelight',
    borderRadius: 10,
  },
  innerContainerPhoto: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '30%',
    backgroundColor: '$whitelight',
    paddingRight: 20,
    paddingLeft: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalDuration: {
    width: 281,
    // height: 290,
    borderRadius: 10,
    backgroundColor: '$whitelight',
  },
  CardGoldTitle: {
    width: '100%',
    height: 50.3,
    backgroundColor: '$gold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconPhoto: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: '$gold',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tintColorWhite: {
    tintColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
    backgroundColor: '$lightgrey1',
    //position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  innerContainer: {
    height: '50%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
    shadowColor: '$greylight',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '$background',
    shadowOpacity: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
});

export default styles;
