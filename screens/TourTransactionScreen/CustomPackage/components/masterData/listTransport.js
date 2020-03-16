import React, { Component } from 'react';
import { Container } from '../../components/container';
import { Text, ScrollView, BackHandler } from 'react-native';
import { CardMasterData } from '../../components/card';
import PropTypes from 'prop-types';
import image from './../../assets/images/photo.png';

class listTransport extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };

  handleUnitTransport = () => {
    this.props.navigation.navigate('ListTransportasiUnit');
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
  }

  render() {
    return (
      <ScrollView>
        <Container>
          <Text>Showing 3 Car Rental Supplier</Text>
          <CardMasterData
            type="transport"
            typemasterdata="unit"
            images={image}
            title="SUPLIER NAME"
            onPress={this.handleUnitTransport}
          />
        </Container>
      </ScrollView>
    );
  }
}

export default listTransport;
