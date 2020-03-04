import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, StatusBar } from 'react-native';

const width = Dimensions.get('window').width;
const height = width / 3;

const styles = EStyleSheet.create({
  contentContainer: {
    height: 200,
    marginBottom: 10,
  },
  pageIndicator: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    height: height,
  },
  image: {
    //flex: 1,
    justifyContent: 'center',
    width,
    height: height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
    backgroundColor: '$lightGrey',
  },
  imageHeight: 200,
});

export default styles;
