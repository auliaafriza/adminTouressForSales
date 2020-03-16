import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import stylesGlobal from '../../components/styles';

class mapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: this.props.navigation.state.params.data,
      fullAddress: '',
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };
  render() {
    return (
      <View style={stylesGlobal.flexSize}>
        <MapView
          style={stylesGlobal.flexSize}
          initialRegion={{
            latitude: this.state.coords.lat,
            longitude: this.state.coords.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
      </View>
    );
  }
}

export default mapView;
