import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Container} from '../../../../../components/container';
import stylesGlobal from '../../../../../components/styles';
import {facilitiesAccommodation} from '../../../../../helper/checkingHelper';

import PropTypes from 'prop-types';
import {CardWithIcon} from '../../../../../components/card';

class allServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFacilities: this.props.route.params.data,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };

  render() {
    return (
      <ScrollView style={stylesGlobal.containerScroll}>
        <Container>
          {this.state.dataFacilities.length != 0
            ? this.state.dataFacilities.map((Aloc, i) => {
                return (
                  <CardWithIcon
                    key={i}
                    text={Aloc.Name}
                    iconname={facilitiesAccommodation(Aloc.Id)}
                  />
                );
              })
            : null}
        </Container>
      </ScrollView>
    );
  }
}

export default allServices;
