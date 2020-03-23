import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '../../../../../components/container';
import {
  ScrollView,
  View,
  Text,
  Modal,
  Picker,
  StatusBar,
  BackHandler,
  Platform,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import styles from './styles';
import stylesGlobal from '../../../../../components/styles';
import PropTypes from 'prop-types';
import {
  getTransportationUnitsFilter,
  resetStatusTransportationUnitsFilter,
} from '../../../../../actions/transportation/transportationAction';

import { SearchBar } from 'react-native-elements';
import {
  ClearButtonWithIcon,
  NormalButton,
} from '../../../../../components/button';
import { Loading } from '../../../../../components/loading';
import { CardAccomodation } from '../../../../../components/card';

import { Seperator } from '../../../../../components/list';
import { ModalSort } from '../../../../../components/modal/';

import { isThereExcursionMeal } from '../../../../../helper/dailyProgram';
import { transactionItem } from '../../../../../helper/transactionHelper';

class listTransportasiUnit extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listTransport: PropTypes.array,
    isTransport: PropTypes.string,
    transportRatingFilter: PropTypes.object,
    transportSeatFilter: PropTypes.object,
    transportTypeFilter: PropTypes.object,
    DailyProgram: PropTypes.array,
    CustomDetails: PropTypes.array,
    Returns: PropTypes.array,
    Departures: PropTypes.array,
    SummaryProgram: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      Filter: {
        transportRating: '',
        transportType: '',
        transportCapacities: '',
      },
      labelratingId: null,
      labelseatTypeId: null,
      labeltypeId: null,
      Mov: this.props.route.params.Mov,
      Item: {
        itemTransport: null,
        serviceItem: null,
        hoursItem: null,
      },
      modalVisible: false,
      modalVisibleSort: false,
      loading: true,
      duration: null,
      serviceId: null,
      transport: null,
      hiddenTransfer: false,
      listTransport: [],
      searchText: '',
    };
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  openModalSort = () => {
    this.setState({ modalVisibleSort: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, modalVisibleSort: false });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.cekHidden();
    let valueTo = this.state.Mov.TypeMovement.to.split(',');
    let item = transactionItem(
      this.props.CustomDetails,
      this.props.SummaryProgram,
      this.props.DailyProgram,
      this.props.Departures,
      this.props.Returns
    );
    const data = {
      fromCity: this.state.Mov.TypeMovement.from,
      toCities: valueTo[0],
      RatingId: '',
      seatTypeId: '',
      typeId: '',
      requestedDate: this.state.Mov.ActivityData.Startime.slice(0, -9),
      dataDemoPrice: item,
    };
    this.props.getTransportationUnitsFilter(data);
  }

  cekHidden = async () => {
    let DP = this.props.route.params.DP;
    let dayIndex = this.props.route.params.dayIndex;
    let moveIndex = this.props.route.params.moveIndex;
    let status = await isThereExcursionMeal(DP, dayIndex, moveIndex);
    this.setState({ hiddenTransfer: status });
  };

  componentDidUpdate() {
    if (this.props.isTransport === 'success') {
      this.setState({ listTransport: this.props.listTransport });
      this.props.resetStatusTransportationUnitsFilter();
      this.setState({ loading: false });
      return false;
    } else if (this.props.isTransport === 'failed') {
      this.props.resetStatusTransportationUnitsFilter();
      this.setState({ loading: false });
      return false;
    } else return true;
  }

  handleUnitTransportDetail = async item => {
    await this.setState({
      Item: {
        ...this.state.Item,
        itemTransport: item,
      },
    });
    this.props.navigation.navigate('TransportasiUnitDetail', {
      Item: this.state.Item,
      Mov: this.state.Mov,
      hiddenTransfer: this.state.hiddenTransfer,
      dayIndex: this.props.route.params.dayIndex,
      moveIndex: this.props.route.params.moveIndex,
    });
  };

  handleSort = type => {
    if (type === 'High') {
      this.props.listTransport.sort(function(a, b) {
        if (a.TransportationSeatTypeId < b.TransportationSeatTypeId) return 1;
        else if (a.TransportationSeatTypeId > b.TransportationSeatTypeId)
          return -1;
      });
    }
    if (type === 'Low') {
      this.props.listTransport.sort(function(a, b) {
        if (a.TransportationSeatTypeId < b.TransportationSeatTypeId) return -1;
        else if (a.TransportationSeatTypeId > b.TransportationSeatTypeId)
          return 1;
      });
    }
    this.setState({
      modalVisible: false,
      modalVisibleSort: false,
    });
  };

  handleFilter = value => {
    let updatedList = this.props.listTransport;
    updatedList = updatedList.filter(v => {
      if (v.TransportationTypeId == value.transportType) {
        return true;
      }
      if (v.TransportationRatingId == value.transportRating) {
        return true;
      }
      if (v.TransportationSeatTypeId == value.transportCapacities) {
        return true;
      }
      return false;
    });
    this.setState({
      listTransport: updatedList,
      modalVisible: false,
      modalVisibleSort: false,
    });
  };

  _handleSearch = value => {
    this.setState({ searchText: value });
    let updatedList = this.props.listTransport;
    updatedList = updatedList.filter(v => {
      if (v.Name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ listTransport: updatedList });
  };

  render() {
    return (
      <Container>
        {/* <SearchBar
          clearIcon={{ color: 'red' }}
          searchIcon={true}
          onChangeText={this._handleSearch}
          placeholder="Type Here..."
          lightTheme
          containerStyle={stylesGlobal.width100}
        /> */}
        {this.state.loading ? (
          <Loading
            sizeloading="large"
            colorloading={styles.$goldcolor}
            positionLoad="relative"
          />
        ) : null}
        <ScrollView
          style={[stylesGlobal.containerScroll, stylesGlobal.paddingVertical80]}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisibleSort || this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(
                !this.state.modalVisibleSort || this.state.modalVisible
              );
            }}
          >
            <View style={styles.modalContainer}>
              {this.state.modalVisibleSort ? (
                <ModalSort
                  text1="Highest Passenger"
                  onPressPopuler={() => this.handleSort('High')}
                  text2="Lowest Passenger"
                  onPressHigh={() => this.handleSort('Low')}
                  type="dua"
                  onPress={this.closeModal}
                />
              ) : (
                <View style={[styles.innerContainer, styles.bottom]}>
                  <Text style={styles.bold14}>Filter:</Text>
                  <Text>Transportation Rating</Text>
                  {Platform.OS === 'ios' ? (
                    <IOSPicker
                      mode="modal"
                      textStyle={styles.textblack}
                      style={styles.containerDropDown}
                      selectedValue={
                        this.state.Filter.transportRating
                          ? this.state.labelratingId == 0
                            ? 'Transportation Rating'
                            : this.props.transportRatingFilter[
                                this.state.labelratingId - 1
                              ].Name
                          : 'Transportation Rating'
                      }
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                          Filter: {
                            ...this.state.Filter,
                            transportRating: itemValue,
                          },
                          labelratingId: itemIndex,
                        });
                      }}
                    >
                      <Picker.Item label="Transportation Rating" value="" />
                      {this.props.transportRatingFilter
                        ? this.props.transportRatingFilter.map(
                            (type, index) => {
                              return (
                                <Picker.Item
                                  label={type.Name}
                                  value={type.Id}
                                  key={index}
                                />
                              );
                            }
                          )
                        : null}
                    </IOSPicker>
                  ) : (
                    <Picker
                      mode="dialog"
                      textStyle={styles.textblack}
                      style={styles.containerDropDown}
                      selectedValue={this.state.Filter.transportRating}
                      onValueChange={itemValue => {
                        this.setState({
                          Filter: {
                            ...this.state.Filter,
                            transportRating: itemValue,
                          },
                        });
                      }}
                    >
                      <Picker.Item label="Transportation Rating" value="" />
                      {this.props.transportRatingFilter
                        ? this.props.transportRatingFilter.map(
                            (type, index) => {
                              return (
                                <Picker.Item
                                  label={type.Name}
                                  value={type.Id}
                                  key={index}
                                />
                              );
                            }
                          )
                        : null}
                    </Picker>
                  )}
                  <Seperator
                    widthsepar="100%"
                    colorSepar={styles.$blacklight2color}
                    heightSepar={1}
                  />
                  <Text>Transportation Types</Text>
                  {Platform.OS === 'ios' ? (
                    <IOSPicker
                      mode="modal"
                      textStyle={styles.textblack}
                      style={styles.containerDropDown}
                      selectedValue={
                        this.state.Filter.transportType
                          ? this.state.labelseatTypeId == 0
                            ? 'Transportation Type'
                            : this.props.transportTypeFilter[
                                this.state.labelseatTypeId - 1
                              ].Name
                          : 'Transportation Type'
                      }
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                          Filter: {
                            ...this.state.Filter,
                            transportType: itemValue,
                          },
                          labelseatTypeId: itemIndex,
                        });
                      }}
                    >
                      <Picker.Item label="Transportation Type" value="" />
                      {this.props.transportTypeFilter
                        ? this.props.transportTypeFilter.map((type, index) => {
                            return (
                              <Picker.Item
                                label={type.Name}
                                value={type.Id}
                                key={index}
                              />
                            );
                          })
                        : null}
                    </IOSPicker>
                  ) : (
                    <Picker
                      mode="dialog"
                      textStyle={styles.textblack}
                      style={styles.containerDropDown}
                      selectedValue={this.state.Filter.transportType}
                      onValueChange={itemValue => {
                        this.setState({
                          Filter: {
                            ...this.state.Filter,
                            transportType: itemValue,
                          },
                        });
                      }}
                    >
                      <Picker.Item label="Transportation Type" value="" />
                      {this.props.transportTypeFilter
                        ? this.props.transportTypeFilter.map((type, index) => {
                            return (
                              <Picker.Item
                                label={type.Name}
                                value={type.Id}
                                key={index}
                              />
                            );
                          })
                        : null}
                    </Picker>
                  )}
                  <Seperator
                    widthsepar="100%"
                    colorSepar={styles.$blacklight2color}
                    heightSepar={1}
                  />
                  <Text>Transportation Capacities</Text>
                  {Platform.OS === 'ios' ? (
                    <IOSPicker
                      mode="modal"
                      textStyle={styles.textblack}
                      style={styles.containerDropDown}
                      selectedValue={
                        this.state.Filter.transportCapacities
                          ? this.state.labeltypeId == 0
                            ? 'Transportation Capacities'
                            : this.props.transportSeatFilter[
                                this.state.labeltypeId - 1
                              ].Name
                          : 'Transportation Capacities'
                      }
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                          Filter: {
                            ...this.state.Filter,
                            transportCapacities: itemValue,
                          },
                          labeltypeId: itemIndex,
                        });
                      }}
                    >
                      <Picker.Item label="Transportation Capacities" value="" />
                      {this.props.transportSeatFilter
                        ? this.props.transportSeatFilter.map((seat, i) => {
                            return (
                              <Picker.Item
                                label={seat.Name}
                                value={seat.Id}
                                key={i}
                              />
                            );
                          })
                        : null}
                    </IOSPicker>
                  ) : (
                    <Picker
                      mode="dialog"
                      textStyle={styles.textblack}
                      style={styles.containerDropDown}
                      selectedValue={this.state.Filter.transportCapacities}
                      onValueChange={itemValue => {
                        this.setState({
                          Filter: {
                            ...this.state.Filter,
                            transportCapacities: itemValue,
                          },
                        });
                      }}
                    >
                      <Picker.Item label="Transportation Capacities" value="" />
                      {this.props.transportSeatFilter
                        ? this.props.transportSeatFilter.map((seat, i) => {
                            return (
                              <Picker.Item
                                label={seat.Name}
                                value={seat.Id}
                                key={i}
                              />
                            );
                          })
                        : null}
                    </Picker>
                  )}
                  <Seperator
                    widthsepar="100%"
                    colorSepar={styles.$blacklight2color}
                    heightSepar={1}
                  />
                  <View style={styles.row}>
                    <View style={styles.colNoPadding50}>
                      <NormalButton
                        text="RESET"
                        buttonHeight={25}
                        buttonWidth="98%"
                        buttonColor="white"
                        textColor={styles.$goldcolor}
                        colorBorder={styles.$goldcolor}
                        onPress={this.closeModal}
                      />
                    </View>
                    <View style={styles.colNoPadding50}>
                      <NormalButton
                        text="DONE"
                        buttonHeight={25}
                        buttonWidth="98%"
                        textColor="black"
                        buttonColor={styles.$goldcolor}
                        onPress={() => this.handleFilter(this.state.Filter)}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </Modal>

          {/* <CardMasterData
              type="transport"
              typemasterdata="suplier"
              images={IMAGES}
              title="Cipaganti"
              area="istanbul"
              address="Oruç Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katlı İş Merkezi No:274, Esenler İstanbul Türkiye, 34235, Turki"
            /> */}
          <Container paddingtopcontainer={Platform.OS === 'ios' ? 20 : 40}>
            {this.state.listTransport
              .filter(trans => {
                if (
                  (this.state.hiddenTransfer == true &&
                    trans.TransportationItemServiceTypes.length == 1 &&
                    trans.TransportationItemServiceTypes[0].ServiceType ==
                      'Transfer') ||
                  trans.TransportationItemServiceTypes[0].ServiceType ==
                    'Transfer_with_guide'
                ) {
                  return false;
                }
                return true;
              })
              .map((trans, i) => {
                return (
                  <CardAccomodation
                    widthCard="90%"
                    Img={trans.ImageUrl}
                    Title={trans.Name}
                    key={i}
                    onPress={() => this.handleUnitTransportDetail(trans)}
                    roundedText={trans.TransportationSeatTypeName}
                    roundedTextTrans={trans.TransportationRatingName}
                    typeCard="Transport"
                    bottomText={trans.Description}
                    estimatedPrice={
                      trans.EstimatedTotalPrice
                        ? trans.EstimatedTotalPrice.Price
                        : ''
                    }
                    currency={
                      trans.EstimatedTotalPrice
                        ? trans.EstimatedTotalPrice.CurrencyId
                        : ''
                    }
                  />
                );

                // Address={resto.Address}
              })}
            <View
              style={[stylesGlobal.marginBottom80, stylesGlobal.width100]}
            />
          </Container>
        </ScrollView>
        <View
          style={[styles.header, styles.headerTop, stylesGlobal.paddingTop10]}
        >
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <SearchBar
            clearIcon={{ color: 'red' }}
            searchIcon={true}
            onChangeText={this._handleSearch}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.listTransport.length} Unit
            </Text>
          </View>
        </View>

        <View style={styles.footerFilter}>
          <View style={styles.rowNoPaddingFilter}>
            <View style={[stylesGlobal.width50, stylesGlobal.paddingTop10]}>
              <ClearButtonWithIcon
                text="Filter"
                textColor="white"
                bold
                textSize={12}
                iconSize={22}
                colorIcon="white"
                iconName="filter-outline"
                onPress={this.openModal}
                positionText="bawah"
              />
            </View>
            <View style={[stylesGlobal.width50, stylesGlobal.paddingTop10]}>
              <ClearButtonWithIcon
                text="Sort"
                textColor="white"
                bold
                textSize={12}
                iconSize={22}
                colorIcon="white"
                iconName="sort-ascending"
                onPress={this.openModalSort}
                positionText="bawah"
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listTransport: state.transportationReducer.transportationUnitsFilter,
  isTransport: state.transportationReducer.getTransportationUnitsFilterStatus,
  transportRatingFilter:
    state.transportationReducer.transportationProfileRatings,
  transportSeatFilter: state.transportationReducer.transportationSeatTypes,
  transportTypeFilter: state.transportationReducer.transportationTypes,
  DailyProgram: state.transactionReducer.DailyProgram,
  CustomDetails: state.transactionReducer.CustomDetails,
  Returns: state.transactionReducer.Returns,
  Departures: state.transactionReducer.Departures,
  SummaryProgram: state.transactionReducer.SummaryProgram,
});

export default connect(mapStateToProps, {
  getTransportationUnitsFilter,
  resetStatusTransportationUnitsFilter,
})(listTransportasiUnit);
