import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Picker,
  Platform,
  TouchableOpacity,
  Alert,
  BackHandler,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import { Container } from '../../components/container';
import { SeperatorNew } from '../../components/list/index';
import { isEmailValid } from '../../helper/helper';
import { NormalButton } from '../../components/button';
import { TextWarning } from '../../components/text';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTotalCurrencies,
  postSimpleRegister,
  resetSimpleRegister,
} from '../../actions/General/generalAction';
import { Loading } from '../../components/loading';
import stylesGlobal from '../../components/styles';
import {
  RoundedTextInput,
  RoundedTextInputWithButton,
} from '../../components/textInput';
import { Card } from '../../components/card';

class registerCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Register: {
        CompanyName: '',
        CompanyAddress: '',
        CompanyPhone: '',
        Country: { Name: null },
        CurrencyId: '',
        FirstName: '',
        LastName: '',
        UserPhone: '',
        Email: '',
      },
      labelCurrencyId: 0,
      errorCompanyName: '',
      errorCompanyTelephone: '',
      errorAddress: '',
      errorCountry: '',
      errorCurrencyId: '',
      errorFirstname: '',
      errorLastname: '',
      errorTelephone: '',
      errorEmail: '',
      loading: false,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    validate: PropTypes.func,
    currencies: PropTypes.array,
    isDataRegister: PropTypes.string,
    DataRegister: PropTypes.object,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.props.getTotalCurrencies();
  }

  validate = () => {
    const {
      CompanyName,
      CompanyPhone,
      CompanyAddress,
      Country,
      CurrencyId,
      FirstName,
      LastName,
      UserPhone,
      Email,
    } = this.state.Register;
    let isError = false;
    const REQUIRED = 'This field is required';
    const errors = {
      errorCompanyName: '',
      errorCompanyTelephone: '',
      errorAddress: '',
      errorCountry: '',
      errorCurrencyId: '',
      errorFirstname: '',
      errorLastname: '',
      errorTelephone: '',
      errorEmail: '',
    };

    if (CompanyName.length < 1) {
      isError = true;
      errors.errorCompanyName = REQUIRED;
    }
    if (CompanyPhone.length < 1) {
      isError = true;
      errors.errorCompanyTelephone = REQUIRED;
    }
    if (Country.Name.length < 1) {
      isError = true;
      errors.errorAddress = REQUIRED;
    }
    if (CompanyAddress.length < 1) {
      isError = true;
      errors.errorAddress = REQUIRED;
    }
    if (Email.length < 1) {
      isError = true;
      errors.errorEmail = REQUIRED;
    } else {
      if (isEmailValid(Email)) {
        isError = true;
        errors.errorEmail = 'Format email not valid';
      }
    }
    if (FirstName.length < 1) {
      isError = true;
      errors.errorFirstname = 'Required';
    }
    if (LastName.length < 1) {
      isError = true;
      errors.errorLastname = 'Required';
    }
    if (UserPhone.length < 1) {
      isError = true;
      errors.errorTelephone = REQUIRED;
    }
    if (CurrencyId == null) {
      isError = true;
      errors.errorCurrencyId = 'Required';
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  nextRegister = () => {
    const error = this.validate();
    if (!error) {
      this.setState({ loading: true });
      this.props.postSimpleRegister(this.state.Register);
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isDataRegister === 'success') {
      this.setState({ loading: false });
      Alert.alert('Success', 'Success register customer', [{ text: 'OK' }]);
      this.props.resetSimpleRegister();
      this.props.navigation.pop();
      this.props.route.params.onSelectData(nextProps.DataRegister);
      return false;
    } else if (nextProps.isDataRegister === 'failed') {
      this.setState({ loading: false });
      Alert.alert('Failed', 'Please check again', [{ text: 'OK' }]);
      this.props.resetSimpleRegister();
      return false;
    } else return true;
  }

  onSelectCountry = data => {
    this.setState({
      Register: {
        ...this.state.Register,
        Country: data,
      },
    });
  };

  handleCountry = () => {
    this.props.navigation.navigate('ListCountry', {
      onSelect: this.onSelectCountry,
    });
  };

  render() {
    let seperator = new Array(28).fill(0);
    return (
      <SafeAreaView style={stylesGlobal.styleSafeArea}>
        <Container>
          {this.state.loading ? (
            <Loading sizeloading="large" colorloading={styles.$goldcolor} />
          ) : null}
          <View>
            <StatusBar translucent={false} barStyle="light-content" />
          </View>
          <ScrollView style={styles.containerScroll}>
            <Container>
              <Card type="Flat" widthCard="90%">
                <Text
                  style={[
                    styles.paddingAllMinusLeft,
                    stylesGlobal.text20,
                    stylesGlobal.textBold,
                    stylesGlobal.paddingTop20,
                    stylesGlobal.textAlignLeft,
                  ]}
                >
                  Company Data
                </Text>
                <View style={stylesGlobal.rowNoPadding}>
                  {seperator.map(i => {
                    {
                      return (
                        <SeperatorNew
                          key={i}
                          colorSepar="#ccc"
                          widthsepar="3%"
                        />
                      );
                    }
                  })}
                </View>

                <View style={stylesGlobal.padding20}>
                  <RoundedTextInput
                    marginBottom={20}
                    label="Company Name"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Company Name"
                    value={this.state.Register.CompanyName}
                    onChangeText={text =>
                      this.setState({
                        Register: { ...this.state.Register, CompanyName: text },
                      })
                    }
                    error={this.state.errorCompanyName}
                  />

                  <RoundedTextInput
                    marginBottom={20}
                    label="Company Telephone"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Company Telephone"
                    value={this.state.Register.CompanyPhone}
                    onChangeText={text =>
                      this.setState({
                        Register: {
                          ...this.state.Register,
                          CompanyPhone: text,
                        },
                      })
                    }
                    error={this.state.errorCompanyTelephone}
                  />

                  <RoundedTextInput
                    marginBottom={20}
                    label="Company Address"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Company Address"
                    value={this.state.Register.CompanyAddress}
                    onChangeText={text =>
                      this.setState({
                        Register: {
                          ...this.state.Register,
                          CompanyAddress: text,
                        },
                      })
                    }
                    error={this.state.errorAddress}
                  />
                  <TouchableOpacity
                    style={stylesGlobal.marginBottom20}
                    onPress={this.handleCountry}
                  >
                    <RoundedTextInputWithButton
                      label="Country"
                      textColor="black"
                      containerWidth="100%"
                      containerHeight={50}
                      animated="hidden"
                      placeholder="Choose Country"
                      value={this.state.Register.Country.Name}
                      disable={false}
                      error={this.state.errorCountry}
                      buttonPosition="right"
                      onPress={this.handleCountry}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textTourType}>Based Currency</Text>
                  <View style={[stylesGlobal.row100, styles.containerDropDown]}>
                    {Platform.OS === 'ios' ? (
                      <IOSPicker
                        mode="modal"
                        textStyle={styles.textPicker}
                        style={styles.dropdownIos}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({
                            Register: {
                              ...this.state.Register,
                              CurrencyId: itemValue,
                            },
                            labelCurrencyId: itemIndex,
                          })
                        }
                        selectedValue={
                          this.state.Register.CurrencyId ? (
                            this.state.labelCurrencyId == 0 ? (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2,
                                ]}
                              >
                                Choose Based Currency
                              </Text>
                            ) : (
                              this.props.currencies[
                                this.state.labelCurrencyId - 1
                              ].Description
                            )
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose Based Currency
                            </Text>
                          )
                        }
                      >
                        <Picker.Item
                          label="Based Currency"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        {this.props.currencies
                          ? this.props.currencies.map((currency, i) => {
                              return (
                                <Picker.Item
                                  label={currency.Description}
                                  value={currency.Id}
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
                        selectedValue={this.state.Register.CurrencyId}
                        onValueChange={itemValue =>
                          this.setState({
                            Register: {
                              ...this.state.Register,
                              CurrencyId: itemValue,
                            },
                          })
                        }
                      >
                        <Picker.Item
                          label="Based Currency"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        {this.props.currencies
                          ? this.props.currencies.map((currency, i) => {
                              return (
                                <Picker.Item
                                  label={currency.Description}
                                  value={currency.Id}
                                  key={i}
                                />
                              );
                            })
                          : null}
                      </Picker>
                    )}
                  </View>
                  <View
                    style={[styles.colNoPaddingLeft, styles.marginBottom20]}
                  >
                    <TextWarning
                      show={true}
                      textwarning={this.state.errorCurrencyId}
                    />
                  </View>
                </View>
              </Card>
              <Card type="Flat" widthCard="90%">
                <Text
                  style={[
                    styles.paddingAllMinusLeft,
                    stylesGlobal.text20,
                    stylesGlobal.textBold,
                    stylesGlobal.paddingTop20,
                    stylesGlobal.textAlignLeft,
                  ]}
                >
                  User Data
                </Text>
                <View style={stylesGlobal.rowNoPadding}>
                  {seperator.map(i => {
                    {
                      return (
                        <SeperatorNew
                          key={i}
                          colorSepar="#ccc"
                          widthsepar="3%"
                        />
                      );
                    }
                  })}
                </View>

                <View style={stylesGlobal.padding20}>
                  <RoundedTextInput
                    marginBottom={20}
                    label="First Name"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter First Name"
                    value={this.state.Register.FirstName}
                    onChangeText={text =>
                      this.setState({
                        Register: { ...this.state.Register, FirstName: text },
                      })
                    }
                    error={this.state.errorFirstname}
                  />
                  <RoundedTextInput
                    marginBottom={20}
                    label="Last Name"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Last Name"
                    value={this.state.Register.LastName}
                    onChangeText={text =>
                      this.setState({
                        Register: { ...this.state.Register, LastName: text },
                      })
                    }
                    error={this.state.errorLastname}
                  />
                  <RoundedTextInput
                    marginBottom={20}
                    label="Telephone"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Telephone"
                    value={this.state.Register.UserPhone}
                    onChangeText={text =>
                      this.setState({
                        Register: { ...this.state.Register, UserPhone: text },
                      })
                    }
                    error={this.state.errorTelephone}
                  />
                  <RoundedTextInput
                    marginBottom={20}
                    label="Email"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Email"
                    value={this.state.Register.Email}
                    onChangeText={text =>
                      this.setState({
                        Register: { ...this.state.Register, Email: text },
                      })
                    }
                    error={this.state.errorEmail}
                  />
                </View>
              </Card>
            </Container>
          </ScrollView>
          <TouchableOpacity
            style={[styles.footer, styles.bottom0]}
            onPress={this.nextRegister}
          >
            <LinearGradient
              colors={['#e6ca6b', '#ffd734']}
              style={[styles.footer, styles.bottom0]}
              start={[0, 0]}
              end={[1, 0]}
            >
              <NormalButton
                textSize={17}
                text="NEXT"
                buttonWidth="100%"
                textColor="#252525"
                buttonColor="transparent"
                onPress={this.nextRegister}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.generalReducer.getTotalCurrencies,
  isDataRegister: state.generalReducer.postSimpleRegisterStatus,
  DataRegister: state.generalReducer.postSimpleRegister,
});

export default connect(mapStateToProps, {
  getTotalCurrencies,
  postSimpleRegister,
  resetSimpleRegister,
})(registerCustomer);
