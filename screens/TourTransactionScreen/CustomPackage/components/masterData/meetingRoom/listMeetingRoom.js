import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  ScrollView,
  View,
  Modal,
  Picker,
  Alert,
  BackHandler,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import { Container } from '../../../components/container/index';
import styles from '../styles';
import stylesGlobal from '../../../components/styles';
import { CardAccomodation } from '../../../components/card/index';
import { ClearButtonWithIcon, NormalButton } from '../../../components/button';
import { RoundedLoading } from '../../../components/loading';
import PropTypes from 'prop-types';
import {
  get_attraction,
  reset_get_attraction,
} from '../../../actions/itemIteneraryAction';
import { SearchBar } from 'react-native-elements';
import { convertTimetoString } from '../../../helper/helper';
import {
  convertToStringDate,
  getHour,
  SumSecond,
} from '../../../helper/timeHelper';
import { Seperator } from '../../../components/list';
import { copyObject } from '../../../helper/dailyProgram';
import { handleFilterImagePrimary } from '../../../helper/checkingHelper';
import { transactionItem } from '../../../helper/transactionHelper';

class listExcrution extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listExcursion: PropTypes.array,
    isExcursion: PropTypes.string,
    attractionTypeFilter: PropTypes.array,
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
        categoryId: '',
        typeId: '',
      },
      labelcategoryId: null,
      labeltypeId: null,
      // Mov: this.props.navigation.state.params.Mov,
      AccomodationFilter: null,
      modalVisible: false,
      searchText: '',
      // yg diubah
      loading: false,
      ListExcrusion: DUMMYMEETING,
    };
  }

  // handleDetailExcrution = att => {
  //   let DP = copyObject(this.props.DailyProgram);
  //   let inDep = DP[this.state.Mov.dayIndex].Movements.findIndex(
  //     item => item.MovementName == 'DEPARTURE'
  //   );
  //   let inArr = DP[this.state.Mov.dayIndex].Movements.findIndex(
  //     item => item.MovementName == 'ARRIVAL'
  //   );
  //   if (
  //     DP[this.state.Mov.dayIndex].Movements.findIndex(
  //       item => item.Item.ServiceItemId == att.ServiceItemId
  //     ) >= 0
  //   )
  //     Alert.alert('Failed', 'Cannot choose same excursion in this day', [
  //       {
  //         text: 'OK',
  //       },
  //     ]);
  //   else if (
  //     DP[this.state.Mov.dayIndex].Movements.findIndex(
  //       item => item.Item.ServiceType == 'Package'
  //     ) >= 0 &&
  //     att.AttractionCategory == 'Package'
  //   )
  //     Alert.alert(
  //       'Failed',
  //       'Only one choose type package excursion in this day',
  //       [
  //         {
  //           text: 'OK',
  //         },
  //       ]
  //     );
  //   else if (att.IsSolidStartTime) {
  //     if (inDep >= 0 && inArr < 0) {
  //       let time = SumSecond(att.OperationStartTime, att.OptimumDuration);
  //       if (
  //         getHour(time) >=
  //         getHour(DP[this.state.Mov.dayIndex].Movements[inDep].DateTime)
  //       )
  //         Alert.alert(
  //           'Failed',
  //           'Estimated time for this excursion has exceed to departure time.Please choose another excursion.',
  //           [
  //             {
  //               text: 'OK',
  //             },
  //           ]
  //         );
  //       else {
  //         this.props.navigation.navigate('ExcrutionDetail', {
  //           Id: att.ServiceItemId,
  //           Mov: this.state.Mov,
  //         });
  //       }
  //     } else if (inArr >= 0 && inDep < 0) {
  //       if (
  //         getHour(att.OperationStartTime) >=
  //         getHour(DP[this.state.Mov.dayIndex].Movements[inArr].DateTime) + 2
  //       ) {
  //         this.props.navigation.navigate('ExcrutionDetail', {
  //           Id: att.ServiceItemId,
  //           Mov: this.state.Mov,
  //         });
  //       } else
  //         Alert.alert(
  //           'Failed',
  //           'Estimated time for this excursion has exceed to arrival time.Please choose another excursion.',
  //           [
  //             {
  //               text: 'OK',
  //             },
  //           ]
  //         );
  //     } else if (inDep >= 0 && inArr >= 0) {
  //       if (inDep > this.state.Mov.indexMov) {
  //         let time = SumSecond(att.OperationStartTime, att.OptimumDuration);
  //         if (
  //           getHour(time) >=
  //           getHour(DP[this.state.Mov.dayIndex].Movements[inDep].DateTime)
  //         )
  //           Alert.alert(
  //             'Failed',
  //             'Estimated time for this excursion has exceed to departure time.Please choose another excursion.',
  //             [
  //               {
  //                 text: 'OK',
  //               },
  //             ]
  //           );
  //         else {
  //           this.props.navigation.navigate('ExcrutionDetail', {
  //             Id: att.ServiceItemId,
  //             Mov: this.state.Mov,
  //           });
  //         }
  //       } else if (inArr < this.state.Mov.indexMov) {
  //         if (
  //           getHour(att.OperationStartTime) >=
  //           getHour(DP[this.state.Mov.dayIndex].Movements[inArr].DateTime) + 2
  //         ) {
  //           this.props.navigation.navigate('ExcrutionDetail', {
  //             Id: att.ServiceItemId,
  //             Mov: this.state.Mov,
  //           });
  //         } else
  //           Alert.alert(
  //             'Failed',
  //             'Estimated time for this excursion has exceed to arrival time.Please choose another excursion.',
  //             [
  //               {
  //                 text: 'OK',
  //               },
  //             ]
  //           );
  //       } else {
  //         this.props.navigation.navigate('ExcrutionDetail', {
  //           Id: att.ServiceItemId,
  //           Mov: this.state.Mov,
  //         });
  //       }
  //     } else {
  //       this.props.navigation.navigate('ExcrutionDetail', {
  //         Id: att.ServiceItemId,
  //         Mov: this.state.Mov,
  //       });
  //     }
  //   } else {
  //     this.props.navigation.navigate('ExcrutionDetail', {
  //       Id: att.ServiceItemId,
  //       Mov: this.state.Mov,
  //     });
  //   }
  // };

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     this.props.navigation.pop(); // works best when the goBack is async
  //     return true;
  //   });
  //   const { dayIndex, indexMov } = this.state.Mov;
  //   const { GuestAllocation } = this.props.CustomDetails;
  //   let item = transactionItem(
  //     this.props.CustomDetails,
  //     this.props.SummaryProgram,
  //     this.props.DailyProgram,
  //     this.props.Departures,
  //     this.props.Returns
  //   );
  //   this.props.dispatch(
  //     get_attraction(
  //       this.props.DailyProgram[dayIndex].Movements[indexMov].Destination,
  //       this.state.Filter.typeId,
  //       convertToStringDate(this.props.DailyProgram[dayIndex].Date),
  //       GuestAllocation.Adult + GuestAllocation.Child,
  //       item
  //     )
  //   );
  // }

  // componentDidUpdate() {
  //   if (this.props.isExcursion === 'success') {
  //     this.props.dispatch(reset_get_attraction());
  //     this.setState({
  //       loading: false,
  //       ListExcrusion: this.props.listExcursion,
  //     });
  //     return false;
  //   } else if (this.props.isExcursion === 'failed') {
  //     this.props.dispatch(reset_get_attraction());
  //     this.setState({
  //       loading: false,
  //     });
  //     return false;
  //   } else return true;
  // }

  // openModal = () => {
  //   this.setState({ modalVisible: true });
  // };

  // closeModal = () => {
  //   this.setState({ modalVisible: false });
  // };

  // handleFilter = value => {
  //   let updatedList = this.props.listExcursion;
  //   updatedList = updatedList.filter(v => {
  //     if (
  //       v.AttractionCategory.toLowerCase() == value.categoryId.toLowerCase()
  //     ) {
  //       return true;
  //     }
  //     if (v.AttractionType.Id.toLowerCase() == value.typeId.toLowerCase()) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   this.setState({ ListExcrusion: updatedList });
  //   this.setState({ modalVisible: false });
  // };

  _handleSearch = value => {
    this.setState({ searchText: value });
    let updatedList = this.props.listExcursion;
    updatedList = updatedList.filter(v => {
      if (v.Name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ ListExcrusion: updatedList });
  };

  handleDetailMeetingRoom = data => {
    this.props.navigation.navigate('ListMeetingRoomItem', {
      MeetingRoom: data,
      // Parameter: this.state.Parameter,
    });
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
              this.setModalVisible(this.state.modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={[styles.innerContainerExcrusion, styles.bottom]}>
                <Text style={styles.bold14}>Filter:</Text>
                <View style={styles.row}>
                  <Text>Excrusion Of Category</Text>
                </View>
                {Platform.OS === 'ios' ? (
                  <IOSPicker
                    mode="modal"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={
                      this.state.Filter.categoryId
                        ? this.state.Filter.categoryId
                        : 'Excrusion Category'
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
                    <Picker.Item label="Excursion Category" value="" />
                    <Picker.Item label="Package" value="Package" />
                    <Picker.Item label="Single" value="Single" />
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
                    <Picker.Item label="Excursion Category" value="" />
                    <Picker.Item label="Package" value="Package" />
                    <Picker.Item label="Single" value="Single" />
                  </Picker>
                )}
                <Seperator
                  widthsepar="100%"
                  colorSepar={styles.$blacklight2color}
                  heightSepar={1}
                />
                <View style={styles.row}>
                  <Text>Excrusion Type</Text>
                </View>
                {Platform.OS === 'ios' ? (
                  <IOSPicker
                    mode="modal"
                    textStyle={styles.textblack}
                    style={styles.containerDropDown}
                    selectedValue={
                      this.state.Filter.typeId
                        ? this.state.labeltypeId == 0
                          ? 'Excrusion Type'
                          : this.props.attractionTypeFilter[
                              this.state.labeltypeId - 1
                            ].Name
                        : 'Excrusion Type'
                    }
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        Filter: {
                          ...this.state.Filter,
                          typeId: itemValue,
                        },
                        labeltypeId: itemIndex,
                      });
                    }}
                  >
                    <Picker.Item label="Excursion Type" value="" />
                    {this.props.attractionTypeFilter
                      ? this.props.attractionTypeFilter.map((loc, i) => {
                          return (
                            <Picker.Item
                              label={loc.Name}
                              value={loc.Id}
                              key={i}
                            />
                          );
                        })
                      : null}
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
                    <Picker.Item label="Excursion Type" value="" />
                    {this.props.attractionTypeFilter
                      ? this.props.attractionTypeFilter.map((loc, i) => {
                          return (
                            <Picker.Item
                              label={loc.Name}
                              value={loc.Id}
                              key={i}
                            />
                          );
                        })
                      : null}
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
                      buttonColor="white"
                      buttonHeight={25}
                      buttonWidth="98%"
                      textColor={styles.$goldcolor}
                      colorBorder={styles.$goldcolor}
                      onPress={this.closeModal}
                    />
                  </View>
                  <View style={styles.colNoPadding50}>
                    <NormalButton
                      text="DONE"
                      textColor="black"
                      buttonHeight={25}
                      buttonWidth="98%"
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
            <Container
              paddingtopcontainer={Platform.OS === 'ios' ? 20 : 40}
              paddingbottomcontainer={50}
            >
              {this.state.ListExcrusion
                ? this.state.ListExcrusion.map((att, i) => {
                    let DataStar = att.AccommodationRating || '';
                    let Star = parseInt(DataStar.Id) || '';
                    return (
                      <CardAccomodation
                        widthCard="90%"
                        Img={
                          att.ObjectImages.length != 0
                            ? handleFilterImagePrimary(att.ObjectImages)
                            : att.ImageUrl
                        }
                        Title={att.Name}
                        key={i}
                        onPress={() => this.handleDetailMeetingRoom(att)}
                        subText={
                          att.AttractionType ? att.AttractionType.Name : ''
                        }
                        typeCard="MeetingRoom"
                        Address={att.Address}
                        ProfileFacilities={att.ProfileFacilities}
                        numberStar={Star}
                        estimatedPrice={3000000}
                        currency={'IDR'}
                      />
                    );
                  })
                : null}
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
              Showing {this.state.ListExcrusion.length} Excrusion
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
  // listExcursion: state.itemIteneraryReducer.attraction,
  listExcursion: DUMMYMEETING,
  isExcursion: state.itemIteneraryReducer.isAttraction,
  attractionTypeFilter: state.itemIteneraryReducer.attractionTypeFilter,
  DailyProgram: state.cusPackagesReducer.DailyProgram,
  CustomDetails: state.cusPackagesReducer.CustomDetails,
  Returns: state.cusPackagesReducer.Returns,
  Departures: state.cusPackagesReducer.Departures,
  SummaryProgram: state.cusPackagesReducer.SummaryProgram,
});

export default connect(mapStateToProps)(listExcrution);

const DUMMYMEETING = [
  {
    ProfileFacilities: [
      { Id: 'GYM', Name: 'Gym' },
      { Id: 'MEETINGROOMS', Name: 'Meeting Rooms' },
      { Id: 'SPA', Name: 'Spa' },
      { Id: 'WIFI', Name: 'Wi Fi' },
    ],
    AccommodationRating: { Id: '5', Name: '5 Stars' },
    Id: 0,
    Name: 'Meeting Room Profile',
    Description:
      '"Bali�Tanah Lot Temple�located at Tabanan regency and Tanah Lot word meaning is the small island floating on the sea,�Tanah Lot Temple�is built on the rock with 3 acre size."',
    LongDescription:
      'The�Tanah Lot temple�was built and has been a part of Balinese mythology for centuries. The temple is one of seven sea temples around the Balinese coast.',
    Address: 'Tanah Lot, Beraban, Kediri, Kabupaten Tabanan, Bali 8217',
    ImageUrl:
      'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/33de3db1-44e3-4093-8fc7-347e3cd7fcfaSunset-Di-Pura-Tanah-Lot-Tabanan-Bali-Facebook.jpg.jpg',
    TinyImageUrl:
      'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/33de3db1-44e3-4093-8fc7-347e3cd7fcfaSunset-Di-Pura-Tanah-Lot-Tabanan-Bali-Facebook.jpg_TINY.jpg',
    AttractionType: {
      Id: 'RELIGIOUS',
      Name: 'Religious',
    },
    ServiceItemId: 2525,
    OptimumDuration: 5400,
    OperationStartTime: '2020-02-25T07:00:00',
    OperationEndTime: '2020-02-25T19:00:00',
    IsSolidStartTime: false,
    IsSolidDuration: false,
    AttractionCategory: 'Single',
    PhoneNumber: '123123123',
    EmailAddress: 'tes@mail.com',
    Cities: [
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'BADUNG',
        Name: 'Badung',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'BAGUSJATI',
        Name: 'Bagus Jati',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'BALISUKAWATI',
        Name: 'Sukawati',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'BALITABANAN',
        Name: 'Tabanan',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'BEDUGUL',
        Name: 'Bedugul',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'BULELENG',
        Name: 'Buleleng',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'CANDIDASA',
        Name: 'Candidasa',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'CANGGU',
        Name: 'Canggu',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'DENPASAR',
        Name: 'Denpasar',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'GIANYAR',
        Name: 'Gianyar',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'GILIMANUK',
        Name: 'Gilimanuk',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'JEMBRANA',
        Name: 'Jembrana',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'JIMBARAN',
        Name: 'Jimbaran',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'KARANGASEM',
        Name: 'Karangasem',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'KEROBOKAN',
        Name: 'Kerobokan',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'KINTAMANI',
        Name: 'Kintamani',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'KLUNGKUNG',
        Name: 'Klungkung',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'KUTA',
        Name: 'Kuta',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'LEGIAN',
        Name: 'Legian',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'LOVINA',
        Name: 'Lovina',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'MENJANGAN',
        Name: 'Menjangan',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'NGURAHRAI',
        Name: 'Ngurah Rai',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'NUSADUA',
        Name: 'Nusa Dua',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'NUSALEMBONGAN',
        Name: 'Nusa Lembongan',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'NUSAPENIDA',
        Name: 'Nusa Penida',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'PADANGBAY',
        Name: 'Padang Bay',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'PECATU',
        Name: 'Pecatu',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'PEMUTERAN',
        Name: 'Pemuteran',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'SANUR',
        Name: 'Sanur',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'SEMINYAK',
        Name: 'Seminyak',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'SINGARAJA',
        Name: 'Singa Raja',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'TABANAN',
        Name: 'Tabanan',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'TANAHLOT',
        Name: 'Tanah Lot',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'TANJUNGBENOA',
        Name: 'Tanjung Benoa',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'TUBAN',
        Name: 'Tuban',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'TULAMBEN',
        Name: 'Tulamben',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'UBUD',
        Name: 'Ubud',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'ULUWATU',
        Name: 'Uluwatu',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'UMALAS',
        Name: 'Umalas',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'UNGASAN',
        Name: 'Ungasan',
      },
      {
        Region: {
          ImageUrl: null,
          Id: 'BALI',
          Name: 'Bali',
        },
        Id: 'UNGGASAN',
        Name: 'Unggasan',
      },
    ],
    ObjectImages: [
      {
        Id: 39,
        ImageUrl:
          'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/0911fc5f-7bb7-4f20-9ba8-b699ad2f94a3TanLot.jpg',
        ImageName: 'TanLot',
        TinyImageUrl: null,
        IsPrimaryImage: false,
      },
      {
        Id: 285,
        ImageUrl:
          'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/d64574af-f753-456c-9624-133506567825Tanah-Lot-Bali-1.jpg.jpg',
        ImageName: 'Tanah-Lot-Bali-1.jpg',
        TinyImageUrl:
          'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/d64574af-f753-456c-9624-133506567825Tanah-Lot-Bali-1.jpg_TINY.jpg',
        IsPrimaryImage: false,
      },
      {
        Id: 286,
        ImageUrl:
          'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/33de3db1-44e3-4093-8fc7-347e3cd7fcfaSunset-Di-Pura-Tanah-Lot-Tabanan-Bali-Facebook.jpg.jpg',
        ImageName: 'Sunset-Di-Pura-Tanah-Lot-Tabanan-Bali-Facebook.jpg',
        TinyImageUrl:
          'https://touressapiqa.azurewebsites.net//Content/imgSrc/Attractions/33de3db1-44e3-4093-8fc7-347e3cd7fcfaSunset-Di-Pura-Tanah-Lot-Tabanan-Bali-Facebook.jpg_TINY.jpg',
        IsPrimaryImage: true,
      },
    ],
    AddressObject: {
      Id: 1617,
      Address1: 'Tanah Lot, Beraban, Kediri, Kabupaten Tabanan, Bali 8217',
      Address2: '',
      Address3: '',
      PostalCode: '',
      Landmark: '',
      AreaId: 'DENPASAR',
      Area: {
        Id: 'DENPASAR',
        Name: 'Denpasar',
      },
      City: {
        Id: 'DENPASAR',
        Name: 'Denpasar',
      },
      Region: {
        Id: 'BALI',
        Name: 'Bali',
      },
      Country: {
        Id: 'ID',
        Name: 'Indonesia',
      },
      AddressString:
        'Tanah Lot, Beraban, Kediri, Kabupaten Tabanan, Bali 8217, Denpasar, Denpasar, Bali, Indonesia',
      Coordinate: {
        Lat: -8.621213,
        Lng: 115.086807,
      },
    },
    BillingAddressObject: {
      Id: 1618,
      Address1: 'Tanah Lot, Beraban, Kediri, Kabupaten Tabanan, Bali 8217',
      Address2: '',
      Address3: '',
      PostalCode: '',
      Landmark: '',
      AreaId: 'DENPASAR',
      Area: {
        Id: 'DENPASAR',
        Name: 'Denpasar',
      },
      City: {
        Id: 'DENPASAR',
        Name: 'Denpasar',
      },
      Region: {
        Id: 'BALI',
        Name: 'Bali',
      },
      Country: {
        Id: 'ID',
        Name: 'Indonesia',
      },
      AddressString:
        'Tanah Lot, Beraban, Kediri, Kabupaten Tabanan, Bali 8217, Denpasar, Denpasar, Bali, Indonesia',
      Coordinate: null,
    },
  },
];
