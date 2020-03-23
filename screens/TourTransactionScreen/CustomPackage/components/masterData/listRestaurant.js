import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  ScrollView,
  View,
  Modal,
  Picker,
  BackHandler,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import { Container } from '../../../../../components/container';
import { CardAccomodation } from '../../../../../components/card';
import styles from './styles';
import stylesGlobal from '../../../../../components/styles';
import {
  ClearButtonWithIcon,
  NormalButton,
} from '../../../../../components/button';
import { RoundedLoading } from '../../../../../components/loading';

import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
  getRestaurantByFilter,
  resetStatusRestaurantsByFilter,
} from '../../../../../actions/restaurant/restaurantAction';
import { convertToStringDate } from '../../../../../helper/timeHelper';
import { Seperator } from '../../../../../components/list';
import { handleFilterImagePrimary } from '../../../../../helper/checkingHelper';

class listRestaurant extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listRestaurant: PropTypes.array,
    isRestaurant: PropTypes.string,
    menuClasses: PropTypes.array,
    menuTypes: PropTypes.array,
    menuCategory: PropTypes.array,
    DailyProgram: PropTypes.array,
    CustomDetails: PropTypes.array,
    Returns: PropTypes.array,
    Departures: PropTypes.array,
    SummaryProgram: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      Filter: {
        typeId: '',
        classesId: '',
        categoryId: '',
        facilityIds: '',
        locationIds: '',
        menuClassId: '',
        ratingIds: '',
        specializationId: '',
      },

      ListRestaurant: [],
      Mov: this.props.route.params.Mov,
      modalVisible: false,
      loading: true,
      searchText: '',
    };
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      ListRestaurant: this.props.listRestaurant,
    });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    const {
      ratingIds,
      locationIds,
      specializationId,
      menuClassId,
      facilityIds,
    } = this.state.Filter;
    const { dayIndex, indexMov } = this.state.Mov;
    const { GuestAllocation } = this.props.CustomDetails;
    let item = this.props.route.params.Demo ? this.props.route.params.Demo : [];
    const data = {
      cityId: this.props.DailyProgram[dayIndex].Movements[indexMov].Destination,
      ratingIds: ratingIds,
      locationIds: locationIds,
      specializationId: specializationId,
      menuClassId: menuClassId,
      facilityIds: facilityIds,
      requestedDate: convertToStringDate(
        this.props.DailyProgram[dayIndex].Date
      ),
      pax: GuestAllocation.Adult + GuestAllocation.Child,
      dataDemoPrice: item,
    };
    this.props.getRestaurantByFilter(data);
  }

  componentDidUpdate() {
    if (this.props.isRestaurant === 'success')
      this.setState(
        { ListRestaurant: this.props.listRestaurant },
        () => this.props.resetStatusRestaurantsByFilter(),
        this.setState({ loading: false })
      );
  }

  handleDetailRestaurant = item => {
    this.setState(
      {
        Mov: {
          ...this.state.Mov,
          Item: item,
          ActivityData: {
            ...this.state.Mov.ActivityData,
            Duration: 3600,
            IsSolidDuration: false,
            IsSolidStartTime: false,
            Name: item.Name,
            OperationEndTime: item.OperationEndTime,
            OperationStartTime: item.OperationStartTime,
            OptimumDuration: 1800,
          },
        },
      },
      () => {
        this.props.navigation.navigate('RestaurantDetail', {
          Mov: this.state.Mov,
          Id: item.Id,
          Demo: this.props.route.params.Demo,
        });
      }
    );
  };

  handleFilter = value => {
    let updatedList = this.props.listRestaurant;
    let data;
    updatedList = updatedList.filter(v => {
      if (v.Type == value.typeId) {
        return true;
      } else {
        if (v.Menu.length > 0) {
          v.Menu.filter(menuFilter => {
            if (menuFilter.Category == value.categoryId.split('_').join(' ')) {
              data = true;
            }
            if (menuFilter.MenuClass == value.classesId) {
              data = true;
            }
          });
          return data;
        }
        return false;
      }
    });
    this.setState({ ListRestaurant: updatedList, modalVisible: false });
  };

  _handleSearch = value => {
    this.setState({ searchText: value });
    let updatedList = this.props.listRestaurant;
    updatedList = updatedList.filter(v => {
      if (v.Name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ ListRestaurant: updatedList });
  };

  render() {
    const width90 =
      Dimensions.get('window').width - Dimensions.get('window').width * 0.1;
    return (
      <Container>
        {/* <SearchBar
          clearIcon={{ color: 'red' }}
          searchIcon={true}
          onChangeText={this._handleSearch}
          placeholder="Type Here..."
          lightTheme
          containerStyle={stylesGlobal.width100}
        /> */}

        <ScrollView
          style={[stylesGlobal.containerScroll, stylesGlobal.paddingVertical80]}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={[styles.innerContainer, styles.bottom]}>
                <Text style={styles.bold14}>Filter:</Text>
                <Text>Menu Category</Text>
                {Platform.OS === 'ios' ? (
                  <IOSPicker
                    mode="modal"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={
                      this.state.Filter.categoryId
                        ? this.props.menuCategory
                        : 'Menu Category'
                    }
                    onValueChange={itemValue => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          categoryId: itemValue,
                        },
                      });
                    }}
                  >
                    <Picker.Item label="Menu Category" value="" />
                    {this.props.menuCategory.map(category => {
                      return (
                        <Picker.Item
                          label={category.split('_').join(' ')}
                          value={category}
                          key={category}
                        />
                      );
                    })}
                  </IOSPicker>
                ) : (
                  <Picker
                    mode="dialog"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={this.state.Filter.categoryId}
                    onValueChange={itemValue => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          categoryId: itemValue,
                        },
                      });
                    }}
                  >
                    <Picker.Item label="Menu Category" value="" />
                    {this.props.menuCategory.map(category => {
                      return (
                        <Picker.Item
                          label={category.split('_').join(' ')}
                          value={category}
                          key={category}
                        />
                      );
                    })}
                  </Picker>
                )}
                <Seperator
                  widthsepar="100%"
                  colorSepar={styles.$blacklight2color}
                  heightSepar={1}
                />
                <Text>Menu Classes</Text>
                {Platform.OS === 'ios' ? (
                  <IOSPicker
                    mode="modal"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={
                      this.state.Filter.classesId
                        ? this.state.Filter.classesId
                        : 'Menu Classes'
                    }
                    onValueChange={itemValue => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          classesId: itemValue,
                        },
                      });
                    }}
                  >
                    <Picker.Item label="Menu Classes" value="" />
                    {this.props.menuClasses.map(clas => {
                      return (
                        <Picker.Item label={clas} value={clas} key={clas} />
                      );
                    })}
                  </IOSPicker>
                ) : (
                  <Picker
                    mode="dialog"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={this.state.Filter.classesId}
                    onValueChange={itemValue => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          classesId: itemValue,
                        },
                      });
                    }}
                  >
                    <Picker.Item label="Menu Classes" value="" />
                    {this.props.menuClasses.map(clas => {
                      return (
                        <Picker.Item label={clas} value={clas} key={clas} />
                      );
                    })}
                  </Picker>
                )}
                <Seperator
                  widthsepar="100%"
                  colorSepar={styles.$blacklight2color}
                  heightSepar={1}
                />
                <Text>Menu Types</Text>
                {Platform.OS === 'ios' ? (
                  <IOSPicker
                    mode="modal"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={
                      this.state.Filter.typeId
                        ? this.state.Filter.typeId
                        : 'Menu Types'
                    }
                    onValueChange={itemValue => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          typeId: itemValue,
                        },
                      });
                    }}
                  >
                    <Picker.Item label="Menu Types" value="" />
                    {this.props.menuTypes.map((types, i) => {
                      return (
                        <Picker.Item
                          label={types.Name}
                          value={types.Id}
                          key={i}
                        />
                      );
                    })}
                  </IOSPicker>
                ) : (
                  <Picker
                    mode="dialog"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={this.state.Filter.typeId}
                    onValueChange={itemValue => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          typeId: itemValue,
                        },
                      });
                    }}
                  >
                    <Picker.Item label="Menu Types" value="" />
                    {this.props.menuTypes.map((types, i) => {
                      return (
                        <Picker.Item
                          label={types.Name}
                          value={types.Id}
                          key={i}
                        />
                      );
                    })}
                  </Picker>
                )}
                <Seperator
                  widthsepar="100%"
                  colorSepar={styles.$blacklight2color}
                  heightSepar={1}
                />
                <View style={styles.row}>
                  <View style={styles.colNoPadding50}>
                    <NormalButton
                      text="RESET"
                      buttonHeight={25}
                      buttonWidth="98%"
                      buttonColor="white"
                      textColor={styles.$goldcolor}
                      colorBorder={styles.$goldcolor}
                      onPress={this.closeModal}
                    />
                  </View>
                  <View style={styles.colNoPadding50}>
                    <NormalButton
                      text="DONE"
                      buttonHeight={25}
                      buttonWidth="98%"
                      textColor="black"
                      buttonColor={styles.$goldcolor}
                      onPress={() => this.handleFilter(this.state.Filter)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          {this.state.loading ? (
            <View
              style={[
                stylesGlobal.width100,
                stylesGlobal.marginTop10,
                stylesGlobal.flexSize,
                stylesGlobal.paddingHorizontal20,
              ]}
            >
              <RoundedLoading width={width90} height={150} line={10} />
            </View>
          ) : (
            <Container paddingtopcontainer={Platform.OS === 'ios' ? 20 : 40}>
              {this.state.ListRestaurant.map((resto, i) => {
                return (
                  <CardAccomodation
                    widthCard="90%"
                    Img={
                      resto.RestaurantProfileImages.length != 0
                        ? handleFilterImagePrimary(
                            resto.RestaurantProfileImages
                          )
                        : resto.ImageUrl
                    }
                    Title={resto.Name}
                    key={i}
                    onPress={() => this.handleDetailRestaurant(resto)}
                    roundedText={
                      resto.Menu
                        ? resto.Menu.length != 0
                          ? resto.Menu[0].MenuClass + ' Dining'
                          : ''
                        : ''
                    }
                    typeCard="Restaurant"
                    bottomText={
                      resto.Menu
                        ? resto.Menu.length != 0
                          ? resto.Menu[0].Category +
                            ' ' +
                            resto.Menu[0].TypeOfMenu
                          : ''
                        : ''
                    }
                    city={
                      resto.AddressObject
                        ? resto.AddressObject.City
                          ? resto.AddressObject.City.Name
                          : ''
                        : ''
                    }
                    estimatedPrice={
                      resto.EstimatedTotalPrice
                        ? resto.EstimatedTotalPrice.Price
                        : ''
                    }
                    currency={
                      resto.EstimatedTotalPrice
                        ? resto.EstimatedTotalPrice.CurrencyId
                        : ''
                    }
                    estimatedPrice={
                      resto.EstimatedTotalPrice
                        ? resto.EstimatedTotalPrice.Price
                        : ''
                    }
                    currency={
                      resto.EstimatedTotalPrice
                        ? resto.EstimatedTotalPrice.CurrencyId
                        : ''
                    }
                  />
                );

                // Address={resto.Address}
              })}
              <View
                style={[stylesGlobal.marginBottom80, stylesGlobal.width100]}
              />
            </Container>
          )}
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
              Showing {this.state.ListRestaurant.length} Restaurant
            </Text>
          </View>
        </View>
        <View style={styles.footerFilter}>
          <View style={styles.rowNoPaddingFilter}>
            <View style={[stylesGlobal.width100, stylesGlobal.paddingTop10]}>
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
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listRestaurant: state.restaurantReducer.restaurants,
  isRestaurant: state.restaurantReducer.getRestaurantByFilterStatus,
  menuClasses: state.restaurantReducer.menu,
  menuTypes: state.restaurantReducer.menu,
  menuCategory: state.restaurantReducer.menu,
  DailyProgram: state.transactionReducer.DailyProgram,
  CustomDetails: state.transactionReducer.CustomDetails,
  Returns: state.transactionReducer.Returns,
  Departures: state.transactionReducer.Departures,
  SummaryProgram: state.transactionReducer.SummaryProgram,
});

export default connect(mapStateToProps, {
  getRestaurantByFilter,
  resetStatusRestaurantsByFilter,
})(listRestaurant);
