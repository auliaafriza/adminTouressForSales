import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  VirtualizedList,
  View,
  StatusBar,
  BackHandler,
  Platform,
  Text,
} from 'react-native';
import stylesGlobal from '../../components/styles';
import styles from './styles';
import {SearchBar} from 'react-native-elements';
import {ListItemCountryAndCity} from '../../components/list';
import {connect} from 'react-redux';
import {get_country, reset_country} from '../../actions/generalAction';
import {Container} from '../../components/container';
import {Loading} from '../../components/loading';
class listCountry extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ListCountry: this.props.countries,
      value: '',
      refreshing: true,
      searchClearIcon: false,
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    countries: PropTypes.array,
    isCountries: PropTypes.string,
  };

  componentDidMount = () => {
    BackHandler.addEventListener ('hardwareBackPress', () => {
      this.props.navigation.pop (); // works best when the goBack is async
      return true;
    });
    this.props.dispatch (get_country ());
  };

  componentDidUpdate () {
    if (
      this.props.isCountries == 'success' &&
      this.state.ListCountry.length == 0
    ) {
      this.setState ({...this.state, ListCountry: this.props.countries});
      this.props.dispatch (reset_country ());
      return false;
    } else if (this.props.isCountries == 'failed') {
      this.setState ({...this.state, ListCountry: []});
      this.props.dispatch (reset_country ());
      return false;
    } else return true;
  }

  selectedCountry = results => {
    this.props.navigation.pop ();
    this.props.route.params.onSelect (results);
  };

  _onChangeSearchText = searchText => {
    if (searchText) {
      this.setState ({searchClearIcon: {color: 'red'}, value: searchText});
    } else {
      this.setState ({searchClearIcon: false, value: ''});
    }
  };

  _handleSearch = value => {
    this._onChangeSearchText (value);
    let updatedList = this.props.countries;
    updatedList = updatedList.filter (v => {
      if (
        v.Name.toLowerCase ().indexOf (value.toLowerCase ()) > -1 ||
        v.Id.toLowerCase ().indexOf (value.toLowerCase ()) > -1
      ) {
        return true;
      }
      return false;
    });
    this.setState ({ListCountry: updatedList});
  };

  render () {
    return (
      <Container>
        <View
          style={[styles.header, styles.headerTop, stylesGlobal.paddingTop10]}
        >
          <StatusBar
            translucent={true}
            barStyle="dark-content"
            backgroundColor="white"
          />
          <SearchBar
            clearIcon={this.state.searchClearIcon}
            searchIcon={true}
            onChangeText={this._handleSearch}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.value}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListCountry.length} Country
            </Text>
          </View>
        </View>
        <Container paddingtopcontainer={Platform.OS === 'ios' ? 100 : 120}>
          {this.state.ListCountry.length == 0
            ? this.state.value
                ? <Text>{this.state.value} not recorded in country list</Text>
                : <VirtualizedList
                    initialNumToRender={20}
                    data={this.state.ListCountry}
                    getItemCount={data => data.length}
                    contentContainerStyle={styles.scrollingStyle}
                    style={[
                      stylesGlobal.width100,
                      stylesGlobal.paddingBottom80,
                      stylesGlobal.paddingTop10,
                    ]}
                    disableVirtualization
                    pagingEnabled
                    getItem={(data, index) => data[index]}
                    keyExtractor={(item, index) => {
                      return item.key;
                    }}
                    maxToRenderPerBatch={1}
                    renderItem={({item, index}) => {
                      return (
                        <ListItemCountryAndCity
                          key={index}
                          item={item}
                          type="country"
                          onPress={() => this.selectedCountry (item)}
                        />
                      );
                    }}
                    onMomentumScrollBegin={() => {
                      this.setState ({refreshing: true});
                    }}
                    onMomentumScrollEnd={() => {
                      this.setState ({refreshing: false});
                    }}
                    onEndReached={() => {
                      this.setState ({refreshing: false});
                    }}
                    refreshing={true}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => {
                      if (!this.state.refreshing) {
                        return null;
                      } else if (this.state.ListCountry.length == 0) {
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
            : <VirtualizedList
                initialNumToRender={5}
                data={this.state.ListCountry}
                getItemCount={data => data.length}
                contentContainerStyle={styles.scrollingStyle}
                style={[
                  stylesGlobal.width100,
                  stylesGlobal.paddingBottom80,
                  stylesGlobal.paddingTop10,
                ]}
                disableVirtualization
                pagingEnabled
                getItem={(data, index) => data[index]}
                keyExtractor={(item, index) => {
                  return item.key;
                }}
                maxToRenderPerBatch={1}
                renderItem={({item, index}) => {
                  return (
                    <ListItemCountryAndCity
                      key={index}
                      item={item}
                      type="country"
                      onPress={() => this.selectedCountry (item)}
                    />
                  );
                }}
                onMomentumScrollBegin={() => {
                  this.setState ({refreshing: true});
                }}
                onMomentumScrollEnd={() => {
                  this.setState ({refreshing: false});
                }}
                onEndReached={() => {
                  this.setState ({refreshing: false});
                }}
                refreshing={true}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                  if (!this.state.refreshing) {
                    return null;
                  } else if (this.state.ListCountry.length == 0) {
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
              />}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.generalReducer.countries,
  isCountries: state.generalReducer.isCountries,
});

export default connect (mapStateToProps) (listCountry);
