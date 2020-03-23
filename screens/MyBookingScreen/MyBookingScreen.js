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
  TouchableOpacity,
} from 'react-native';
import { CardHistory } from '../../components/card';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { Loading } from '../../components/loading';
import { ButtonReload } from '../../components/button';
// import {
//   get_history_created_booking,
//   reset_status_history_created,
// } from '../../actions/historyAction';
import {
  getTransactionHistoryByStatusAction,
  resetTransactionAction,
} from '../../actions/Transactions/TransactionAction';
import moment from 'moment';
import styles from './styles';
import stylesGlobal from '../../components/styles';
import convertStatusPackage from './services/covertStatusPackage';
import listAccomodation from '../TourTransactionScreen/CustomPackage/components/masterData/listAccomodation';
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
      ListCreatedBooking: [],
      // loading: false,
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
    this.props.getTransactionHistoryByStatusAction();
    this.setState({ refreshing: false });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    // this.setState({ loading: true, positionLoad: "relative" });
    this.props.getTransactionHistoryByStatusAction('Booking_In_Payment');
    // this.props.dispatch(get_history_created_booking());
  }

  reloadData = () => {
    // this.setState({ loading: true, positionLoad: 'relative' });
    this.props.getTransactionHistoryByStatusAction();
    // this.props.dispatch(get_history_created_booking());
  };

  componentDidUpdate() {
    if (this.props.isHistoryBookingCreated === 'success') {
      this.setState({
        ListCreatedBooking: this.props.HistoryBookingCreated,
      });
      this.props.resetTransactionAction();
      //   this.props.dispatch(reset_status_history_created());
      // this.setState({ loading: false, status: 'success' });
      return false;
    } else if (this.props.isHistoryBookingCreated === 'failed') {
      this.props.resetTransactionAction();
      //   this.props.dispatch(reset_status_history_created());
      // this.setState({ loading: false, status: 'failed' });
      return false;
    } else return true;
  }

  handlePayment = id => {
    this.props.navigation.navigate('Summary', {
      screen: 'TourSummaryCustomReady',
      params: {
        id: id,
        type: 'myBooking',
      },
    });
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

  handleChangeList = status => {
    this.props.getTransactionHistoryByStatusAction(status);
    this.setState({ ListCreatedBooking: [] });
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
            {this.props.loading ? (
              <View
                style={[
                  stylesGlobal.width100,
                  stylesGlobal.flexSize,
                  stylesGlobal.center,
                  stylesGlobal.paddingTop20,
                ]}
              >
                <Loading width={width90} height={200} line={10} />
              </View>
            ) : (
              <View>
                <ScrollView horizontal={true}>
                  <View style={[styles.rowNoPadding, stylesGlobal.marginTop20]}>
                    {listScroll.map(data => (
                      <View style={[styles.col20]}>
                        <TouchableOpacity
                          style={stylesGlobal.center}
                          onPress={() => this.handleChangeList(data.link)}
                        >
                          <Text
                            style={[
                              stylesGlobal.text14,
                              stylesGlobal.textBold,
                              stylesGlobal.textGold,
                            ]}
                          >
                            {data.Title}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </ScrollView>
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
                        stylesGlobal.paddingTop20,
                        // stylesGlobal.paddingBottom80,
                        // styles.paddingTop100,
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
                            label={convertStatusPackage(item.Status)}
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
                            startTour={moment(item.StartDate).format(
                              'D MMM YY'
                            )}
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
  loading: state.transactionReducer.loading,
  HistoryBookingCreated: state.transactionReducer.packageHistoryList,
  isHistoryBookingCreated: state.transactionReducer.packageHistoryListStatus,
});

export default connect(mapStateToProps, {
  getTransactionHistoryByStatusAction,
  resetTransactionAction,
})(MyBookingScreen);

const listScroll = [
  {
    Title: 'Created',
    link: 'Booking_created',
  },
  {
    Title: 'In Payment',
    link: 'Booking_In_Payment',
  },
  {
    Title: 'Confirmed',
    link: 'Booking_Confirmed',
  },
  {
    Title: 'Completed',
    link: 'Booking_Completed',
  },
  {
    Title: 'Cancel',
    link: 'Booking_Cancelled',
  },
];
