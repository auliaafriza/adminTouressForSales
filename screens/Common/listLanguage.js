import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  View,
  StatusBar,
  BackHandler,
  SafeAreaView,
  Platform,
  Text,
} from 'react-native';
import stylesGlobal from '../../components/styles';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import { ListItemCountryAndCity } from '../../components/list';
import { connect } from 'react-redux';
import { get_language, reset_language } from '../../actions/generalAction';
import { Container } from '../../components/container';
import { Loading } from '../../components/loading';
import { initialGuide } from '../../helper/tourGuides';

class listLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListLanguage: [],
      loading: false,
      dataLanguage: this.props.navigation.state.params.data,
      searchClearIcon: false,
      searchText: '',
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    languages: PropTypes.array,
    isLanguage: PropTypes.string,
    city: PropTypes.array,
  };

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.props.dispatch(get_language());
  };

  componentDidUpdate() {
    if (this.props.isLanguage == 'success') {
      this.props.dispatch(reset_language());
      this.filterData();
      this.setState({ loading: false });
      return false;
    } else if (this.props.isLanguage == 'failed') {
      this.props.dispatch(reset_language());
      this.setState({
        ...this.state,
        ListLanguage: [],
      });
      this.setState({ loading: false });
      return false;
    } else return true;
  }

  filterData = () => {
    if (this.state.dataLanguage.length != 0) {
      let updatedList = this.props.languages;
      let dataLanguage = [...this.state.dataLanguage];
      updatedList = updatedList.filter(word => {
        let hasil = dataLanguage.find(
          data => word.EnglishName == data.LanguageId.EnglishName
        );
        if (hasil == undefined) return true;
        else if (word.EnglishName == hasil.LanguageId.EnglishName) return false;
        else return true;
      });
      this.setState({ ListLanguage: updatedList });
    } else {
      this.setState({
        ...this.state,
        ListLanguage: this.props.languages,
      });
    }
  };

  selectedLanguage = results => {
    let dataLanguage = this.pushDataLanguage(results);
    this.props.navigation.pop();
    this.props.navigation.state.params.onSelect(dataLanguage);
  };

  pushDataLanguage = results => {
    let dataLanguage = [...this.state.dataLanguage];
    let City = this.props.navigation.state.params.destination;
    if (dataLanguage.length == 0) {
      dataLanguage.push(
        new initialGuide(results.Id, City, City.DateTime, City.EndTime)
      );
    } else {
      let value = dataLanguage.find(
        item => item.LanguageId == results.Id && item.CityId == City.CityId
      );
      {
        value
          ? null
          : dataLanguage.push(
              new initialGuide(results.Id, City, City.DateTime, City.EndTime)
            );
      }
    }
    return dataLanguage;
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

    let updatedList = this.props.languages;
    updatedList = updatedList.filter(v => {
      if (v.EnglishName.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ ListLanguage: updatedList });
  };

  render() {
    return (
      <Container>
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
              Showing {this.state.ListLanguage.length} Language
            </Text>
          </View>
        </View>
        <Container paddingtopcontainer={Platform.OS === 'ios' ? 100 : 120}>
          <FlatList
            data={this.state.ListLanguage}
            renderItem={({ item }) => (
              <ListItemCountryAndCity
                item={item}
                type="language"
                onPress={() => this.selectedLanguage(item)}
              />
            )}
            keyExtractor={item => item.Id}
          />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  languages: state.generalReducer.languages,
  isLanguage: state.generalReducer.isLanguage,
  city: state.generalReducer.cityInCountry,
});

export default connect(mapStateToProps)(listLanguage);
