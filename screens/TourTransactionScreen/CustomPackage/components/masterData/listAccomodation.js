import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Text,
  ScrollView,
  Modal,
  View,
  Picker,
  Image,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import {Container} from '../../../../../components/container';
import {CardAccomodation} from '../../../../../components/card';
import styles from './styles';
import stylesGlobal from '../../../../../components/styles';
// import { RoundedLoading } from "../../../../../components/loading";
import {SearchBar} from 'react-native-elements';
import {viewDateSlash} from '../../../../../helper/timeHelper';
// import {
//   get_accomodation,
//   // reset_accomodation_filter,
//   reset_accomodation,
//   set_city_accommodation,
import {
  getAccommodationProfileAction,
  resetAccommodationProfileAction,
  setCityAccommodationAction,
  getAccommodationFacilitiesAction,
  getAccommodationLocationAction,
  getAccommodationRatingAction,
  getAccommodationTypeAction,
} from '../../../../../actions/accommodation/accommodationAction';
import {
  ClearButtonWithIcon,
  NormalButton,
} from '../../../../../components/button';
import {Seperator} from '../../../../../components/list';
import IconClose from '../../../../../assets/Icon/close.png';
import {handleFilterImagePrimary} from '../../../../../helper/checkingHelper';

class listAccomodation extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listAccomodation: PropTypes.array,
    isAccomodation: PropTypes.string,
    accomodationFilter: PropTypes.object,
    isAccomodationFilter: PropTypes.string,
  };

  constructor (props) {
    super (props);
    this.state = {
      Filter: {
        ratingId: '',
        locationsId: '',
        typeId: '',
        facilityId: '',
        areaId: '',
      },
      labelratingId: null,
      labellocationsId: null,
      labeltypeId: null,
      labelfacilityId: null,
      labelareaId: null,
      Parameter: this.props.route.params.Parameter,
      AccomodationFilter: null,
      ListAccommodation: [],
      modalVisible: false,
      modalVisibleSort: false,
      loading: true,
      isReady: false,
      searchText: '',
      accommodationRatings: [],
      accommodationFacilities: [],
      accommodationTypes: [],
      accommodationLocations: [],
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listAccomodation: PropTypes.array,
    isAccomodation: PropTypes.string,
    accomodationFilter: PropTypes.object,
    isAccomodationFilter: PropTypes.string,
    cityAccommodation: PropTypes.string,
    accommodationRatings: PropTypes.array,
    // accommodationAreas: PropTypes.array,
    accommodationFacilities: PropTypes.array,
    accommodationTypes: PropTypes.array,
    accommodationLocations: PropTypes.array,
  };

  componentDidMount () {
    BackHandler.addEventListener ('hardwareBackPress', () => {
      this.props.navigation.pop (); // works best when the goBack is async
      return true;
    });

    const {
      ratingId,
      locationsId,
      typeId,
      facilityId,
      areaId,
    } = this.state.Filter;
    const {
      CityId,
      StartDate,
      useExtraBed,
      useChildExtraBed,
      useSharingBed,
      useSharingRoom,
      useSingleRoom,
      EndDate,
      dataDemoPrice,
    } = this.state.Parameter;
    if (this.props.cityAccommodation != CityId) {
      const data = {
        cityId: CityId,
        ratingId: ratingId,
        areaId: areaId,
        locationsId: locationsId,
        typeId: typeId,
        facilityId: facilityId,
        promoOnly: false,
        requestedDate: StartDate,
        useExtraBed: useExtraBed,
        useChildExtraBed: useChildExtraBed,
        useSharingBed: useSharingBed,
        sharingRoomPax: useSharingRoom,
        singleRoomPax: useSingleRoom,
        checkOutDate: EndDate,
        //tambahan estimated price
        dataDemoPrice: dataDemoPrice,
      };
      this.props.setCityAccommodationAction (CityId);
      this.props.getAccommodationProfileAction (data);
      this.props.getAccommodationFacilitiesAction ();
      this.props.getAccommodationLocationAction ();
      this.props.getAccommodationRatingAction ();
      this.props.getAccommodationTypeAction ();
    } else {
      if (this.props.listAccomodation) {
        if (this.props.listAccomodation.AccommodationResults) {
          this.setState ({
            ListAccommodation: this.props.listAccomodation.AccommodationResults,
            loading: false,
          });
        } else {
          this.props.dispatch (
            get_accomodation (
              CityId,
              ratingId,
              areaId,
              locationsId,
              typeId,
              facilityId,
              false,
              StartDate,
              useExtraBed,
              useChildExtraBed,
              useSharingBed,
              useSharingRoom,
              useSingleRoom,
              EndDate,
              //tambahan estimated price
              dataDemoPrice
            )
          );
        }
      } else {
        this.props.dispatch (
          get_accomodation (
            CityId,
            ratingId,
            areaId,
            locationsId,
            typeId,
            facilityId,
            false,
            StartDate,
            useExtraBed,
            useChildExtraBed,
            useSharingBed,
            useSharingRoom,
            useSingleRoom,
            EndDate,
            //tambahan estimated price
            dataDemoPrice
          )
        );
      }
    }
  }

  componentDidUpdate () {
    if (this.props.isAccomodation === 'success') {
      this.props.resetAccommodationProfileAction ();
      // this.props.dispatch(reset_accomodation());
      this.setState ({
        loading: false,
        ListAccommodation: this.props.listAccomodation.AccommodationResults,
        accommodationRatings: this.props.listAccomodation.FilterParameters
          .AccommodationRatings,
        accommodationFacilities: this.props.listAccomodation.FilterParameters
          .AccommodationProfileFacilities,
        accommodationTypes: this.props.listAccomodation.FilterParameters
          .AccommodationTypes,
        accommodationLocations: this.props.listAccomodation.FilterParameters
          .AccommodationLocations,
      });
      return false;
    } else if (this.props.isAccomodation === 'failed') {
      this.props.dispatch (reset_accomodation ());
      this.setState ({loading: false});
      return false;
    } else return true;
  }

  openModal = () => {
    this.setState ({modalVisible: true});
  };

  openModalSort = () => {
    this.setState ({modalVisibleSort: true});
  };

  closeModal = () => {
    this.setState ({modalVisible: false});
    this.setState ({modalVisibleSort: false});
    this.setState ({
      ListAccommodation: this.props.listAccomodation.AccommodationResults,
    });
  };

  handlePressCustom = () => {
    this.props.navigation.navigate ('customPackagesOption');
  };

  handlePressDetail = hotel => {
    this.props.navigation.navigate ('AccomodationDetail', {
      hotel: hotel,
      Parameter: this.state.Parameter,
    });
  };

  handleSort = type => {
    if (type === 'High') {
      this.props.listAccomodation.AccommodationResults.sort (function (a, b) {
        if (a.AccommodationRating.Id < b.AccommodationRating.Id) return 1;
        else if (a.AccommodationRating.Id > b.AccommodationRating.Id) return -1;
      });
    }
    if (type === 'Low') {
      this.props.listAccomodation.AccommodationResults.sort (function (a, b) {
        if (a.AccommodationRating.Id < b.AccommodationRating.Id) return -1;
        else if (a.AccommodationRating.Id > b.AccommodationRating.Id) return 1;
      });
    }
    this.setState ({
      modalVisible: false,
      modalVisibleSort: false,
    });
  };

  handleFilter = value => {
    let updatedList = this.props.listAccomodation.AccommodationResults;
    updatedList = updatedList.filter (v => {
      if (v.AccommodationLocations.Id == value.locationsId) {
        return true;
      }
      if (v.AccommodationType.Id == value.typeId) {
        return true;
      }
      if (v.ProfileFacilities.Id == value.facilityId) {
        return true;
      }
      // if (v.Area.Id == value.areaId) {
      //   return true;
      // }
      if (v.AccommodationRating.Id == value.ratingId) {
        return true;
      }
      return false;
    });
    this.setState ({
      ListAccommodation: updatedList,
      modalVisible: false,
      modalVisibleSort: false,
    });
  };

  _handleSearch = value => {
    this.setState ({searchText: value});
    let updatedList = this.props.listAccomodation.AccommodationResults;
    updatedList = updatedList.filter (v => {
      if (v.Name.toLowerCase ().indexOf (value.toLowerCase ()) > -1) {
        return true;
      }
      return false;
    });
    this.setState ({ListAccommodation: updatedList});
  };

  render () {
    const width90 =
      Dimensions.get ('window').width - Dimensions.get ('window').width * 0.1;
    return (
      <Container>
        <ScrollView
          style={[stylesGlobal.containerScroll, stylesGlobal.paddingVertical80]}
        >
          <Container paddingbottomcontainer={80} paddingtopcontainer={20}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisibleSort || this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible (
                  !this.state.modalVisibleSort || this.state.modalVisible
                );
              }}
            >
              <View style={styles.modalContainer}>
                {this.state.modalVisibleSort
                  ? <View
                      style={[
                        styles.innerContainerSort,
                        stylesGlobal.padding20,
                      ]}
                    >
                      <Text
                        style={[
                          stylesGlobal.text18,
                          stylesGlobal.textBold,
                          stylesGlobal.marginBottom20,
                          stylesGlobal.marginTop10,
                        ]}
                      >
                        Sort
                      </Text>
                      <TouchableOpacity
                        onPress={this.closeModal}
                        style={[stylesGlobal.containerIcon20, styles.iconClose]}
                      >
                        <Image
                          style={[
                            stylesGlobal.imageIcon,
                            stylesGlobal.tintColorRed,
                          ]}
                          source={IconClose}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Seperator
                        colorSepar={styles.$blacklightcolor}
                        widthsepar="100%"
                        heightSepar={1}
                      />
                      <TouchableOpacity
                        onPress={() => this.handleSort ('High')}
                      >
                        <Text
                          style={[
                            stylesGlobal.text14,
                            stylesGlobal.textBold,
                            stylesGlobal.marginBottom20,
                            stylesGlobal.marginTop10,
                          ]}
                        >
                          Highest Star
                        </Text>
                      </TouchableOpacity>
                      <Seperator
                        colorSepar={styles.$blacklightcolor}
                        heightSepar={1}
                        widthsepar="100%"
                      />
                      <TouchableOpacity onPress={() => this.handleSort ('Low')}>
                        <Text
                          style={[
                            stylesGlobal.text14,
                            stylesGlobal.textBold,
                            stylesGlobal.marginBottom20,
                            stylesGlobal.marginTop10,
                          ]}
                        >
                          Lower Star
                        </Text>
                      </TouchableOpacity>
                    </View>
                  : <View
                      style={[styles.innerContainer, stylesGlobal.padding20]}
                    >
                      <Text
                        style={[
                          stylesGlobal.text18,
                          stylesGlobal.textBold,
                          stylesGlobal.marginBottom20,
                          stylesGlobal.marginTop10,
                        ]}
                      >
                        Filter
                      </Text>
                      <TouchableOpacity
                        onPress={this.closeModal}
                        style={[stylesGlobal.containerIcon20, styles.iconClose]}
                      >
                        <Image
                          style={[
                            stylesGlobal.imageIcon,
                            stylesGlobal.tintColorRed,
                          ]}
                          source={IconClose}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={[
                          stylesGlobal.textSemiBold,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        Location of Accomodation
                      </Text>
                      <View
                        style={[
                          stylesGlobal.row100,
                          styles.containerDropDown,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        {Platform.OS === 'ios'
                          ? <IOSPicker
                              mode="modal"
                              textStyle={styles.textPicker}
                              style={styles.dropdownIos}
                              selectedValue={
                                this.state.Filter.locationsId
                                  ? this.state.labellocationsId == 0
                                      ? 'Location Of Accomodation'
                                      : this.state.accommodationLocations[
                                          this.state.labellocationsId - 1
                                        ].Name
                                  : 'Location Of Accomodation'
                              }
                              onValueChange={(itemValue, itemIndex) => {
                                this.setState ({
                                  Filter: {
                                    ...this.state.Filter,
                                    locationsId: itemValue,
                                  },
                                  labellocationsId: itemIndex,
                                });
                              }}
                            >
                              <Picker.Item
                                label="Location Of Accomodation"
                                value=""
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              {this.state.accommodationLocations
                                ? this.state.accommodationLocations.map (
                                    (loc, i) => {
                                      return (
                                        <Picker.Item
                                          label={loc.Name}
                                          value={loc.Id}
                                          key={i}
                                          style={styles.textPicker}
                                        />
                                      );
                                    }
                                  )
                                : null}
                            </IOSPicker>
                          : <Picker
                              mode="dialog"
                              textStyle={styles.textPicker}
                              style={styles.containerDropDownAndroid}
                              selectedValue={this.state.Filter.locationsId}
                              onValueChange={itemValue => {
                                this.setState ({
                                  Filter: {
                                    ...this.state.Filter,
                                    locationsId: itemValue,
                                  },
                                });
                              }}
                            >
                              <Picker.Item
                                label="Location Of Accomodation"
                                value=""
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              {this.state.accommodationLocations
                                ? this.state.accommodationLocations.map (
                                    (loc, i) => {
                                      return (
                                        <Picker.Item
                                          label={loc.Name}
                                          value={loc.Id}
                                          key={i}
                                        />
                                      );
                                    }
                                  )
                                : null}
                            </Picker>}
                      </View>
                      <Text
                        style={[
                          stylesGlobal.textSemiBold,
                          stylesGlobal.marginBottom10,
                          stylesGlobal.marginTop10,
                        ]}
                      >
                        Accomodation Of Type
                      </Text>
                      <View
                        style={[
                          stylesGlobal.row100,
                          styles.containerDropDown,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        {Platform.OS === 'ios'
                          ? <IOSPicker
                              mode="modal"
                              textStyle={styles.textPicker}
                              style={styles.dropdownIos}
                              selectedValue={
                                this.state.Filter.typeId
                                  ? this.state.labeltypeId == 0
                                      ? 'Accomodation Of Type'
                                      : this.state.accommodationTypes[
                                          this.state.labeltypeId - 1
                                        ].Name
                                  : 'Accomodation Of Type'
                              }
                              onValueChange={(itemValue, itemIndex) => {
                                this.setState ({
                                  Filter: {
                                    ...this.state.Filter,
                                    typeId: itemValue,
                                  },
                                  labeltypeId: itemIndex,
                                });
                              }}
                            >
                              <Picker.Item
                                label="Accomodation Of Type"
                                value=""
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              {this.state.accommodationTypes
                                ? this.state.accommodationTypes.map (
                                    (type, index) => {
                                      return (
                                        <Picker.Item
                                          label={type.Name}
                                          value={type.Id}
                                          key={index}
                                          style={styles.textPicker}
                                        />
                                      );
                                    }
                                  )
                                : null}
                            </IOSPicker>
                          : <Picker
                              mode="dialog"
                              textStyle={styles.textPicker}
                              style={styles.containerDropDownAndroid}
                              selectedValue={this.state.Filter.typeId}
                              onValueChange={itemValue => {
                                this.setState ({
                                  Filter: {
                                    ...this.state.Filter,
                                    typeId: itemValue,
                                  },
                                });
                              }}
                            >
                              <Picker.Item
                                label="Accomodation Of Type"
                                value=""
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              {this.state.accommodationTypes
                                ? this.state.accommodationTypes.map (
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
                            </Picker>}
                      </View>
                      <Text
                        style={[
                          stylesGlobal.textSemiBold,
                          stylesGlobal.marginBottom10,
                          stylesGlobal.marginTop10,
                        ]}
                      >
                        Facilities
                      </Text>
                      <View
                        style={[
                          stylesGlobal.row100,
                          styles.containerDropDown,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        {Platform.OS === 'ios'
                          ? <IOSPicker
                              mode="modal"
                              textStyle={styles.textPicker}
                              style={styles.dropdownIos}
                              selectedValue={
                                this.state.Filter.facilityId
                                  ? this.state.labelfacilityId == 0
                                      ? 'Facilities'
                                      : this.state.accommodationFacilities[
                                          this.state.labelfacilityId - 1
                                        ].Name
                                  : 'Facilities'
                              }
                              onValueChange={(itemValue, itemIndex) => {
                                this.setState ({
                                  Filter: {
                                    ...this.state.Filter,
                                    facilityId: itemValue,
                                  },
                                  labelfacilityId: itemIndex,
                                });
                              }}
                            >
                              <Picker.Item
                                label="Facilities"
                                value=""
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              {this.state.accommodationFacilities
                                ? this.state.accommodationFacilities.map (
                                    (fac, i) => {
                                      return (
                                        <Picker.Item
                                          label={fac.Name}
                                          value={fac.Id}
                                          key={i}
                                          style={styles.textPicker}
                                        />
                                      );
                                    }
                                  )
                                : null}
                            </IOSPicker>
                          : <Picker
                              mode="dialog"
                              textStyle={styles.textPicker}
                              style={styles.containerDropDownAndroid}
                              selectedValue={this.state.Filter.facilityId}
                              onValueChange={itemValue => {
                                this.setState ({
                                  Filter: {
                                    ...this.state.Filter,
                                    facilityId: itemValue,
                                  },
                                });
                              }}
                            >
                              <Picker.Item
                                label="Facilities"
                                value=""
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              {this.state.accommodationFacilities
                                ? this.state.accommodationFacilities.map (
                                    (fac, i) => {
                                      return (
                                        <Picker.Item
                                          label={fac.Name}
                                          value={fac.Id}
                                          key={i}
                                        />
                                      );
                                    }
                                  )
                                : null}
                            </Picker>}
                      </View>
                      <View style={[styles.row100, stylesGlobal.rowEnd]}>
                        <View
                          style={[
                            stylesGlobal.width50,
                            styles.paddingHorizontal10,
                          ]}
                        >
                          <NormalButton
                            text="RESET"
                            buttonWidth="100%"
                            buttonHeight={35}
                            buttonColor="white"
                            textColor={styles.$goldcolor}
                            colorBorder={styles.$goldcolor}
                            onPress={this.handleReset}
                          />
                        </View>
                        <View
                          style={[
                            stylesGlobal.width50,
                            styles.paddingHorizontal10,
                          ]}
                        >
                          <NormalButton
                            text="DONE"
                            buttonWidth="100%"
                            buttonHeight={35}
                            textColor="white"
                            buttonColor={styles.$goldcolor}
                            onPress={() =>
                              this.handleFilter (this.state.Filter)}
                          />
                        </View>
                      </View>
                    </View>}
              </View>
            </Modal>

            {this.state.loading
              ? <View
                  style={[
                    stylesGlobal.width100,
                    stylesGlobal.marginTop10,
                    stylesGlobal.flexSize,
                    stylesGlobal.paddingHorizontal20,
                  ]}
                >
                  {/* <RoundedLoading width={width90} height={200} line={10} /> */}
                </View>
              : <View
                  style={[
                    stylesGlobal.width100,
                    stylesGlobal.flexSize,
                    stylesGlobal.rowStart,
                    stylesGlobal.padding10,
                  ]}
                >
                  <Text style={stylesGlobal.paddingLeft10}>
                    Accommodation from{' '}
                    {viewDateSlash (this.state.Parameter.StartDate)} until{' '}
                    {viewDateSlash (this.state.Parameter.EndDate)}
                  </Text>
                </View>}
            <View
              style={[
                stylesGlobal.width100,
                stylesGlobal.flexSize,
                stylesGlobal.center,
              ]}
            >
              {this.state.ListAccommodation.map ((hotel, i) => {
                let DataStar = hotel.AccommodationRating || '';
                let Star = parseInt (DataStar.Id) || '';
                return (
                  <CardAccomodation
                    widthCard="100%"
                    Img={
                      hotel.ProfileImages.length != 0
                        ? handleFilterImagePrimary (hotel.ProfileImages)
                        : hotel.ImageUrl
                    }
                    Title={hotel.Name}
                    Address={hotel.City ? hotel.City.Name : ''} // Address={hotel.Address}
                    statusRoom={hotel.IsInstantConfirmation}
                    namabutton="SEE DETAIL"
                    ProfileFacilities={hotel.ProfileFacilities}
                    key={i}
                    onPress={() => this.handlePressDetail (hotel)}
                    numberStar={Star}
                    isPromo={hotel.IsPromo}
                    typeCard="Hotel"
                    estimatedPrice={hotel.EstimatedTotalPrice.Price}
                    currency={hotel.EstimatedTotalPrice.CurrencyId}
                  />
                );
              })}
            </View>
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
            clearIcon={{color: 'red'}}
            searchIcon={true}
            onChangeText={this._handleSearch}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListAccommodation.length} Accommodation
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
  listAccomodation: state.accommodationReducer.accomodation,
  isAccomodation: state.accommodationReducer.isAccomodation,
  accomodationFilter: state.accommodationReducer.accomodationFilter,
  isAccomodationFilter: state.accommodationReducer.isAccomodationFilter,
  SummaryProgram: state.transactionReducer.SummaryProgram,
  cityAccommodation: state.accommodationReducer.cityId,
  accommodationRatings: state.accommodationReducer.accommodationRatings,
  accommodationFacilities: state.accommodationReducer.accommodationFacilities,
  accommodationTypes: state.accommodationReducer.accommodationTypes,
  accommodationLocations: state.accommodationReducer.accommodationLocations,
});

export default connect (mapStateToProps, {
  getAccommodationProfileAction,
  resetAccommodationProfileAction,
  setCityAccommodationAction,
  getAccommodationFacilitiesAction,
  getAccommodationLocationAction,
  getAccommodationRatingAction,
  getAccommodationTypeAction,
}) (listAccomodation);
