// packages
import { BackHandler, Alert } from 'react-native';

const handleAndroidBackButton = callback => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback(); // works best when the goBack is async
    return true;
  });
};

const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener('hardwareBackPress', () => {});
};

const exitAlert = () => {
  Alert.alert('Confirm exit', 'Do you want to quit the app?', [
    { text: 'CANCEL', style: 'cancel' },
    { text: 'OK', onPress: () => BackHandler.exitApp() },
  ]);
};

export { handleAndroidBackButton, removeAndroidBackButtonHandler, exitAlert };
