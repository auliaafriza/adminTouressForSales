import React, { Component } from 'react';
import { Container } from '../../components/container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  BackHandler,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { SeperatorRepeat } from '../../components/list/index';
import { Card } from '../../components/card/index';
import styles from './styles';
import { Loading } from '../../components/loading';
import { Ionicons, Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import IMAGES from '../../assets/images/NoImage.png';
import {
  locationAccommodation,
  facilitiesAccommodation,
} from '../../helper/checkingHelper';
import stylesGlobal from '../../components/styles';
import IconMapIOS from '../../assets/Icon/map_hotelIOS.png';

class DetailAccommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hotel: this.props.route.params.hotel ? this.props.route.params.hotel : '',
      loading: false,
      scrollY: new Animated.Value(0),
      long: null,
      lat: null,
      fullAddress: '',
      statusDesc: 'Read More',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };

  backButton = () => {
    this.props.navigation.pop();
  };

  handleAllService = data => {
    this.props.navigation.navigate('AllServices', { data: data });
  };

  handleAllNearbyLocation = data => {
    this.props.navigation.navigate('AllNearbyLocation', { data: data });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    let address = this.state.Hotel
      ? typeof this.state.Hotel.Address == 'object'
        ? this.state.Hotel.Address
          ? this.state.Hotel.Address.AddressString
            ? this.state.Hotel.Address.AddressString
            : ''
          : ''
        : this.state.Hotel.ProfileDesc
        ? this.state.Hotel.ProfileDesc
        : this.state.Hotel.Address
        ? this.state.Hotel.Address
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

  DescPress = () => {
    if (this.state.statusDesc == 'Read More') {
      this.setState({ statusDesc: 'Read Less' });
    } else this.setState({ statusDesc: 'Read More' });
  };

  render() {
    const containerWidth = Dimensions.get('window').width;
    const Data = this.state.Hotel ? this.state.Hotel : '';
    const DataStar = Data.AccommodationRating || '';
    const Star = parseInt(DataStar.Id) || '';
    let stars = new Array(Star).fill(0);
    const HEADER_MAX_HEIGHT = 300;
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
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
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
            <TouchableOpacity
              style={styles.topNavDetail}
              onPress={this.backButton}
            >
              <Ionicons name="ios-arrow-back" size={35} color="#252525" />
            </TouchableOpacity>
            <View style={styles.topNavTextDetail}>
              <Text style={styles.textHeader}>{Data ? Data.Name : ''}</Text>
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
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollY },
                },
              },
            ])}
          >
            <Container widthContainer={containerWidth}>
              {Data
                ? Data.ImageUrl != undefined &&
                  Data.ImageUrl != '' && (
                    <Image
                      source={{ uri: Data.ImageUrl }}
                      resizeMode="cover"
                      style={styles.carouselImage}
                    />
                  )
                : ''}
              {Data
                ? Data.ImageUrl == undefined && (
                    <Image
                      source={IMAGES}
                      resizeMode="center"
                      style={styles.carouselImage}
                    />
                  )
                : ''}
              {Data
                ? Data.ImageUrl == '' && (
                    <Image
                      source={IMAGES}
                      resizeMode="center"
                      style={styles.carouselImage}
                    />
                  )
                : ''}
              <Card widthCard="100%" topMargin={-50}>
                <View style={[styles.colNoPadding100, styles.colPadding20]}>
                  <Text
                    style={[
                      styles.text20,
                      styles.marginTop10,
                      styles.marginBottom10,
                    ]}
                  >
                    {Data ? Data.Name : ''}
                  </Text>
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.marginBottom20,
                      stylesGlobal.alignItemsCenter,
                    ]}
                  >
                    {stars.map(i => {
                      {
                        return (
                          <Icon
                            key={i}
                            name="grade"
                            size={16}
                            color={styles.$goldcolor}
                          />
                        );
                      }
                    })}
                    <Text style={styles.accomodationTypeText}>Hotel</Text>
                    <Entypo name="dot-single" size={28} color="#555555" />
                    <Text style={styles.locationText}>
                      {Data ? (Data.City ? Data.City.Name : '') : ''}
                    </Text>
                  </View>
                  {Data ? (
                    Data.Desc ? (
                      Data.Desc.length <= 250 ? (
                        <Text style={styles.text12Wrap}>{Data.Desc}</Text>
                      ) : (
                        <View style={styles.rowNoPadding}>
                          <Text style={styles.text12Wrap}>
                            {this.state.statusDesc == 'Read More'
                              ? Data.Desc.slice(0, 250)
                              : Data.Desc}
                            <Text style={styles.seall} onPress={this.DescPress}>
                              {this.state.statusDesc == 'Read More'
                                ? '... '
                                : ' '}
                              {this.state.statusDesc}
                            </Text>
                          </Text>
                        </View>
                      )
                    ) : null
                  ) : null}
                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={35}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  {Data ? (
                    Data.ProfileFacilities ? (
                      <Text style={styles.bold14}>Main Services </Text>
                    ) : null
                  ) : null}

                  <View style={[styles.rowNoPadding, styles.bottom]}>
                    {Data
                      ? Data.ProfileFacilities
                        ? Data.ProfileFacilities.slice(0, 4).map((Aloc, i) => {
                            return i < 6 ? (
                              <View
                                style={[
                                  styles.col25,
                                  stylesGlobal.alignItemsCenter,
                                ]}
                                key={i}
                              >
                                <Image
                                  source={facilitiesAccommodation(Aloc.Id)}
                                  style={styles.image25}
                                />
                                <Text
                                  style={[
                                    styles.text12NoBold,
                                    styles.textCenter,
                                  ]}
                                >
                                  {Aloc.Name}
                                </Text>
                              </View>
                            ) : null;
                          })
                        : null
                      : null}
                  </View>
                  {Data ? (
                    Data.ProfileFacilities ? (
                      Data.ProfileFacilities.length > 4 ? (
                        <Text
                          onPress={() =>
                            this.handleAllService(Data.ProfileFacilities)
                          }
                          style={styles.seall}
                        >
                          See all facilities
                        </Text>
                      ) : null
                    ) : null
                  ) : null}
                  {Data ? (
                    Data.AccommodationLocations ? (
                      <View
                        style={[stylesGlobal.width100, stylesGlobal.hidden]}
                      >
                        <SeperatorRepeat
                          repeat={35}
                          widthsepar={8}
                          heightSepar={1}
                          colorSepar="#777"
                        />
                      </View>
                    ) : null
                  ) : null}
                  {Data ? (
                    Data.AccommodationLocations ? (
                      <Text style={styles.bold14}>Location</Text>
                    ) : null
                  ) : null}
                  <View style={[styles.rowNoPadding, styles.marginBottom10]}>
                    {Data
                      ? Data.AccommodationLocations
                        ? Data.AccommodationLocations.slice(0, 4).map(
                            (Aloc, i) => {
                              return (
                                <View
                                  style={[
                                    styles.col25,
                                    stylesGlobal.alignItemsCenter,
                                  ]}
                                  key={i}
                                >
                                  <Image
                                    source={locationAccommodation(Aloc.Id)}
                                    style={styles.image25}
                                  />
                                  <Text
                                    style={[
                                      styles.text12NoBold,
                                      styles.textCenter,
                                    ]}
                                  >
                                    {Aloc.Name}
                                  </Text>
                                </View>
                              );
                            }
                          )
                        : null
                      : null}
                  </View>
                  {Data ? (
                    Data.AccommodationLocations ? (
                      Data.AccommodationLocations.length > 4 ? (
                        <Text
                          onPress={() =>
                            this.handleAllNearbyLocation(
                              Data.AccommodationLocations
                            )
                          }
                          style={[styles.seall, stylesGlobal.marginBottom20]}
                        >
                          See all location
                        </Text>
                      ) : null
                    ) : null
                  ) : null}
                </View>
                {this.state.lat || this.state.long ? (
                  <MapView
                    style={styles.containerMap}
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
                        source={IconMapIOS}
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

export default DetailAccommodation;
