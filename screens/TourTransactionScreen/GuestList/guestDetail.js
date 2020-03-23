import React, { Component } from 'react';
import {
  View,
  Picker,
  ScrollView,
  Text,
  BackHandler,
  Platform,
  TouchableOpacity,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import { Container } from '../../../components/container';
import {
  RoundedTextInput,
  RoundedTextInputWithButton,
} from '../../../components/textInput';
import styles from './styles';
import stylesGlobal from '../../../components/styles';

import { KeyboardAvoid } from '../../../components/keyboard';
import { NormalButton } from '../../../components/button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { copyObject } from '../../../helper/dailyProgram';
import { TextWarning } from '../../../components/text';
import { LinearGradient } from 'expo-linear-gradient';

class guestDetail extends Component {
  constructor(props) {
    super(props);
    const i = this.props.route.params.index;
    const guest = this.props.route.params.guests;
    let data = this.props.countries.find(item => item.Id == guest[i].CountryId);
    let Country = data === undefined ? { Name: null } : data;
    this.state = {
      Guests: {
        CountryId: guest[i].CountryId,
        Country: Country,
        FirstName: guest[i].FirstName,
        LastName: guest[i].LastName,
        GuestCategory: guest[i].GuestCategory,
        GuestTitle: guest[i].GuestTitle,
        GuestType: guest[i].GuestType,
        IdentityNbr: guest[i].IdentityNbr,
        IdentityType: guest[i].IdentityType,
      },
      LabelGuestTitle: null,
      errorFirstName: '',
      errorLastName: '',
      errorCountry: '',
      errorGuestTitle: '',
      errorIdentityNbr: '',
      errorIdentityType: '',
      // animatedIsFocused: new Animated.Value(
      //   this.state.Guests.IdentityType !== '' ? 1 : 0
      // ),
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    countries: PropTypes.array,
    guestTitle: PropTypes.array,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
  }

  handleCountry = () => {
    this.props.navigation.navigate('General', {
      screen: 'ListCountry',
      params: {
        onSelect: this.onSelectCountry,
      },
    });
  };

  onSelectCountry = data => {
    this.setState({
      Guests: {
        ...this.state.Guests,
        Country: data,
        CountryId: data.Id,
      },
    });
  };

  validate = () => {
    const {
      Country,
      FirstName,
      LastName,
      GuestTitle,
      IdentityNbr,
      IdentityType,
    } = this.state.Guests;
    let isError = false;
    const errors = {
      errorFirstName: '',
      errorLastName: '',
      errorCountry: '',
      errorGuestTitle: '',
      errorIdentityNbr: '',
      errorIdentityType: '',
    };

    if (FirstName == null || FirstName.length < 1) {
      isError = true;
      errors.errorFirstName = 'Please Fill FirstName';
    }
    if (LastName == null || LastName.length < 1) {
      isError = true;
      errors.errorLastName = 'Please Fill Lastname';
    }
    if (Country.Name == null || Country.Name.length < 1) {
      isError = true;
      errors.errorCountry = 'Please Choose Country';
    }
    if (IdentityType == null || IdentityType.length < 1) {
      isError = true;
      errors.errorIdentityType = 'Please Choose type of ID';
    }
    if (IdentityNbr == null || IdentityNbr.length < 1) {
      isError = true;
      errors.errorIdentityNbr = 'Please Fill ID Number';
    }
    if (GuestTitle == null || GuestTitle.length < 1) {
      isError = true;
      errors.errorGuestTitle = 'Please Choose Title Guest';
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  handleResult = () => {
    const error = this.validate();
    if (!error) {
      const {
        CountryId,
        FirstName,
        LastName,
        GuestCategory,
        GuestTitle,
        GuestType,
        IdentityNbr,
        IdentityType,
      } = this.state.Guests;
      const i = this.props.route.params.index;
      let Guests = copyObject(this.props.route.params.guests);
      Guests[i].CountryId = CountryId;
      Guests[i].FirstName = FirstName;
      Guests[i].LastName = LastName;
      Guests[i].GuestCategory = GuestCategory;
      Guests[i].GuestTitle = GuestTitle;
      Guests[i].GuestType = GuestType;
      Guests[i].IdentityNbr = IdentityNbr;
      Guests[i].IdentityType = IdentityType;
      this.props.navigation.pop();
      this.props.route.params.onSelect(Guests);
    }
  };

  render() {
    return (
      <Container>
        <KeyboardAvoid>
          {() => (
            <ScrollView style={stylesGlobal.scrollContainer}>
              <Container paddingbottomcontainer={50} paddingtopcontainer={20}>
                <View
                  style={[
                    stylesGlobal.paddingBottom20,
                    stylesGlobal.paddingLeft20,
                    stylesGlobal.paddingRight20,
                    stylesGlobal.paddingTop5,
                  ]}
                >
                  <View style={stylesGlobal.rowStart}>
                    <Text
                      style={[
                        stylesGlobal.colorBlackLight,
                        styles.marginBottom10,
                        stylesGlobal.rowStart,
                      ]}
                    >
                      Type ID
                    </Text>
                  </View>
                  <View style={[stylesGlobal.row100, styles.containerDropDown]}>
                    {Platform.OS === 'ios' ? (
                      <IOSPicker
                        mode="modal"
                        textStyle={styles.textPicker}
                        style={styles.dropdownIosGuest}
                        selectedValue={
                          this.state.Guests.IdentityType ? (
                            'PASSPORT'
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose Type ID
                            </Text>
                          )
                        }
                        onValueChange={itemValue => {
                          this.setState({
                            Guests: {
                              ...this.state.Guests,
                              IdentityType: itemValue,
                            },
                          });
                        }}
                      >
                        <Picker.Item
                          label="Choose Type ID"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        <Picker.Item
                          label="Passport"
                          value="PASSPORT"
                          style={styles.textPicker}
                        />
                      </IOSPicker>
                    ) : (
                      <Picker
                        mode="dialog"
                        textStyle={styles.textPicker}
                        style={styles.containerDropDownAndroid}
                        selectedValue={
                          this.state.Guests.IdentityType ? (
                            'PASSPORT'
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose Type ID
                            </Text>
                          )
                        }
                        onValueChange={itemValue => {
                          this.setState({
                            Guests: {
                              ...this.state.Guests,
                              IdentityType: itemValue,
                            },
                          });
                        }}
                      >
                        <Picker.Item
                          label="Choose Type ID"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        <Picker.Item
                          label="Passport"
                          value="PASSPORT"
                          style={styles.textPicker}
                        />
                      </Picker>
                    )}
                  </View>
                  <TextWarning
                    show={true}
                    textwarning={this.state.errorIdentityType}
                  />

                  <RoundedTextInput
                    marginBottom={20}
                    label="ID Number"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter ID Number"
                    value={this.state.Guests.IdentityNbr}
                    onChangeText={text => {
                      text = text == '' ? null : text;
                      this.setState({
                        Guests: {
                          ...this.state.Guests,
                          IdentityNbr: text,
                        },
                      });
                    }}
                    error={this.state.errorIdentityNbr}
                  />

                  <View style={stylesGlobal.rowStart}>
                    <Text
                      style={[
                        stylesGlobal.colorBlackLight,
                        styles.marginBottom10,
                        stylesGlobal.rowStart,
                      ]}
                    >
                      Title
                    </Text>
                  </View>
                  <View style={[stylesGlobal.row100, styles.containerDropDown]}>
                    {Platform.OS === 'ios' ? (
                      <IOSPicker
                        mode="modal"
                        textStyle={styles.textPicker}
                        style={styles.dropdownIosGuest}
                        selectedValue={
                          this.state.Guests.GuestTitle ? (
                            this.state.LabelGuestTitle == 0 ? (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2,
                                ]}
                              >
                                Choose Guest Title
                              </Text>
                            ) : (
                              this.props.guestTitle[
                                this.state.LabelGuestTitle - 1
                              ].Name
                            )
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose Guest Title
                            </Text>
                          )
                        }
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({
                            Guests: {
                              ...this.state.Guests,
                              GuestTitle: itemValue,
                            },
                            LabelGuestTitle: itemIndex,
                          });
                        }}
                      >
                        <Picker.Item
                          label="Choose Guest Title"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        {this.props.guestTitle
                          ? this.props.guestTitle.map((guest, i) => {
                              return (
                                <Picker.Item
                                  label={guest.Description}
                                  value={guest.Name}
                                  key={i}
                                />
                              );
                            })
                          : null}
                      </IOSPicker>
                    ) : (
                      <Picker
                        mode="dialog"
                        textStyle={styles.textPicker}
                        style={styles.containerDropDownAndroid}
                        selectedValue={
                          this.state.Guests.GuestTitle ? (
                            this.state.Guests.GuestTitle
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose Guest Title
                            </Text>
                          )
                        }
                        onValueChange={itemValue => {
                          this.setState({
                            Guests: {
                              ...this.state.Guests,
                              GuestTitle: itemValue,
                            },
                          });
                        }}
                      >
                        <Picker.Item
                          label="Choose Guest Title"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        {this.props.guestTitle
                          ? this.props.guestTitle.map((guest, i) => {
                              return (
                                <Picker.Item
                                  label={guest.Description}
                                  value={guest.Name}
                                  key={i}
                                />
                              );
                            })
                          : null}
                      </Picker>
                    )}
                  </View>
                  <TextWarning
                    show={true}
                    textwarning={this.state.errorGuestTitle}
                  />

                  <RoundedTextInput
                    marginBottom={20}
                    label="First Name"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter First Name"
                    value={this.state.Guests.FirstName}
                    onChangeText={text => {
                      text = text == '' ? null : text;
                      this.setState({
                        Guests: {
                          ...this.state.Guests,
                          FirstName: text,
                        },
                      });
                    }}
                    error={this.state.errorFirstName}
                  />

                  <RoundedTextInput
                    marginBottom={20}
                    label="Last Name"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Last Name"
                    value={this.state.Guests.LastName}
                    onChangeText={text => {
                      text = text == '' ? null : text;
                      this.setState({
                        Guests: {
                          ...this.state.Guests,
                          LastName: text,
                        },
                      });
                    }}
                    error={this.state.errorLastName}
                  />
                  <TouchableOpacity onPress={this.handleCountry}>
                    <RoundedTextInputWithButton
                      label="Nationality"
                      textColor="black"
                      containerWidth="100%"
                      containerHeight={50}
                      animated="hidden"
                      placeholder="Choose Nationality"
                      value={this.state.Guests.Country.Name}
                      disable={true}
                      error={this.state.errorCountry}
                      buttonPosition="right"
                      onPress={this.handleCountry}
                    />
                  </TouchableOpacity>
                </View>
              </Container>
            </ScrollView>
          )}
        </KeyboardAvoid>

        <TouchableOpacity
          style={[styles.footer, styles.topRadius]}
          onPress={() => this.handleResult(this.state.Guests)}
        >
          <LinearGradient
            colors={['#e6ca6b', '#ffd734']}
            style={[styles.footer, styles.topRadius]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="NEXT"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={() => this.handleResult(this.state.Guests)}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.generalReducer.countries,
  guestTitle: state.generalReducer.guestTitle,
});

export default connect(mapStateToProps)(guestDetail);
