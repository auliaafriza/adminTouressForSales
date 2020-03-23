import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  BackHandler,
  Text,
  Platform,
} from 'react-native';
import {Container} from '../../components/container/index';
import {SearchBar} from 'react-native-elements';
import {ListItemCountryAndCity} from '../../components/list';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {set_airport} from '../../actions/itemIteneraryAction';
import {setObjectAirport, getObjectAirport} from '../../helper/dailyProgram';
import {getAirport} from '../../api/itemItenerarySaga';
import stylesGlobal from '../../components/styles';
import styles from './styles';

class listAirportByRegion extends Component {
  constructor (props) {
    super (props);
    this.state = {
      ListAirport: this.props.airport,
      ListAllAirport: this.props.listAirport,
      Index: this.props.route.params.index,
      Data: this.props.route.params.data,
      searchText: '',
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    airport: PropTypes.array,
    token: PropTypes.string,
  };
  getPopularAirport = data => {
    let result = [];
    data.length != 0
      ? data.map (dataGroup => {
          dataGroup.IsPopular == true ? result.push (dataGroup) : null;
        })
      : null;
    return result;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener ('hardwareBackPress', () => {
      this.props.navigation.pop (); // works best when the goBack is async
      return true;
    });
    let airport = [];

    airport = this.props.airport;

    if (this.state.Index != null) {
      airport = await this.getAirports (
        this.state.Data[this.state.Index].Region
      );
    } else {
      airport = await this.getAirports (this.state.Data.Region);
    }
    await this.setState ({ListAirport: airport});
  };

  getAirports = async region => {
    let airport = await getObjectAirport (this.props.airport, region);
    if (airport == null) {
      airport = await getAirport (this.props.token, region);
      if (airport.length > 0) {
        this.props.dispatch (
          await set_airport (
            await setObjectAirport (this.props.airport, region, airport)
          )
        );
      }
    }
    return airport;
  };

  selectedCountry = results => {
    this.props.navigation.pop ();
    this.props.route.params.onSelect (
      this.state.Data,
      this.state.Index,
      results
    );
  };

  _handleSearch = value => {
    this.setState ({searchText: value});
    let updatedList = this.props.airport;
    updatedList = updatedList.filter (v => {
      if (
        v.Name.toLowerCase ().indexOf (value.toLowerCase ()) > -1 ||
        v.City.Name.toLowerCase ().indexOf (value.toLowerCase ()) > -1
      ) {
        return true;
      }
      return false;
    });
    this.setState ({ListAirport: updatedList});
  };

  render () {
    let popular = this.getPopularAirport (
      this.state.ListAirport.length != 0
        ? this.state.ListAirport
        : this.state.ListAllAirport
    );
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
            onChangeText={text => this._handleSearch (text)}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing{' '}
              {this.state.ListAirport.length != 0
                ? this.state.ListAirport.length
                : this.state.ListAllAirport.length}
              {' '}
              Airport
            </Text>
          </View>
        </View>
        <Container paddingtopcontainer={Platform.OS === 'ios' ? 95 : 115}>
          <ScrollView>
            {popular.length != 0
              ? <View
                  style={[
                    stylesGlobal.width100,
                    stylesGlobal.paddingHorizontal10,
                    stylesGlobal.marginBottom20,
                    styles.titleAirport,
                  ]}
                >
                  <Text style={[stylesGlobal.textDarkGrey]}>
                    Popular Destination
                  </Text>
                </View>
              : null}

            {popular
              ? popular.map ((item, i) => (
                  <ListItemCountryAndCity
                    item={item}
                    key={i}
                    type="airport"
                    onPress={() => this.selectedCountry (item)}
                  />
                ))
              : null}
            <View
              style={[
                stylesGlobal.width100,
                stylesGlobal.paddingHorizontal10,
                stylesGlobal.marginBottom20,
                styles.titleAirport,
              ]}
            >
              <Text style={[stylesGlobal.textDarkGrey]}>
                Recomended Destination
              </Text>
            </View>
            {this.state.ListAirport.length != 0
              ? this.state.ListAirport.map ((item, i) => (
                  <ListItemCountryAndCity
                    item={item}
                    key={i}
                    type="airport"
                    onPress={() => this.selectedCountry (item)}
                  />
                ))
              : this.state.ListAllAirport.map ((item, i) => (
                  <ListItemCountryAndCity
                    item={item}
                    key={i}
                    type="airport"
                    onPress={() => this.selectedCountry (item)}
                  />
                ))}
          </ScrollView>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  airport: state.itemIteneraryReducer.airport,
  listAirport: state.itemIteneraryReducer.listAirport,
  token: state.userAuthReducer.token,
});

export default connect (mapStateToProps) (listAirportByRegion);
