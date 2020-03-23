import React, { Component } from 'react';
import { Container } from '../../components/container';
import {
  ScrollView,
  Text,
  RefreshControl,
  View,
  VirtualizedList,
  ActivityIndicator,
  BackHandler,
  StatusBar,
  Dimensions,
} from 'react-native';
import { CardHistory } from '../../components/card';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
// import { RoundedLoading } from '../../components/loading';
import { ButtonReload } from '../../components/button';
// import {
//   get_history_created_booking,
//   reset_status_history_created,
// } from '../../actions/historyAction';
import moment from 'moment';
import styles from './styles';
import stylesGlobal from '../../components/styles';
class MyBookingScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    token: PropTypes.string,
    HistoryBookingCreated: PropTypes.array,
    isHistoryBookingCreated: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      ListCreatedBooking: dummyBooking,
      loading: false,
      positionLoad: '',
      refreshing: false,
      refreshingVirtual: true,
      status: '',
      searchText: '',
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    // await this.props.dispatch(get_history_created_booking());
    this.setState({ refreshing: false });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    // this.setState({ loading: true, positionLoad: "relative" });
    // this.props.dispatch(get_history_created_booking());
  }

  reloadData = () => {
    this.setState({ loading: true, positionLoad: 'relative' });
    // this.props.dispatch(get_history_created_booking());
  };

  componentDidUpdate() {
    if (this.props.isHistoryBookingCreated === 'success') {
      this.setState({
        ListCreatedBooking: this.props.HistoryBookingCreated,
      });
      //   this.props.dispatch(reset_status_history_created());
      this.setState({ loading: false, status: 'success' });
      return false;
    } else if (this.props.isHistoryBookingCreated === 'failed') {
      //   this.props.dispatch(reset_status_history_created());
      this.setState({ loading: false, status: 'failed' });
      return false;
    } else return true;
  }

  handlePayment = id => {
    this.setState({ loading: true, positionLoad: 'absolute' });
    // this.props.navigation.navigate("TourSummaryPayment", { id: id });
    this.props.navigation.navigate('TourSummaryCustomReady', {
      id: 'ZPUWG7',
      type: 'myBooking',
    });
    this.setState({ loading: false });
  };

  _handleSearch = value => {
    this.setState({ searchText: value });
    let updatedList = this.props.HistoryBookingCreated;
    updatedList = updatedList.filter(v => {
      if (
        v.Title.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Destination.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Id.toLowerCase().indexOf(value.toLowerCase()) > -1
      ) {
        return true;
      }
      return false;
    });
    this.setState({ ListCreatedBooking: updatedList });
  };

  render() {
    const width90 =
      Dimensions.get('window').width - Dimensions.get('window').width * 0.1;
    return (
      <Container>
        <View
          style={[
            stylesGlobal.header,
            stylesGlobal.headerTop,
            stylesGlobal.paddingTop10,
          ]}
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
            onClear={this._handleClear}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListCreatedBooking.length} Packages
            </Text>
          </View>
        </View>
        {/* <SearchBar
          clearIcon={{ color: 'red' }}
          searchIcon={true}
          onChangeText={this._handleSearch}
          placeholder="Type Here..."
          lightTheme
          containerStyle={stylesGlobal.width100}
        /> */}
        <ScrollView
          style={[stylesGlobal.containerScroll, stylesGlobal.paddingTop90]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Container paddingbottomcontainer={120}>
            {this.state.loading ? (
              <View
                style={[
                  stylesGlobal.width100,
                  stylesGlobal.flexSize,
                  stylesGlobal.center,
                  stylesGlobal.paddingTop20,
                ]}
              >
                <RoundedLoading width={width90} height={200} line={10} />
              </View>
            ) : (
              <View
                style={[
                  stylesGlobal.width100,
                  stylesGlobal.flexSize,
                  stylesGlobal.center,
                ]}
              >
                {this.state.ListCreatedBooking.length != 0 ? (
                  <VirtualizedList
                    initialNumToRender={5}
                    data={this.state.ListCreatedBooking}
                    getItemCount={data => data.length}
                    contentContainerStyle={styles.scrollingStyle}
                    style={[
                      stylesGlobal.width100,
                      stylesGlobal.paddingBottom80,
                      styles.paddingTop100,
                    ]}
                    disableVirtualization
                    pagingEnabled
                    getItem={(data, index) => data[index]}
                    keyExtractor={(item, index) => {
                      return item.key;
                    }}
                    maxToRenderPerBatch={1}
                    renderItem={({ item, index }) => {
                      let expiredDate = item.PaymentTerms.find(
                        item => item.IsPayed == false
                      );
                      return (
                        <CardHistory
                          Nobooking={item.Id}
                          Title={item.Title}
                          textdestination={
                            item.City.Name + ', ' + item.Country.Name
                          }
                          label={
                            item.Status === 'Booking_created'
                              ? 'Created'
                              : 'On-Hold'
                          }
                          key={'created' + index}
                          onPress={() => this.handlePayment(item.Id)}
                          isRead={item.IsRead}
                          packageType={item.PackageType}
                          totalGuest={item.TotalGuest}
                          personResponsible={
                            item.ResponsibleUser
                              ? `${item.ResponsibleUser[0].FirstName} ${item.ResponsibleUser[0].LastName}`
                              : ''
                          }
                          bookingCreated={moment(item.CreatedDate).format(
                            'D MMM YY'
                          )}
                          startTour={moment(item.StartDate).format('D MMM YY')}
                          customer={item.CreatedBy.CompanyName}
                        />
                      );
                    }}
                    onMomentumScrollBegin={() => {
                      this.setState({ refreshingVirtual: true });
                    }}
                    onMomentumScrollEnd={() => {
                      this.setState({ refreshingVirtual: false });
                    }}
                    onEndReached={() => {
                      this.setState({ refreshingVirtual: false });
                    }}
                    refreshing={true}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => {
                      if (!this.state.refreshingVirtual) {
                        return null;
                      } else if (this.state.ListCreatedBooking.length == 0) {
                        return null;
                      }
                      return (
                        <View style={stylesGlobal.paddingTop20}>
                          <ActivityIndicator
                            animating
                            size="large"
                            color="#e6ca6b"
                          />
                        </View>
                      );
                    }}
                  />
                ) : this.state.status == 'failed' ? (
                  <View style={[stylesGlobal.center, styles.paddingTop100]}>
                    <Text>There are no booked transactions</Text>
                    <ButtonReload onPress={this.reloadData} sizeicon={20} />
                  </View>
                ) : (
                  <Text style={styles.paddingTop100}>
                    There are no booked transactions
                  </Text>
                )}
              </View>
            )}
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  //   token: state.userAuthReducer.token,
  //   HistoryBookingCreated: state.historyReducer.HistoryBookingCreated,
  //   isHistoryBookingCreated: state.historyReducer.isHistoryBookingCreated,
});

// export default connect(mapStateToProps)(createdBooking);
export default MyBookingScreen;

const dummyBooking = [
  {
    AdultQty: 1,
    ChildQty: 0,
    InfantQty: 0,
    TotalPaxQty: 1,
    ImageUrl: null,
    Id: 'DJ3O2A',
    Title: 'test custom',
    Description: null,
    PackageType: 'Custom',
    TotalGuest: 1,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: 'BALI',
    City: {
      UTC: null,
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg',
      Id: 'KUTA',
      Name: 'Kuta',
    },
    Country: {
      Code: null,
      ImageUrl:
        'http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg',
      Id: 'ID',
      Name: 'Indonesia',
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: 'IDR',
    CreatedDate: '2020-03-04T18:24:09.41',
    StartDate: '2020-03-29T08:00:00',
    EndDate: '2020-03-30T14:00:00',
    ActiveDate: null,
    Status: 'Booking_hold',
    TourTotalPrice: 1146000.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: 'Business',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    TourPaxType: {
      Id: 1,
      Name: 'Bachelor',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    GroupType: 'Small',
    TourOperatorProfileId: 5,
    TourNote: '',
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: '2020-03-10T23:59:59',
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: [
      {
        Id: 5,
        PaymentPercentage: 50.0,
        DueDate: '2020-03-25T07:59:59',
        PayDate: null,
        PaymentValue: 573000.0,
        PaymentValueEndCustomer: 573000.0,
        CurrencyId: 'IDR',
        Description: 'Down Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 7,
        PaymentPercentage: 30.0,
        DueDate: '2020-03-27T07:59:59',
        PayDate: null,
        PaymentValue: 343800.0,
        PaymentValueEndCustomer: 343800.0,
        CurrencyId: 'IDR',
        Description: 'Second Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 16,
        PaymentPercentage: 20.0,
        DueDate: '2020-03-29T07:59:59',
        PayDate: null,
        PaymentValue: 229200.0,
        PaymentValueEndCustomer: 229200.0,
        CurrencyId: 'IDR',
        Description: 'Last Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
    ],
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: {
      UserProfileId: '5d9a5919-7a83-4747-af4f-518b236f7c79',
      UserId: '5d9a5919-7a83-4747-af4f-518b236f7c79',
      UserName: 'ahmadfaisal',
      Email: 'ahmad.faisal@basajans.com',
      CompanyCode: '30169',
      CompanyName: 'Berkah Faisal',
      FirstName: 'Ahmad',
      LastName: 'Faisal',
      PhoneNbr: '025101234',
      CompanyLogoImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/Company/38c88459-94de-4f2a-a5f2-5979f027d320download.png.jpg',
      Address: 'Cibungbulang, Bogor, Jawa Barat',
      Country: 'Indonesia',
    },
    ResponsibleUser: [
      {
        UserProfileId: '3f9357f7-832e-4351-9ccb-812a17fae0ac',
        UserId: '3f9357f7-832e-4351-9ccb-812a17fae0ac',
        UserName: 'faisales',
        Email: 'faisales@mail.com',
        CompanyCode: '30000',
        CompanyName: 'Connect World PTE.LTD',
        FirstName: 'Faisal',
        LastName: 'Sales',
        PhoneNbr: '080012345',
        CompanyLogoImageUrl: null,
        Address: null,
        Country: null,
      },
    ],
    TourOperatorProfile: {
      TourOperatorProfileId: 5,
      Name: 'goIndonesia.tours',
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg',
      Address:
        'Benoa Square 2nd Fl. Office 225 Jl Bypass Ngurah Rai No 21A, Kuta, Bali 80361, Indonesiainfo@goBali.tours',
      Email: 'akulahrafdi@gmail.com',
    },
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: null,
  },
  {
    AdultQty: 1,
    ChildQty: 0,
    InfantQty: 0,
    TotalPaxQty: 1,
    ImageUrl: null,
    Id: 'UQOWCC',
    Title: 'Test Custom Sales',
    Description: null,
    PackageType: 'Custom',
    TotalGuest: 1,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: 'BALI',
    City: {
      UTC: null,
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg',
      Id: 'KUTA',
      Name: 'Kuta',
    },
    Country: {
      Code: null,
      ImageUrl:
        'http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg',
      Id: 'ID',
      Name: 'Indonesia',
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: 'IDR',
    CreatedDate: '2020-03-04T18:18:55.697',
    StartDate: '2020-03-29T08:00:00',
    EndDate: '2020-03-30T14:00:00',
    ActiveDate: null,
    Status: 'Booking_hold',
    TourTotalPrice: 450000.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: 'Business',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    TourPaxType: {
      Id: 1,
      Name: 'Bachelor',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    GroupType: 'Small',
    TourOperatorProfileId: 5,
    TourNote: '',
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: '2020-03-04T23:59:59',
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: [
      {
        Id: 5,
        PaymentPercentage: 50.0,
        DueDate: '2020-03-25T07:59:59',
        PayDate: null,
        PaymentValue: 225000.0,
        PaymentValueEndCustomer: 225000.0,
        CurrencyId: 'IDR',
        Description: 'Down Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 7,
        PaymentPercentage: 30.0,
        DueDate: '2020-03-27T07:59:59',
        PayDate: null,
        PaymentValue: 135000.0,
        PaymentValueEndCustomer: 135000.0,
        CurrencyId: 'IDR',
        Description: 'Second Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 16,
        PaymentPercentage: 20.0,
        DueDate: '2020-03-29T07:59:59',
        PayDate: null,
        PaymentValue: 90000.0,
        PaymentValueEndCustomer: 90000.0,
        CurrencyId: 'IDR',
        Description: 'Last Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
    ],
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: {
      UserProfileId: '5d9a5919-7a83-4747-af4f-518b236f7c79',
      UserId: '5d9a5919-7a83-4747-af4f-518b236f7c79',
      UserName: 'ahmadfaisal',
      Email: 'ahmad.faisal@basajans.com',
      CompanyCode: '30169',
      CompanyName: 'Berkah Faisal',
      FirstName: 'Ahmad',
      LastName: 'Faisal',
      PhoneNbr: '025101234',
      CompanyLogoImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/Company/38c88459-94de-4f2a-a5f2-5979f027d320download.png.jpg',
      Address: 'Cibungbulang, Bogor, Jawa Barat',
      Country: 'Indonesia',
    },
    ResponsibleUser: [
      {
        UserProfileId: '3f9357f7-832e-4351-9ccb-812a17fae0ac',
        UserId: '3f9357f7-832e-4351-9ccb-812a17fae0ac',
        UserName: 'faisales',
        Email: 'faisales@mail.com',
        CompanyCode: '30000',
        CompanyName: 'Connect World PTE.LTD',
        FirstName: 'Faisal',
        LastName: 'Sales',
        PhoneNbr: '080012345',
        CompanyLogoImageUrl: null,
        Address: null,
        Country: null,
      },
    ],
    TourOperatorProfile: {
      TourOperatorProfileId: 5,
      Name: 'goIndonesia.tours',
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg',
      Address:
        'Benoa Square 2nd Fl. Office 225 Jl Bypass Ngurah Rai No 21A, Kuta, Bali 80361, Indonesiainfo@goBali.tours',
      Email: 'akulahrafdi@gmail.com',
    },
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: null,
  },
  {
    AdultQty: 1,
    ChildQty: 0,
    InfantQty: 0,
    TotalPaxQty: 1,
    ImageUrl: null,
    Id: 'IIJX18',
    Title: 'coba create paket',
    Description: null,
    PackageType: 'Custom',
    TotalGuest: 1,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: 'BALI',
    City: {
      UTC: null,
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg',
      Id: 'KUTA',
      Name: 'Kuta',
    },
    Country: {
      Code: null,
      ImageUrl:
        'http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg',
      Id: 'ID',
      Name: 'Indonesia',
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: 'IDR',
    CreatedDate: '2020-03-04T13:02:45.667',
    StartDate: '2020-03-29T08:00:00',
    EndDate: '2020-03-30T14:00:00',
    ActiveDate: null,
    Status: 'Booking_hold',
    TourTotalPrice: 640000.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: 'Business',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    TourPaxType: {
      Id: 1,
      Name: 'Bachelor',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    GroupType: 'Small',
    TourOperatorProfileId: 5,
    TourNote: 'Ini tour note coba create paket',
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: '2020-03-04T23:59:59',
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: [
      {
        Id: 5,
        PaymentPercentage: 50.0,
        DueDate: '2020-03-25T07:59:59',
        PayDate: null,
        PaymentValue: 320000.0,
        PaymentValueEndCustomer: 320000.0,
        CurrencyId: 'IDR',
        Description: 'Down Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 7,
        PaymentPercentage: 30.0,
        DueDate: '2020-03-27T07:59:59',
        PayDate: null,
        PaymentValue: 192000.0,
        PaymentValueEndCustomer: 192000.0,
        CurrencyId: 'IDR',
        Description: 'Second Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 16,
        PaymentPercentage: 20.0,
        DueDate: '2020-03-29T07:59:59',
        PayDate: null,
        PaymentValue: 128000.0,
        PaymentValueEndCustomer: 128000.0,
        CurrencyId: 'IDR',
        Description: 'Last Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
    ],
    BookingTemplateRef: 0,
    IsRead: true,
    CreatedBy: {
      UserProfileId: '5d9a5919-7a83-4747-af4f-518b236f7c79',
      UserId: '5d9a5919-7a83-4747-af4f-518b236f7c79',
      UserName: 'ahmadfaisal',
      Email: 'ahmad.faisal@basajans.com',
      CompanyCode: '30169',
      CompanyName: 'Berkah Faisal',
      FirstName: 'Ahmad',
      LastName: 'Faisal',
      PhoneNbr: '025101234',
      CompanyLogoImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/Company/38c88459-94de-4f2a-a5f2-5979f027d320download.png.jpg',
      Address: 'Cibungbulang, Bogor, Jawa Barat',
      Country: 'Indonesia',
    },
    ResponsibleUser: [
      {
        UserProfileId: '3f9357f7-832e-4351-9ccb-812a17fae0ac',
        UserId: '3f9357f7-832e-4351-9ccb-812a17fae0ac',
        UserName: 'faisales',
        Email: 'faisales@mail.com',
        CompanyCode: '30000',
        CompanyName: 'Connect World PTE.LTD',
        FirstName: 'Faisal',
        LastName: 'Sales',
        PhoneNbr: '080012345',
        CompanyLogoImageUrl: null,
        Address: null,
        Country: null,
      },
    ],
    TourOperatorProfile: {
      TourOperatorProfileId: 5,
      Name: 'goIndonesia.tours',
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg',
      Address:
        'Benoa Square 2nd Fl. Office 225 Jl Bypass Ngurah Rai No 21A, Kuta, Bali 80361, Indonesiainfo@goBali.tours',
      Email: 'akulahrafdi@gmail.com',
    },
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: null,
  },
  {
    AdultQty: 1,
    ChildQty: 0,
    InfantQty: 0,
    TotalPaxQty: 1,
    ImageUrl: null,
    Id: 'XN2FFF',
    Title: 'Tour 1 May 2020',
    Description: null,
    PackageType: 'Custom',
    TotalGuest: 1,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: 'BALI',
    City: {
      UTC: null,
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg',
      Id: 'KUTA',
      Name: 'Kuta',
    },
    Country: {
      Code: null,
      ImageUrl:
        'http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg',
      Id: 'ID',
      Name: 'Indonesia',
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: 'IDR',
    CreatedDate: '2020-03-04T11:39:29.093',
    StartDate: '2020-05-01T08:00:00',
    EndDate: '2020-05-02T14:00:00',
    ActiveDate: null,
    Status: 'Booking_created',
    TourTotalPrice: 450000.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: 'Business',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    TourPaxType: {
      Id: 1,
      Name: 'Bachelor',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    GroupType: 'Small',
    TourOperatorProfileId: 5,
    TourNote: '',
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: '2020-04-06T23:59:59',
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: [
      {
        Id: 1,
        PaymentPercentage: 100.0,
        DueDate: '2020-04-25T07:59:59',
        PayDate: null,
        PaymentValue: 450000.0,
        PaymentValueEndCustomer: 450000.0,
        CurrencyId: 'IDR',
        Description: 'Full Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: true,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
    ],
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: {
      UserProfileId: 'f1bf7227-6fbf-417b-87c8-4c147043edd3',
      UserId: 'f1bf7227-6fbf-417b-87c8-4c147043edd3',
      UserName: 'Yanes',
      Email: 'ageungsurya78@gmail.com',
      CompanyCode: '30155',
      CompanyName: 'Coba1',
      FirstName: 'Yanes',
      LastName: 'Reksandi',
      PhoneNbr: '+6283112309496',
      CompanyLogoImageUrl:
        'https://localhost:44388//Content/imgSrc/Company/f94bcd91-9b1c-4373-ac60-f291a9860555naruto.png.jpg',
      Address: 'Ats',
      Country: 'Brazil',
    },
    ResponsibleUser: [
      {
        UserProfileId: '2e4500f3-473d-402e-a46c-dc5c9781c88d',
        UserId: '2e4500f3-473d-402e-a46c-dc5c9781c88d',
        UserName: 'sales008',
        Email: 'snapove@gmail.com',
        CompanyCode: '30000',
        CompanyName: 'Connect World PTE.LTD',
        FirstName: 'Rafdi',
        LastName: 'Jaidi',
        PhoneNbr: '123123123',
        CompanyLogoImageUrl: null,
        Address: null,
        Country: null,
      },
    ],
    TourOperatorProfile: {
      TourOperatorProfileId: 5,
      Name: 'goIndonesia.tours',
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg',
      Address:
        'Benoa Square 2nd Fl. Office 225 Jl Bypass Ngurah Rai No 21A, Kuta, Bali 80361, Indonesiainfo@goBali.tours',
      Email: 'akulahrafdi@gmail.com',
    },
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: null,
  },
  {
    AdultQty: 1,
    ChildQty: 0,
    InfantQty: 0,
    TotalPaxQty: 1,
    ImageUrl: null,
    Id: 'SCW158',
    Title: 'Habiskan uang di Bali',
    Description: 'Kuy ngabisin uang di Bali',
    PackageType: 'Fixed',
    TotalGuest: 1,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: 'BALI',
    City: {
      UTC: null,
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg',
      Id: 'KUTA',
      Name: 'Kuta',
    },
    Country: {
      Code: null,
      ImageUrl:
        'http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg',
      Id: 'ID',
      Name: 'Indonesia',
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: 'IDR',
    CreatedDate: '2020-03-03T18:15:08.697',
    StartDate: '2020-03-06T09:00:00',
    EndDate: '2020-03-09T12:00:00',
    ActiveDate: null,
    Status: 'Booking_created',
    TourTotalPrice: 250000.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 70,
      Name: 'Leisure',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    TourPaxType: {
      Id: 3,
      Name: 'Family',
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null,
    },
    GroupType: '0',
    TourOperatorProfileId: 5,
    TourNote: '-',
    IsSplitStaffCommission: true,
    ExternalBookingId: null,
    ExpiredOn: '2020-03-06T00:00:00',
    RegistrationDeadline: null,
    FixedPackage: {
      BookingCommission: {
        TotalPriceForCustomer: 150000.0,
        AgentCommission: {
          TotalPax: 1,
          UnitPrice: 100000.0,
          TotalPrice: 100000.0,
        },
        StaffCommission: {
          TotalPax: 1,
          UnitPrice: 100000.0,
          TotalPrice: 100000.0,
        },
        ApplicableCommission: [
          {
            Description: 'Agent Commission',
            TotalPax: 1,
            UnitPrice: 100000.0,
            TotalPrice: 100000.0,
          },
        ],
      },
      RegisteringGuest: 9,
      MinimumGuest: 59,
      MaximumGuest: 59,
      ConfirmedGuest: 9,
      PaxLeft: 50,
      ReferenceId: '',
      MinPax: 1,
      PaymentTerms: [
        {
          Id: 2137,
          PaymentPercentage: 50.0,
          DueDate: '2020-03-05T23:59:59+08:00',
          PayDate: null,
          PaymentValue: -50000.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: 'IDR',
          Description: 'Down Payment',
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false,
        },
        {
          Id: 2138,
          PaymentPercentage: 30.0,
          DueDate: '2020-03-05T23:59:59+08:00',
          PayDate: null,
          PaymentValue: -30000.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: 'IDR',
          Description: 'Second Payment',
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false,
        },
        {
          Id: 2139,
          PaymentPercentage: 20.0,
          DueDate: '2020-03-05T23:59:59+08:00',
          PayDate: null,
          PaymentValue: -20000.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: 'IDR',
          Description: 'Last Payment',
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false,
        },
      ],
      Suppements: [],
    },
    VariableDatePackage: null,
    PaymentTerms: [
      {
        Id: 2137,
        PaymentPercentage: 50.0,
        DueDate: '2020-03-05T23:59:59+08:00',
        PayDate: null,
        PaymentValue: -50000.0,
        PaymentValueEndCustomer: 0.0,
        CurrencyId: 'IDR',
        Description: 'Down Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 2138,
        PaymentPercentage: 30.0,
        DueDate: '2020-03-05T23:59:59+08:00',
        PayDate: null,
        PaymentValue: -30000.0,
        PaymentValueEndCustomer: 0.0,
        CurrencyId: 'IDR',
        Description: 'Second Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
      {
        Id: 2139,
        PaymentPercentage: 20.0,
        DueDate: '2020-03-05T23:59:59+08:00',
        PayDate: null,
        PaymentValue: -20000.0,
        PaymentValueEndCustomer: 0.0,
        CurrencyId: 'IDR',
        Description: 'Last Payment',
        IsPayed: false,
        PaidValue: 0.0,
        IsLockGuest: false,
        Sequence: 0,
        IntervalDays: 0,
        IsAfterBookingBased: false,
      },
    ],
    BookingTemplateRef: 687,
    IsRead: false,
    CreatedBy: {
      UserProfileId: '1831edc1-1e47-4fad-bf8a-e93c82eb0a1d',
      UserId: '1831edc1-1e47-4fad-bf8a-e93c82eb0a1d',
      UserName: 'Admin',
      Email: 'cenutasa@gmail.com',
      CompanyCode: '30296',
      CompanyName: 'davicenatcenut',
      FirstName: 'davi',
      LastName: 'cenat',
      PhoneNbr: '087',
      CompanyLogoImageUrl: null,
      Address: 'sa',
      Country: 'Indonesia',
    },
    ResponsibleUser: [
      {
        UserProfileId: 'a0e51cd7-3851-405c-bcdd-688d9eb0dd3c',
        UserId: 'a0e51cd7-3851-405c-bcdd-688d9eb0dd3c',
        UserName: 'shintiatria',
        Email: 'shintiatsa@gmail.com',
        CompanyCode: '30000',
        CompanyName: 'Connect World PTE.LTD',
        FirstName: 'shintia',
        LastName: 'tria',
        PhoneNbr: '087',
        CompanyLogoImageUrl: null,
        Address: null,
        Country: null,
      },
    ],
    TourOperatorProfile: {
      TourOperatorProfileId: 5,
      Name: 'goIndonesia.tours',
      ImageUrl:
        'https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg',
      Address:
        'Benoa Square 2nd Fl. Office 225 Jl Bypass Ngurah Rai No 21A, Kuta, Bali 80361, Indonesiainfo@goBali.tours',
      Email: 'akulahrafdi@gmail.com',
    },
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: null,
  },
];
