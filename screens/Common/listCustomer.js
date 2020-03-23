import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  VirtualizedList,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  BackHandler,
  Image,
  SafeAreaView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ListItemCountryAndCity } from '../../components/list';
import { connect } from 'react-redux';
import styles from './styles';
import {
  getListCustomerAction,
  resetListCustomerAction,
} from '../../actions/General/generalAction';
// import {
//   get_list_company,
//   reset_list_company,
// } from '../../actions/transactionAction';
import stylesGlobal from '../../components/styles';
import styless from './styles';
import { Loading } from '../../components/loading';
import IconAdd from '../../assets/Icon/add.png';
import imageicon from '../../assets/Icon/user.png';
// import { get_userid_by_companycode } from '../../actions/companyAction';
class listCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelect: this.props.route.params.onSelect,
      ListCompany: this.props.ListCompany,
      refreshing: true,
      loading: false,
      value: '',
      searchText: '',
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    ListCompany: PropTypes.array,
    isListCompany: PropTypes.string,
    isDataUserIdCompany: PropTypes.string,
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.setState({ loading: true });
    this.props.getListCustomerAction();
    // this.props.dispatch(get_list_company());
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isListCompany === 'success') {
      this.setState({ loading: false });
      this.setState({ ListCompany: nextProps.ListCompany });
      this.props.resetListCustomerAction();
      // this.props.dispatch(reset_list_company());
      return false;
    } else if (nextProps.isListCompany === 'failed') {
      this.setState({ loading: false });
      this.props.resetListCustomerAction();
      // this.props.dispatch(reset_list_company());
      return false;
    } else return true;
  }

  selectedCountry = results => {
    // await this.props.dispatch(get_userid_by_companycode(results.Code));
    // this.backToSummary(results);
    this.props.navigation.navigate('ListUserCustomer', {
      code: results.Code,
      name: results.Name,
      onSelect: this.state.onSelect,
    });
  };

  _handleSearch = value => {
    this.setState({ searchText: value });
    let updatedList = this.props.ListCompany;
    updatedList = updatedList.filter(v => {
      if (
        v.Name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Code == value
      ) {
        return true;
      }
      return false;
    });
    this.setState({ ListCompany: updatedList });
  };

  RegisCustomer = () => {
    this.props.navigation.navigate('RegisterCustomer', {
      onSelectData: this.selectedCountry,
    });
  };

  render() {
    return (
      <SafeAreaView style={stylesGlobal.styleSafeAreaWhite}>
        {this.props.loading ? (
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
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListCompany.length} Agent Company
            </Text>
          </View>
        </View>
        <View style={styles.container1}>
          <View
            style={[
              styless.colNoPadding1,
              styless.containerDataTour1,
              stylesGlobal.row100,
              stylesGlobal.center,
            ]}
          >
            <View style={[stylesGlobal.width25, styles.paddingLeft20]}>
              <Image
                style={[
                  stylesGlobal.containerIcon20,
                  stylesGlobal.tintColorGrey,
                ]}
                source={imageicon}
                resizeMode="center"
              />
            </View>
            <View style={stylesGlobal.width50}>
              <Text style={[stylesGlobal.textd16, stylesGlobal.colorGrey]}>
                Register a new company
              </Text>
            </View>
            <View style={[stylesGlobal.width25, styles.paddingLeft20]}>
              <TouchableOpacity
                style={styles.iconFrameAdd}
                onPress={this.RegisCustomer}
              >
                <Image
                  style={[stylesGlobal.imageIcon, styless.tintColorWhite]}
                  source={IconAdd}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.ListCompany.length == 0 ? (
            this.state.value ? (
              <Text>{this.state.value} not recorded in Agent Company list</Text>
            ) : (
              <VirtualizedList
                initialNumToRender={5}
                data={this.state.ListCompany}
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
                      type="customer"
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
                  } else if (this.state.ListCompany.length == 0) {
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
              data={this.state.ListCompany}
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
                    type="customer"
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
                } else if (this.state.ListCompany.length == 0) {
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
            data={this.state.ListCompany}
            renderItem={({ item }) => (
              <ListItemCountryAndCity
                item={item}
                type="customer"
                onPress={() => this.selectedCountry(item)}
              />
            )}
            keyExtractor={item => item.Id}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ListCompany: state.generalReducer.ListCompany,
  isListCompany: state.generalReducer.isListCompany,
  // isDataUserIdCompany: state.companyProfileReducer.isDataUserIdCompany,
  loading: state.generalReducer.loading,
});

export default connect(mapStateToProps, {
  getListCustomerAction,
  resetListCustomerAction,
})(listCustomer);
