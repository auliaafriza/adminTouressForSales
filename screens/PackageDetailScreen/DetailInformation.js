import React, { Component } from 'react';
import { Container } from '../../components/container';
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  StatusBar,
  BackHandler,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SeperatorRepeat } from '../../components/list/index';
import { Card } from '../../components/card/index';
import styles from './styles';
import stylesGlobal from '..//../components/styles';
import { Loading } from '../../components/loading';
import moment from 'moment';
import PropTypes from 'prop-types';
import IMAGES from '../../assets/images/NoImage.png';
import IconClock from '../../assets/Icon/clock.png';
import IconMap from '../../assets/Icon/address.png';
import { Ionicons } from '@expo/vector-icons';

import IconMapRes from '../../assets/Icon/map_restaurant.png';
import IconMapHotel from '../../assets/Icon/map_hotel.png';
import IconMapExc from '../../assets/Icon/map_excursion.png';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

class DetailInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
      type: this.props.route.params.type,
      loading: false,
      scrollY: new Animated.Value(0),
      long: null,
      lat: null,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    let address = this.state.data
      ? this.state.data.AddressObject
        ? this.state.data.AddressObject
          ? this.state.data.AddressObject.AddressString
            ? this.state.data.Address
              ? this.state.data.Address.AddressString
              : this.state.data.Address.AddressString
            : ''
          : ''
        : ''
      : '';
    this.getLocation(address);
  }

  getLocation = async address => {
    try {
      return await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=` +
            address +
            `&key=AIzaSyAaQYc2o45vQ04S0FRruSY05XL1_TZ9FIg`
        )
        .then(res => {
          res.status == 'ZERO_RESULTS'
            ? this.setState({
                lat: null,
                long: null,
              })
            : this.setState({
                lat: res.data.results[0].geometry.location.lat,
                long: res.data.results[0].geometry.location.lng,
              });
        });
    } catch (error) {}
  };

  backButton = () => {
    this.setState({ loading: true });
    this.props.navigation.pop();
  };

  render() {
    const Data = this.state.data ? this.state.data : '';
    const HEADER_MAX_HEIGHT = 100;
    const HEADER_MIN_HEIGHT = 70;

    const backgroundColorAnimate = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'white'],
      extrapolate: 'clamp',
    });

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const containerWidth = Dimensions.get('window').width;
    return (
      <Container>
        <Animated.View
          style={[
            styles.headerTransparent,
            { height: headerHeight, backgroundColor: backgroundColorAnimate },
          ]}
        >
          <LinearGradient
            colors={['#e5e5e5', 'rgba(255,255,255,0)']}
            style={styles.gradientFooter}
          >
            <StatusBar
              translucent
              barStyle="dark-content"
              backgroundColor="transparent"
            />
            <View style={styles.topNavDetail}>
              <Ionicons name="ios-arrow-back" size={35} color="#252525" />
            </View>
            <View style={styles.topNavTextDetail}>
              <Text style={styles.textHeader}>{Data.Name}</Text>
            </View>
          </LinearGradient>
        </Animated.View>
        {this.state.loading ? (
          <Loading
            sizeloading="large"
            colorloading={styles.$goldcolor}
            positionLoad="relative"
          />
        ) : (
          <ScrollView
            style={styles.scrollStyle}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } },
              },
            ])}
          >
            <Container widthContainer={containerWidth}>
              {Data.ImageUrl != undefined && Data.ImageUrl != '' && (
                <Image
                  source={{ uri: Data.ImageUrl }}
                  resizeMode="cover"
                  style={styles.carouselImage}
                />
              )}
              {Data.ImageUrl == undefined && (
                <Image
                  source={IMAGES}
                  resizeMode="center"
                  style={styles.carouselImage}
                />
              )}
              {Data.ImageUrl == '' && (
                <Image
                  source={IMAGES}
                  resizeMode="center"
                  style={styles.carouselImage}
                />
              )}
              <Card type="Flat" widthCard="100%" topMargin={-50}>
                <View style={stylesGlobal.padding20}>
                  <Text
                    style={[
                      stylesGlobal.text20,
                      stylesGlobal.textBold,
                      stylesGlobal.marginBottom5,
                    ]}
                  >
                    {Data.Name}
                  </Text>
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                  >
                    {Data.AttractionCategory ? (
                      <View
                        style={[
                          stylesGlobal.marginBottom10,
                          stylesGlobal.width30,
                          { paddingVertical: 5, marginRight: 5 },
                        ]}
                      >
                        <Text
                          style={[stylesGlobal.text14, { fontWeight: '300' }]}
                        >
                          {Data.AttractionCategory == 'Package'
                            ? 'Fix Timing'
                            : 'Flexible Timing'}
                        </Text>
                      </View>
                    ) : null}
                    <View
                      style={[
                        stylesGlobal.marginBottom10,
                        stylesGlobal.width60,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      {Data.OperationStartTime || Data.OperationEndTime ? (
                        <View
                          style={[
                            stylesGlobal.row100,
                            stylesGlobal.alignItemsCenter,
                          ]}
                        >
                          <View
                            style={[
                              stylesGlobal.containerIcon20,
                              { padding: 5 },
                            ]}
                          >
                            <Image
                              source={IconClock}
                              style={[
                                stylesGlobal.imageIcon,
                                { tintColor: '#777' },
                              ]}
                            />
                          </View>
                          <Text>Open : </Text>
                          <Text
                            style={[stylesGlobal.text14, { fontWeight: '300' }]}
                          >
                            {moment(Data.OperationStartTime).format('HH : mm ')}
                            - {moment(Data.OperationEndTime).format('HH : mm ')}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <Text style={styles.text12Wrap}>
                    {Data.Description
                      ? Data.Description
                      : Data.ProfileDesc
                      ? Data.ProfileDesc
                      : Data.Desc
                      ? Data.Desc
                      : ''}
                  </Text>

                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={31}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>

                  <View style={stylesGlobal.row100}>
                    <View
                      style={[stylesGlobal.containerIcon20, { padding: 5 }]}
                    >
                      <Image
                        style={[stylesGlobal.imageIcon, { tintColor: '#777' }]}
                        source={IconMap}
                        resizeMode="contain"
                      />
                    </View>
                    <Text>
                      {' '}
                      {Data.AddressObject
                        ? Data.AddressObject.AddressString
                          ? Data.AddressObject.AddressString
                          : Data.AddressObject.Address1
                        : Data.Address.AddressString
                        ? Data.Address.AddressString
                        : ''}
                    </Text>
                  </View>
                </View>
                {this.state.lat || this.state.long ? (
                  <MapView
                    style={
                      styles.styleMapView // <MapView
                    }
                    pointerEvents="none"
                    region={{
                      latitude: this.state.lat,
                      longitude: this.state.long,
                      latitudeDelta: 0.00922,
                      longitudeDelta: 0.00421,
                    }}
                  >
                    <Marker
                      key={0}
                      coordinate={{
                        latitude: this.state.lat,
                        longitude: this.state.long,
                      }}
                    >
                      <Image
                        source={
                          this.state.type == 'RECREATION'
                            ? IconMapExc
                            : this.state.type == 'EAT'
                            ? IconMapRes
                            : IconMapHotel
                        }
                        style={styles.image30}
                        resizeMode="contain"
                      />
                    </Marker>
                  </MapView>
                ) : null}
              </Card>
            </Container>
          </ScrollView>
        )}
      </Container>
    );
  }
}

export default DetailInformation;
