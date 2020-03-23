import React, { Component } from 'react';
import { Image, AsyncStorage, View } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { Asset } from 'expo-asset';
import PropTypes from 'prop-types';
import images from './../../assets/splash.png';
import styles from './styles';
import iconReady from './../../assets/Icon/ready_package.png';
import iconFixed from './../../assets/Icon/series_package.png';
import iconCustom from './../../assets/Icon/custom_package.png';
import iconPromo from './../../assets/Icon/promo_package.png';
import Background from './../../assets/images/Backgrund.jpg';
import { setToken } from '../../actions/UserAuth/userAuthAction';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
    this.state = { isReady: false };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };

  async _cacheResourcesAsync() {
    const images = [iconReady, iconFixed, iconCustom, iconPromo, Background];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const expiredToken = await AsyncStorage.getItem('expiredToken');
    if (userToken != null) {
      const expires = new Date(expiredToken);
      const today = new Date();
      if (expires < today) {
        this.props.navigation.navigate('Auth'), await AsyncStorage.clear();
      } else {
        this.props.setToken(userToken);
        this.props.navigation.navigate('App');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }

    // // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.containerAuth}>
        <Image source={images} style={styles.heightWidth} resizeMode="cover" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.authReducer.token,
});

export default connect(mapStateToProps, {
  setToken,
})(AuthLoadingScreen);
