import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Picker,
  Animated,
  StatusBar,
  BackHandler,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import IOSPicker from 'react-native-ios-picker';
import {Container} from '../../../../../components/container';
import {Card} from '../../../../../components/card';
import styles from './styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import imagebg from '../../../../../assets/images/NoImage.png';
import {NormalButton} from '../../../../../components/button';
import {SeperatorRepeat} from '../../../../../components/list/index';
import {addItemTransportation} from '../../../../../helper/dailyProgram';
import {set_daily_program} from '../../../../../actions/customAction';
import stylesGlobal from '../../../../../components/styles';
import IconSeat from '../../../../../assets/Icon/seat.png';
class transportasiUnitDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    dailyProgram: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      Item: this.props.route.params.Item,
      Mov: this.props.route.params.Mov,
      LabelSerciceItem: null,
      labelDuration: null,
      Hidden: this.props.route.params.hiddenTransfer,
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
  }

  handleSelected = async () => {
    let DP = addItemTransportation(
      this.props.dailyProgram,
      this.props.route.params.dayIndex,
      this.props.route.params.moveIndex,
      this.state.Item.itemTransport,
      this.state.Item.serviceItem,
      this.state.Item.hoursItem
    );
    await this.props.dispatch(await set_daily_program(DP));
    this.props.navigation.pop();
    this.props.navigation.pop();
  };

  render() {
    let dataItem = this.state.Item.itemTransport.TransportationItemServiceTypes.filter(
      item => {
        if (item.ServiceType == 'Transfer' && this.state.Hidden == true) {
          return false;
        } else if (
          item.ServiceType == 'Transfer_with_guide' &&
          this.state.Hidden == true
        ) {
          return false;
        }
        return true;
      }
    );
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
              onPress={() => this.props.navigation.pop()}
            >
              <Ionicons name="ios-arrow-back" size={35} color="#252525" />
            </TouchableOpacity>
            <View style={styles.topNavTextDetail}>
              <Text style={styles.textHeader}>
                {this.state.Item.itemTransport.Name}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
        <ScrollView
          style={styles.scroll}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.state.scrollY}},
            },
          ])}
        >
          <Container>
            {this.state.Item.itemTransport.ImageUrl != null &&
            this.state.Item.itemTransport.ImageUrl != '' ? (
              <Image
                source={{uri: this.state.Item.itemTransport.ImageUrl}}
                resizeMode="contain"
                style={styles.carouselImage}
              />
            ) : (
              <Image
                source={imagebg}
                resizeMode="center"
                style={styles.carouselImage}
              />
            )}
            <Card type="Flat" widthCard="100%" topMargin={-50}>
              <View style={stylesGlobal.padding20}>
                <Text style={styles.text18}>
                  {this.state.Item.itemTransport.Name}
                </Text>

                <View
                  style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                >
                  <View
                    style={[
                      stylesGlobal.marginBottom10,
                      stylesGlobal.row,
                      styles.paddingVertical5,
                      styles.marginRight5,
                    ]}
                  >
                    <Text style={[stylesGlobal.text14, styles.colorblacklight]}>
                      {this.state.Item.itemTransport.TransportationRatingName}
                    </Text>
                  </View>
                  <View
                    style={[
                      stylesGlobal.marginBottom10,
                      stylesGlobal.row,
                      stylesGlobal.alignItemsCenter,
                    ]}
                  >
                    <View
                      style={[
                        stylesGlobal.containerIcon30,
                        stylesGlobal.padding5,
                      ]}
                    >
                      <Image
                        source={IconSeat}
                        style={[
                          stylesGlobal.imageIcon,
                          {tintColor: styles.$blacklight4color},
                        ]}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={[stylesGlobal.text14, styles.colorblacklight]}>
                      {this.state.Item.itemTransport.TransportationSeatTypeId}{' '}
                      Passenger
                    </Text>
                  </View>
                </View>
                <Text style={styles.text12Wrap}>
                  {this.state.Item.itemTransport.Description}
                </Text>
                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>

                <View style={stylesGlobal.width100}>
                  {/* <View style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.text14}>Transport Supplied by:</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.text14}>SUPPLIER NAME</Text>
                    </View>
                  </View> */}
                  <View
                    style={[stylesGlobal.width100, stylesGlobal.marginBottom10]}
                  >
                    <Text
                      style={[
                        stylesGlobal.text14,
                        stylesGlobal.textBold,
                        styles.colorblacklight,
                      ]}
                    >
                      Offer Detail
                    </Text>
                  </View>
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.marginBottom10]}
                  >
                    <View style={stylesGlobal.width50}>
                      <Text>Transportation supplied by:</Text>
                    </View>
                    <View style={stylesGlobal.width50}>
                      <Text>Supplier Name</Text>
                    </View>
                  </View>
                  <Text style={styles.textTourType}>Type of Service</Text>
                  <View
                    style={[
                      stylesGlobal.width100,
                      styles.containerDropDown,
                      styles.marginBottom10,
                    ]}
                  >
                    {Platform.OS === 'ios' ? (
                      <IOSPicker
                        mode="modal"
                        textStyle={styles.textPicker}
                        style={styles.dropdownIos}
                        selectedValue={
                          this.state.Item ? (
                            this.state.Item.serviceItem ? (
                              this.state.Item.serviceItem
                            ) : (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2,
                                ]}
                              >
                                Choose type of service
                              </Text>
                            )
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose type of service
                            </Text>
                          )
                        }
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({
                            Item: {
                              ...this.state.Item,
                              serviceItem: itemValue,
                            },
                            LabelSerciceItem: itemIndex,
                          });
                        }}
                      >
                        <Picker.Item
                          label="Type of Service"
                          value=""
                          color={styles.$greylight2color}
                        />
                        {this.state.Item
                          ? this.state.Item.itemTransport
                              .TransportationItemServiceTypes
                            ? dataItem.map((services, i) => {
                                return (
                                  <Picker.Item
                                    label={services.ServiceType.split('_').join(
                                      ' '
                                    )}
                                    value={services.ServiceType}
                                    key={i}
                                  />
                                );
                              })
                            : null
                          : null}
                      </IOSPicker>
                    ) : (
                      <Picker
                        mode="dialog"
                        textStyle={styles.textPicker}
                        style={styles.containerDropDownAndroid}
                        selectedValue={
                          this.state.Item.serviceItem ? (
                            this.state.Item.serviceItem
                          ) : (
                            <Text
                              style={[
                                styles.colorlightGrey,
                                stylesGlobal.text14,
                              ]}
                            >
                              Choose Type of Service
                            </Text>
                          )
                        }
                        onValueChange={itemValue => {
                          this.setState({
                            Item: {
                              ...this.state.Item,
                              serviceItem: itemValue,
                            },
                          });
                        }}
                      >
                        <Picker.Item
                          label="Type Of Service"
                          style={styles.textPicker}
                          value=""
                          color={styles.$iosShadowcolor}
                        />
                        {this.state.Item
                          ? this.state.Item.itemTransport
                              .TransportationItemServiceTypes
                            ? dataItem.map((services, i) => {
                                return (
                                  <Picker.Item
                                    label={services.ServiceType.split('_').join(
                                      ' '
                                    )}
                                    value={services.ServiceType}
                                    key={i}
                                  />
                                );
                              })
                            : null
                          : null}
                      </Picker>
                    )}
                  </View>
                  {this.state.Item.serviceItem != null ? (
                    <View style={styles.colNoPaddingLeft}>
                      <Text style={styles.textTourType}>Duration</Text>
                    </View>
                  ) : null}
                  {this.state.Item.serviceItem != null ? (
                    <View
                      style={[
                        stylesGlobal.width100,
                        styles.containerDropDown,
                        styles.marginBottom40,
                      ]}
                    >
                      {Platform.OS === 'ios' ? (
                        <IOSPicker
                          mode="modal"
                          textStyle={styles.textPicker}
                          style={styles.dropdownIos}
                          selectedValue={
                            this.state.Item.hoursItem ? (
                              this.state.LabelSerciceItem == 0 ? (
                                <Text
                                  style={[
                                    stylesGlobal.text14,
                                    styles.colorgreylight2,
                                  ]}
                                >
                                  Choose duration
                                </Text>
                              ) : (
                                this.state.Item.itemTransport
                                  .TransportationItemServiceTypes[
                                  this.state.LabelSerciceItem - 1
                                ].Hours[this.state.labelDuration - 1].Name
                              )
                            ) : (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2,
                                ]}
                              >
                                Choose duration
                              </Text>
                            )
                          }
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                              Item: {
                                ...this.state.Item,
                                hoursItem: itemValue,
                              },
                              labelDuration: itemIndex,
                            });
                          }}
                        >
                          <Picker.Item
                            label="Duration"
                            value=""
                            color={styles.$greylight2color}
                          />
                          {this.state.Item.itemTransport.TransportationItemServiceTypes.find(
                            item =>
                              item.ServiceType == this.state.Item.serviceItem
                          ).Hours.map((data, i) => {
                            return (
                              <Picker.Item
                                label={data.Name}
                                value={data}
                                key={i}
                              />
                            );
                          })}
                        </IOSPicker>
                      ) : (
                        <Picker
                          mode="dialog"
                          textStyle={styles.textPicker}
                          style={styles.containerDropDownAndroid}
                          selectedValue={
                            this.state.Item.hoursItem ? (
                              this.state.Item.hoursItem
                            ) : (
                              <Text
                                style={[
                                  styles.colorlightGrey,
                                  stylesGlobal.text14,
                                ]}
                              >
                                Choose duration
                              </Text>
                            )
                          }
                          onValueChange={itemValue => {
                            this.setState({
                              Item: {
                                ...this.state.Item,
                                hoursItem: itemValue,
                              },
                            });
                          }}
                        >
                          <Picker.Item
                            label="Duration"
                            style={styles.textPicker}
                            value=""
                            color={styles.$iosShadowcolor}
                          />
                          {this.state.Item.itemTransport.TransportationItemServiceTypes.find(
                            item =>
                              item.ServiceType == this.state.Item.serviceItem
                          ).Hours.map((data, i) => {
                            return (
                              <Picker.Item
                                label={data.Name}
                                value={data}
                                key={i}
                              />
                            );
                          })}
                        </Picker>
                      )}
                    </View>
                  ) : null}
                </View>
              </View>
            </Card>
          </Container>
        </ScrollView>
        <TouchableOpacity
          style={[styles.footer, styles.bottom0]}
          onPress={this.handleSelected}
        >
          <LinearGradient
            colors={['#e6ca6b', '#ffd734']}
            style={[styles.footer, styles.bottom0]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="Choose Unit"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={this.handleSelected}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dailyProgram: state.cusPackagesReducer.DailyProgram,
});

export default connect(mapStateToProps)(transportasiUnitDetail);
