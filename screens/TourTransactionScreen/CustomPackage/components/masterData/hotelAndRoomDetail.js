import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import {Container} from '../../../../../components/container';
import {SeperatorRepeat} from '../../../../../components/list';
import {Card} from '../../../../../components/card';
import styles from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons, Entypo} from '@expo/vector-icons';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import IMAGES from '../../../../../assets/images/NoImage.png';

import BedOnly from '../../../../../assets/images/room-only.png';
import Breakfast from '../../../../../assets/images/breakfast.png';
import FullBoard from '../../../../../assets/images/fullboard.png';
import HalfBoard from '../../../../../assets/images/halfboard.png';
import {Loading} from '../../../../../components/loading';
import stylesGlobal from '../../../../../components/styles';
class hotelAndRoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params.Data,
      loading: false,
      scrollY: new Animated.Value(0),
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    dataRoom: PropTypes.array,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
  }

  backButton = () => {
    this.props.navigation.pop();
  };

  updateIndex = index => {
    this.setState(
      {
        Selected: index,
        Service: this.state.Room.AccommodationItemServiceTypes[index],
      },
      () => this.handleAccomodation()
    );
  };

  handleAccomodation = () => {
    this.setState({loading: true});
    this.props.navigation.pop();
    this.props.navigation.pop();
    this.props.navigation.pop();
    this.props.route.params.Data.Parameter.onSelect(
      this.state.Parameter.Index,
      this.state.Service,
      this.state.Room,
      this.state.Hotel
    );
  };

  render() {
    const containerWidth = Dimensions.get('window').width;
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
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Animated.View
          style={[
            styles.headerTransparent,
            {height: headerHeight, backgroundColor: backgroundColorAnimate},
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
              <Text style={styles.textHeader}>
                {this.state.Room ? this.state.Room.Name : ''}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
        {this.state.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : (
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
            ])}
          >
            <Container
              widthContainer={containerWidth}
              paddingbottomcontainer={20}
            >
              {this.state.Room ? (
                this.state.Room.ImageUrl != undefined &&
                this.state.Room.ImageUrl != '' ? (
                  <Image
                    source={{uri: this.state.Room.ImageUrl}}
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

              <Card widthCard="90%" topMargin={-50}>
                <View style={[styles.colNoPadding100, styles.colPadding20]}>
                  <Text
                    style={[
                      styles.text20,
                      styles.marginTop10,
                      styles.marginBottom10,
                      styles.paddingTop20,
                    ]}
                  >
                    {this.state.Room ? this.state.Room.Name : ''}
                  </Text>
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.marginBottom20,
                      stylesGlobal.alignItemsCenter,
                    ]}
                  >
                    <Text style={styles.accomodationTypeText}>
                      {this.state.Room
                        ? this.state.Room.AccommodationType.Name
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[styles.rowNoPadding, stylesGlobal.alignItemsCenter]}
                  >
                    {this.state.Room ? (
                      this.state.Room.Explanation.length <= 250 ? (
                        <Text style={[styles.text12Wrap, styles.lineHeight20]}>
                          {this.state.Room.Explanation}
                        </Text>
                      ) : (
                        <View style={styles.colNoPadding100}>
                          <View style={styles.rowNoPadding}>
                            <Text
                              style={[styles.text12Wrap, styles.lineHeight20]}
                            >
                              {this.state.Room.Explanation.slice(0, 250)} ...{' '}
                            </Text>
                          </View>
                          <View
                            style={[styles.rowNoPadding, styles.paddingTop20]}
                          >
                            <Text style={styles.seall}>Read More</Text>
                          </View>
                        </View>
                      )
                    ) : null}
                  </View>
                </View>
                {/* <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    heightSepar={1}
                    widthsepar={8}
                    colorSepar="#777"
                  />
                </View>
                <View
                  style={[
                    styles.colNoPadding100,
                    styles.colPadding20,
                    stylesGlobal.paddingBottom20,
                  ]}
                >
                  <Text style={styles.bold14}>Room Amenities</Text>
                  <View style={styles.colNoPadding100}>
                    <View style={styles.rowNoPadding}>
                      <Entypo
                        name="dot-single"
                        size={28}
                        style={stylesGlobal.alignSelfCenter}
                        color="#555555"
                      />
                      <Text style={stylesGlobal.alignSelfCenter}>
                        Air Conditioner
                      </Text>
                    </View>
                  </View> */}
                {/* <Text style={[styles.seall, styles.paddingBottom20]}>
                    See all facilities
                  </Text> */}
                {/* </View> */}
              </Card>
              <Text
                style={[
                  stylesGlobal.text16,
                  stylesGlobal.textBold,
                  stylesGlobal.padding20,
                  stylesGlobal.alignSelfStart,
                ]}
              >
                Choose Service
              </Text>

              <View
                style={[stylesGlobal.row100, stylesGlobal.paddingHorizontal20]}
              >
                {this.state.Room
                  ? this.state.Room.AccommodationItemServiceTypes.map(
                      (name, i) => {
                        return (
                          <TouchableOpacity
                            style={styles.stylesService}
                            key={i}
                            onPress={() => this.updateIndex(i)}
                          >
                            {name == 'Bed_only' ? (
                              <Image
                                style={stylesGlobal.imageIcon}
                                source={BedOnly}
                                resizeMode="cover"
                              />
                            ) : name == 'With_breakfast' ? (
                              <Image
                                style={stylesGlobal.imageIcon}
                                source={Breakfast}
                                resizeMode="cover"
                              />
                            ) : name == 'Half_board' ? (
                              <Image
                                style={stylesGlobal.imageIcon}
                                source={HalfBoard}
                                resizeMode="cover"
                              />
                            ) : name == 'Full_board' ? (
                              <Image
                                style={stylesGlobal.imageIcon}
                                source={FullBoard}
                                resizeMode="cover"
                              />
                            ) : null}
                            <View style={styles.stylesTextService}>
                              <Text
                                style={[
                                  stylesGlobal.text18,
                                  stylesGlobal.textBold,
                                  stylesGlobal.alignTextCenter,
                                  styles.colorWhite,
                                ]}
                              >
                                {name.split('_').join(' ')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    )
                  : null}
              </View>
            </Container>
          </ScrollView>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataRoom: state.itemProfileReducer.dataRoom,
});

export default connect(mapStateToProps)(hotelAndRoomDetail);
