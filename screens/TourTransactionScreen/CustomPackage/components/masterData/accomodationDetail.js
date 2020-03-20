import React, { Component } from "react";
import { Container } from "../../components/container";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  BackHandler,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity
} from "react-native";
import stylesGlobal from "../../components/styles";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import { SeperatorRepeat } from "../../components/list/index";
import { Card, CardHotel } from "../../components/card/index";
import styles from "./styles";
import { RoundedLoading, MenuLoading } from "../../components/loading";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { handleFilterImagePrimary } from "../../helper/checkingHelper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IMAGES from "../../assets/images/NoImage.png";
import {
  get_accommodation_by_id,
  get_room_accomodation_item
} from "../../actions/itemProfileAction";
import {
  locationAccommodation,
  facilitiesAccommodation
} from "../../helper/checkingHelper";
import IconMap from "../../assets/Icon/map_hotel.png";
import IconMapIOS from "../../assets/Icon/map_hotelIOS.png";
import { transactionItem } from "../../helper/transactionHelper";

class accomodationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Parameter: this.props.navigation.state.params.Parameter,
      Hotel: this.props.navigation.state.params.hotel,
      Room: null,
      Service: null,
      loading: true,
      scrollY: new Animated.Value(0),
      keywords: "Coding Elements",
      coords: null,
      fullAddress: "",
      lat: null,
      long: null,
      statusDesc: "Read More",
      error: ""
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    data: PropTypes.object,
    dataRoom: PropTypes.array,
    isDataRoom: PropTypes.string,
    DailyProgram: PropTypes.array,
    CustomDetails: PropTypes.array,
    Returns: PropTypes.array,
    Departures: PropTypes.array,
    SummaryProgram: PropTypes.array
  };

  handleDetailRoom = room => {
    this.setState({ Room: room }, () => {
      this.props.navigation.navigate("HotelAndRoomDetail", {
        Data: this.state
      });
    });
  };
  backButton = () => {
    this.props.navigation.pop();
  };

  handleAllService = data => {
    this.props.navigation.navigate("AllServices", { data: data });
  };

  handleAllNearbyLocation = data => {
    this.props.navigation.navigate("AllNearbyLocation", { data: data });
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.props.dispatch(get_accommodation_by_id(this.state.Hotel.Id));
    const {
      StartDate,
      EndDate,
      useExtraBed,
      useChildExtraBed,
      useSharingBed,
      useSharingRoom,
      useSingleRoom
    } = this.state.Parameter;
    let item = transactionItem(
      this.props.CustomDetails,
      this.props.SummaryProgram,
      this.props.DailyProgram,
      this.props.Departures,
      this.props.Returns
    );
    this.props.dispatch(
      get_room_accomodation_item(
        this.state.Hotel.Id,
        StartDate,
        EndDate,
        useExtraBed,
        useChildExtraBed,
        useSharingBed,
        useSharingRoom,
        useSingleRoom,
        item
      )
    );
    let address = this.state.Hotel.Address ? this.state.Hotel.Address : "";
    address
      ? this.getLocation(address)
      : this.setState({ loading: false, lat: null, long: null });
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
          res.status == "ZERO_RESULTS"
            ? this.setState({
                lat: null,
                long: null,
                loading: false
              })
            : this.setState({
                lat: res.data.results[0].geometry.location.lat,
                long: res.data.results[0].geometry.location.lng,
                loading: false
              });
        });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  DescPress = () => {
    if (this.state.statusDesc == "Read More") {
      this.setState({ statusDesc: "Read Less" });
    } else this.setState({ statusDesc: "Read More" });
  };

  render() {
    const fullWidth = Dimensions.get("window").width;
    const width90 =
      Dimensions.get("window").width - Dimensions.get("window").width * 0.1;
    const Data = this.state.Hotel ? this.state.Hotel : "";
    const DataStar = Data.AccommodationRating || "";
    const Star = parseInt(DataStar.Id) || "";
    let stars = new Array(Star).fill(0);
    const HEADER_MAX_HEIGHT = 300;
    const HEADER_MIN_HEIGHT = 70;

    const backgroundColorAnimate = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", "white"],
      extrapolate: "clamp"
    });

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Animated.View
          style={[
            styles.headerTransparent,
            { height: headerHeight, backgroundColor: backgroundColorAnimate }
          ]}
        >
          <LinearGradient
            colors={["#e5e5e5", "rgba(255,255,255,0)"]}
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
              <Text style={styles.textHeader}>{Data ? Data.Name : ""}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: this.state.scrollY }
              }
            }
          ])}
        >
          <Container widthContainer={fullWidth}>
            {this.state.loading ? (
              <RoundedLoading width={fullWidth} height={350} />
            ) : Data ? (
              Data.ProfileImages.length != 0 ||
              (Data.ImageUrl != undefined && Data.ImageUrl != "") ? (
                <Image
                  source={{
                    uri:
                      Data.ProfileImages.length != 0
                        ? handleFilterImagePrimary(Data.ProfileImages)
                        : Data.ImageUrl
                  }}
                  resizeMode="cover"
                  style={styles.carouselImage}
                />
              ) : (
                <Image
                  source={IMAGES}
                  resizeMode="center"
                  style={styles.carouselImage}
                />
              )
            ) : (
              <Image
                source={IMAGES}
                resizeMode="center"
                style={styles.carouselImage}
              />
            )}

            <Card widthCard="100%" topMargin={-50} type="Flat">
              <View style={[styles.colNoPadding100, styles.colPadding20]}>
                {this.state.loading ? (
                  <View style={[styles.marginTop10, styles.marginBottom10]}>
                    <RoundedLoading width={300} height={30} />
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.text20,
                      styles.marginTop10,
                      styles.marginBottom10
                    ]}
                  >
                    {Data ? Data.Name : ""}
                  </Text>
                )}

                {this.state.loading ? (
                  <View style={styles.marginBottom20}>
                    <RoundedLoading width={150} column />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.marginBottom20,
                      stylesGlobal.alignItemsCenter
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
                      {Data ? (Data.City ? Data.City.Name : "") : ""}
                    </Text>
                  </View>
                )}

                {this.state.loading ? (
                  <RoundedLoading width={width90} line={2} />
                ) : Data ? (
                  Data.Desc.length <= 250 ? (
                    <Text style={styles.text12Wrap}>{Data.Desc}</Text>
                  ) : (
                    <View style={styles.rowNoPadding}>
                      <Text style={styles.text12Wrap}>
                        {this.state.statusDesc == "Read More"
                          ? Data.Desc.slice(0, 250)
                          : Data.Desc}
                        <Text style={styles.seall} onPress={this.DescPress}>
                          {this.state.statusDesc == "Read More" ? "... " : " "}
                          {this.state.statusDesc}
                        </Text>
                      </Text>
                    </View>
                  )
                ) : null}

                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={28}
                    heightSepar={1}
                    widthsepar={10}
                    colorSepar="#252525"
                  />
                </View>
                <Text style={styles.bold14}>Main Services </Text>

                {this.state.loading ? (
                  <MenuLoading />
                ) : (
                  <View style={[styles.rowNoPadding, styles.bottom]}>
                    {Data
                      ? Data.ProfileFacilities
                        ? Data.ProfileFacilities.slice(0, 4).map((Aloc, i) => {
                            return i < 6 ? (
                              <View
                                style={[
                                  styles.col25,
                                  stylesGlobal.alignItemsCenter
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
                                    styles.textCenter
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
                )}

                {this.state.loading ? (
                  <RoundedLoading width={100} height={20} />
                ) : Data ? (
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

                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={28}
                    heightSepar={1}
                    widthsepar={10}
                    colorSepar="#252525"
                  />
                </View>
                <Text style={styles.bold14}>Location</Text>

                {this.state.loading ? (
                  <View style={stylesGlobal.marginBottom10}>
                    <MenuLoading />
                  </View>
                ) : (
                  <View style={[styles.rowNoPadding, styles.marginBottom10]}>
                    {Data
                      ? Data.AccommodationLocations
                        ? Data.AccommodationLocations.slice(0, 4).map(
                            (Aloc, i) => {
                              return (
                                <View
                                  style={[
                                    styles.col25,
                                    stylesGlobal.alignItemsCenter
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
                                      styles.textCenter
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
                )}

                {this.state.loading ? (
                  <RoundedLoading width={100} height={20} />
                ) : Data ? (
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

              {this.state.loading ? (
                <RoundedLoading width={fullWidth} height={350} />
              ) : this.state.lat || this.state.long ? (
                <MapView
                  style={styles.containerMap}
                  pointerEvents="none"
                  region={{
                    latitude: this.state.lat,
                    longitude: this.state.long,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
                  }}
                >
                  <Marker
                    key={0}
                    coordinate={{
                      latitude: this.state.lat,
                      longitude: this.state.long
                    }}
                  >
                    <Image
                      source={Platform.OS === "ios" ? IconMapIOS : IconMap}
                      style={styles.image30}
                      resizeMode="contain"
                    />
                  </Marker>
                </MapView>
              ) : null}
            </Card>

            <View
              style={[
                styles.rowNoPadding,
                stylesGlobal.paddingHorizontal20,
                stylesGlobal.marginTop20
              ]}
            >
              <Text style={styles.bold14}>Choose your Room</Text>
            </View>

            {this.state.loading ? (
              <RoundedLoading width={width90} height={100} line={3} />
            ) : this.props.dataRoom ? (
              this.props.dataRoom.map((hotel, i) => {
                return (
                  <View
                    style={(styles.rowNoPadding, styles.colPadding20)}
                    key={i}
                  >
                    <CardHotel
                      hoteltype={hotel.Name}
                      statusRoom={hotel.IsInstantConfirmation}
                      hotelservice={hotel.AccommodationType.Name}
                      capacityroom={hotel.AccommodationType.Capacity}
                      namabutton="SELECT"
                      isPromo={hotel.IsPromo}
                      onPress={() => this.handleDetailRoom(hotel)}
                      estimatedPrice={
                        hotel.EstimatedTotalPrice
                          ? hotel.EstimatedTotalPrice.Price
                          : ""
                      }
                      currency={
                        hotel.EstimatedTotalPrice
                          ? hotel.EstimatedTotalPrice.CurrencyId
                          : ""
                      }
                    />
                  </View>
                );
              })
            ) : null}
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.itemProfileReducer.data,
  dataRoom: state.itemProfileReducer.dataRoom,
  isDataRoom: state.itemProfileReducer.isDataRoom,
  DailyProgram: state.cusPackagesReducer.DailyProgram,
  CustomDetails: state.transactionReducer.CustomDetails,
  Returns: state.cusPackagesReducer.Returns,
  Departures: state.cusPackagesReducer.Departures,
  SummaryProgram: state.cusPackagesReducer.SummaryProgram
});

export default connect(mapStateToProps)(accomodationDetail);
