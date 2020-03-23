import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  VirtualizedList,
  FlatList,
  View,
  StatusBar,
  BackHandler,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Container } from '../../components/container';
import { SearchBar } from 'react-native-elements';
import { ListItemCountryAndCity } from '../../components/list';
import { connect } from 'react-redux';
import styles from './styles';
import { Loading } from '../../components/loading';
import {
  getUserIdCompanyAction,
  resetListCustomerAction,
} from '../../actions/General/generalAction';
// import {
//   get_userid_by_companycode,
//   reset_get_userid,
// } from '../../actions/companyAction';
import stylesGlobal from '../../components/styles';

class listUserCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params.onSelect,
      ListUserCompany: '',
      refreshing: true,
      value: '',
      results: {
        Code: this.props.route.params.code,
        Name: this.props.route.params.name,
        Id: '',
        FirstName: '',
        LastName: '',
        Username: '',
      },
      loading: false,
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    dataUserIdCompany: PropTypes.array,
    isDataUserIdCompany: PropTypes.string,
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    let code = this.props.route.params.code;
    this.setState({ loading: true });
    this.props.getUserIdCompanyAction(code);
    // await this.props.dispatch(get_userid_by_companycode(code));
  };

  componentDidUpdate() {
    if (this.props.isDataUserIdCompany == 'success') {
      this.setState({ loading: false });
      this.setState({ ListUserCompany: this.props.dataUserIdCompany });
      this.props.resetListCustomerAction();
      // this.props.dispatch(reset_get_userid());
      return false;
    } else if (this.props.isDataUserIdCompany == 'failed') {
      this.setState({ loading: false });
      this.props.resetListCustomerAction();
      // this.props.dispatch(reset_get_userid());
      return false;
    } else return true;
  }

  selectedCountry = data => {
    let dataResults = this.state.results;
    dataResults.Id = data.Id;
    dataResults.FirstName = data.FirstName;
    dataResults.LastName = data.LastName;
    dataResults.Username = data.Username;
    this.backToSummary(dataResults);
  };

  backToSummary = dataResults => {
    let i = this.props.route.params.index;
    if (i >= 0) this.props.route.params.onSelect(i, dataResults);
    else this.props.route.params.onSelect(dataResults);
    this.props.navigation.pop();
    this.props.navigation.pop();
  };

  _handleSearch = value => {
    let updatedList = this.props.dataUserIdCompany;
    updatedList = updatedList.filter(v => {
      if (
        v.Name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Code == value
      ) {
        return true;
      }
      return false;
    });
    this.setState({ ListUserCompany: updatedList });
  };

  render() {
    return (
      <SafeAreaView style={stylesGlobal.styleSafeAreaWhite}>
        {this.state.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}
        <View
          style={[styles.header, styles.headerTop, stylesGlobal.paddingTop10]}
        >
          <StatusBar
            translucent={true}
            barStyle="dark-content"
            backgroundColor="white"
          />
          <SearchBar
            clearIcon={{ color: 'red' }}
            searchIcon={true}
            onChangeText={this._handleSearch}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.value}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListUserCompany.length} Agent Company
            </Text>
          </View>
        </View>
        <Container paddingtopcontainer={Platform.OS === 'ios' ? 100 : 120}>
          {this.state.ListUserCompany.length == 0 ? (
            this.state.value ? (
              <Text>{this.state.value} not recorded in Agent Company list</Text>
            ) : (
              <VirtualizedList
                initialNumToRender={5}
                data={this.state.ListUserCompany}
                getItemCount={data => data.length}
                contentContainerStyle={styles.scrollingStyle}
                style={[stylesGlobal.width100, stylesGlobal.paddingBottom80]}
                disableVirtualization
                pagingEnabled
                getItem={(data, index) => data[index]}
                keyExtractor={(item, index) => {
                  return item.key;
                }}
                maxToRenderPerBatch={1}
                renderItem={({ item, index }) => {
                  return (
                    <ListItemCountryAndCity
                      item={item}
                      key={index}
                      type="user"
                      onPress={() => this.selectedCountry(item)}
                    />
                  );
                }}
                onMomentumScrollBegin={() => {
                  this.setState({ refreshing: true });
                }}
                onMomentumScrollEnd={() => {
                  this.setState({ refreshing: false });
                }}
                onEndReached={() => {
                  this.setState({ refreshing: false });
                }}
                refreshing={true}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                  if (!this.state.refreshing) {
                    return null;
                  } else if (this.state.ListUserCompany.length == 0) {
                    return null;
                  }
                  return (
                    <Loading
                      sizeloading="large"
                      colorloading={styles.$goldcolor}
                      positionLoad="relative"
                    />
                  );
                }}
              />
            )
          ) : (
            <VirtualizedList
              initialNumToRender={5}
              data={this.state.ListUserCompany}
              getItemCount={data => data.length}
              contentContainerStyle={styles.scrollingStyle}
              style={[stylesGlobal.width100, stylesGlobal.paddingBottom80]}
              disableVirtualization
              pagingEnabled
              getItem={(data, index) => data[index]}
              keyExtractor={(item, index) => {
                return item.key;
              }}
              maxToRenderPerBatch={1}
              renderItem={({ item, index }) => {
                return (
                  <ListItemCountryAndCity
                    item={item}
                    key={index}
                    type="user"
                    onPress={() => this.selectedCountry(item)}
                  />
                );
              }}
              onMomentumScrollBegin={() => {
                this.setState({ refreshing: true });
              }}
              onMomentumScrollEnd={() => {
                this.setState({ refreshing: false });
              }}
              onEndReached={() => {
                this.setState({ refreshing: false });
              }}
              refreshing={true}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => {
                if (!this.state.refreshing) {
                  return null;
                } else if (this.state.ListUserCompany.length == 0) {
                  return null;
                }
                return (
                  <Loading
                    sizeloading="large"
                    colorloading={styles.$goldcolor}
                    positionLoad="relative"
                  />
                );
              }}
            />
          )}
          {/* <FlatList
            data={this.state.ListUserCompany}
            renderItem={({ item }) => (
              <ListItemCountryAndCity
                item={item}
                type="user"
                onPress={() => this.selectedCountry(item)}
              />
            )}
            keyExtractor={item => item.Id}
          /> */}
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  dataUserIdCompany: state.generalReducer.dataUserIdCompany,
  isDataUserIdCompany: state.generalReducer.isDataUserIdCompany,
});

export default connect(mapStateToProps, {
  getUserIdCompanyAction,
  resetListCustomerAction,
})(listUserCustomer);
