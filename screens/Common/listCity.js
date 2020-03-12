import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  VirtualizedList,
  View,
  StatusBar,
  BackHandler,
  Text,
  Platform,
} from 'react-native';
import { Loading } from '../../components/loading';
import { Container } from '../../components/container/index';
import { SearchBar } from 'react-native-elements';
import { ListItemCountryAndCity } from '../../components/list';
import { connect } from 'react-redux';
import stylesGlobal from '../../components/styles';
import styles from './styles';

class listCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListCity: this.props.city,
      searchClearIcon: false,
      refreshing: true,
      value: '',
      searchText: '',
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    city: PropTypes.array,
  };

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    // this.props.dispatch(get_country());
  };

  selectedCountry = results => {
    this.props.navigation.pop();
    let i = this.props.navigation.state.params.index;
    if (i >= 0) this.props.navigation.state.params.onSelect(i, results);
    else this.props.navigation.state.params.onSelect(results);
  };

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
    let updatedList = this.props.city;
    updatedList = updatedList.filter(v => {
      if (
        v.Name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Region.Name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Country.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
      ) {
        return true;
      }
      return false;
    });
    this.setState({ ListCity: updatedList });
  };

  render() {
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
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListCity.length} City
            </Text>
          </View>
        </View>
        <Container paddingtopcontainer={Platform.OS === 'ios' ? 100 : 120}>
          {this.state.ListCity.length == 0 ? (
            this.state.value ? (
              <Text>{this.state.value} not recorded in city list</Text>
            ) : (
              <VirtualizedList
                initialNumToRender={5}
                data={this.state.ListCity}
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
                renderItem={({ item, index }) => {
                  return (
                    <ListItemCountryAndCity
                      item={item}
                      key={index}
                      type="city"
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
                  } else if (this.state.ListCity.length == 0) {
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
              initialNumToRender={20}
              data={this.state.ListCity}
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
              renderItem={({ item, index }) => {
                return (
                  <ListItemCountryAndCity
                    item={item}
                    key={index}
                    type="city"
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
                } else if (this.state.ListCity.length == 0) {
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
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  city: state.generalReducer.cityInCountry,
});

export default connect(mapStateToProps)(listCity);
