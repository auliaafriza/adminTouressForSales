import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  BackHandler,
  Platform,
} from 'react-native';
import { Container } from '../../../../../components/container';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../../styles';
import stylesGlobal from '../../../../../components/styles';
import { CardTourOperator } from '../../../../../components/card';
import { Guest } from '../../../../../helper/dailyProgram';
import { SearchBar } from 'react-native-elements';
// import { set_guest, set_operator } from '../../../../../actions/operator/operatorAction';
import {
  setOperatorAction,
  // getOperatorListAction,
  resetOperatorListAction,
} from '../../../../../actions/operator/operatorAction';
import { setGuestAction } from '../../../../../actions/General/generalAction';
import { Loading } from '../../../../../components/loading';
import {
  getCountriesAction,
  getGuestTitleTypeAction,
} from '../../../../../actions/General/generalAction';
class tourOperatorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ListTourOperator: this.props.tourOperatorList,
      ListTourOperator: this.props.tourOperatorList,
      searchClearIcon: false,
      // loading: false,
      searchText: '',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    tourOperatorList: PropTypes.array,
    CustomDetails: PropTypes.object,
    GuestQoutation: PropTypes.array,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.props.getCountriesAction();
    this.props.getGuestTitleTypeAction();
  }

  componentDidUpdate() {
    if (this.props.isTourOperator) {
      // this.setDataGuest(this.props.guestData);
      this.setState({ ListTourOperator: this.props.tourOperatorList });
      this.props.resetOperatorListAction();
    } else if (this.props.isTourOperator !== null) {
      this.props.resetOperatorListAction();
    }
  }

  _onChangeSearchText = searchText => {
    if (searchText) {
      this.setState({
        searchClearIcon: { color: 'red' },
        searchText: searchText,
      });
    } else {
      this.setState({ searchClearIcon: false, searchText: '' });
    }
  };

  _handleSearch = value => {
    this._onChangeSearchText(value);
    let updatedList = this.props.tourOperatorList;
    updatedList = updatedList.filter(v => {
      if (v.TourProfileName.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ ListTourOperator: updatedList });
  };

  fillGuest = async result => {
    // this.setState({ loading: true });
    let Guests = [];
    // await this.props.dispatch(await set_operator(result));
    await this.props.setOperatorAction(result);
    const { Adult, Child, Infant } = this.props.CustomDetails.GuestAllocation;
    const Total = Adult + Child + Infant;
    if (this.props.GuestQoutation.length != 0) {
      let AdultGuest = 0;
      let ChildGuest = 0;
      let InfantGuest = 0;
      this.props.GuestQoutation.forEach(function(task) {
        if (task.GuestCategory == 'ADULT') {
          AdultGuest = AdultGuest + 1;
        }
      });
      this.props.GuestQoutation.forEach(function(task) {
        if (task.GuestCategory == 'CHILD' || task.GuestCategory == 'CHILDREN') {
          ChildGuest = ChildGuest + 1;
        }
      });
      this.props.GuestQoutation.forEach(function(task) {
        if (task.GuestCategory == 'INFANT') {
          InfantGuest = InfantGuest + 1;
        }
      });

      if (this.props.GuestQoutation.length > Total) {
        for (let i = 0; i < Adult; i++) Guests.push(new Guest('ADULT'));
        for (let i = 0; i < Child; i++) Guests.push(new Guest('CHILD'));
        for (let i = 0; i < Infant; i++) Guests.push(new Guest('INFANT'));
      } else {
        AdultGuest = AdultGuest ? AdultGuest : 0;
        ChildGuest = ChildGuest ? ChildGuest : 0;
        InfantGuest = InfantGuest ? InfantGuest : 0;

        if (Adult != 0) {
          this.props.GuestQoutation.forEach(function(task) {
            if (task.GuestCategory == 'ADULT') {
              Guests.push(task);
            }
          });
          if (AdultGuest != Adult) {
            for (let i = 0; i < Adult - AdultGuest; i++)
              Guests.push(new Guest('ADULT'));
          }
        }
        if (Child != 0) {
          this.props.GuestQoutation.forEach(function(task) {
            if (
              task.GuestCategory == 'CHILD' ||
              task.GuestCategory == 'CHILDREN'
            ) {
              Guests.push(task);
            }
          });
          if (ChildGuest != Child) {
            for (let i = 0; i < Child - ChildGuest; i++)
              Guests.push(new Guest('CHILD'));
          }
        }
        if (Infant != 0) {
          this.props.GuestQoutation.forEach(function(task) {
            if (task.GuestCategory == 'INFANT') {
              Guests.push(task);
            }
          });
          if (InfantGuest != Infant) {
            for (let i = 0; i < Infant - InfantGuest; i++)
              Guests.push(new Guest('INFANT'));
          }
        }
      }
    } else {
      for (let i = 0; i < Adult; i++) Guests.push(new Guest('ADULT'));
      for (let i = 0; i < Child; i++) Guests.push(new Guest('CHILD'));
      for (let i = 0; i < Infant; i++) Guests.push(new Guest('INFANT'));
    }
    await this.props.setGuestAction(Guests);
    // this.setState({ loading: false });
    this.props.navigation.navigate('Guest', {
      screen: 'GuestList',
      params: { type: 'custom', Booking: this.props.CustomDetails },
    });
  };
  render() {
    return (
      <Container>
        {this.props.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}
        <View
          style={[
            styles.headerOperatorList,
            styles.headerTop,
            stylesGlobal.paddingTop10,
          ]}
        >
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <SearchBar
            clearIcon={this.state.searchClearIcon}
            searchIcon={true}
            onChangeText={this._handleSearch}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListTourOperator.length} Tour Operator
            </Text>
          </View>
        </View>
        <ScrollView style={stylesGlobal.containerScrollCustomOption}>
          <Container paddingtopcontainer={Platform.OS === 'ios' ? 100 : 120}>
            {this.state.ListTourOperator
              ? this.state.ListTourOperator.map((obj, i) => {
                  return (
                    <CardTourOperator
                      key={i}
                      type="list"
                      imagetouroperator={obj.TourOperatorProfile.ImageUrl}
                      touroperatorname={obj.TourOperatorProfile.Name}
                      address={obj.TourOperatorProfile.Address}
                      textphone={obj.TourOperatorProfile.Telephone}
                      textemail={obj.TourOperatorProfile.Email}
                      show={true}
                      onPress={() => this.fillGuest(obj)}
                      // textprice={
                      //   this.props.route.params.type == "FixedDateVariable"
                      //     ? ""
                      //     : obj.CurrencyId +
                      //       " " +
                      //       obj.TotalPrice.toString()
                      //         .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      //         .toLocaleString(obj.CurrencyId)
                      // }
                      textprice={
                        obj.CurrencyId +
                        ' ' +
                        obj.TotalPrice.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          .toLocaleString(obj.CurrencyId)
                      }
                    />
                  );
                })
              : null}
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tourOperatorList: state.operatorReducer.operatorList,
  CustomDetails: state.transactionReducer.CustomDetails,
  GuestQoutation: state.transactionReducer.GuestQoutation,
  loading: state.operatorReducer.loading || state.transactionReducer.loading,
  isTourOperator: state.operatorReducer.isTourOperator,
});
export default connect(mapStateToProps, {
  setOperatorAction,
  setGuestAction,
  // getOperatorListAction,
  resetOperatorListAction,
  getCountriesAction,
  getGuestTitleTypeAction,
})(tourOperatorList);
