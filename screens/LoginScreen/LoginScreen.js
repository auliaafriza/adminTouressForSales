import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ImageBackground,
  View,
  Image,
  Alert,
  ScrollView,
  Linking,
  StatusBar,
  AsyncStorage
} from "react-native";
import VersionCheck from "react-native-version-check";
import { Container } from "../../components/container";
import { NormalButton, ClearButton } from "../../components/button";
import {
  RoundedTextInput,
  FloatingLabelInputPass
} from "../../components/textInput";
// import { login_start, reset_status_login } from "../../actions/userAuthAction";
import { Loading } from "../../components/loading";
import { KeyboardAvoid } from "../../components/keyboard";
import {
  exitAlert,
  handleAndroidBackButton
} from "./../Common/backHandlerAndroid";
import styles from "./styles";
import stylesGlobal from "../../components/styles";
import { Updates } from "expo";
import IMG_BG from "./../../assets/images/sign-in-bg.png";
import IMG_ICON from "./../../assets/images/touress-logo-white.png";
import { TextWarning } from "../../components/text";
import {
  postLogin,
  resetLoginStatus
} from "../../actions/UserAuth/userAuthAction";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login: {
        CompanyCode: "30000",
        Username: "admin",
        Password: "123456789Aa~"
      },
      errorCompanyCode: "",
      errorUsername: "",
      errorPassword: ""
      // loading: false
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    handlePressHome: PropTypes.object,
    isLogin: PropTypes.string,
    messages: PropTypes.string,
    validate: PropTypes.func,
    dataLogin: PropTypes.object
  };

  componentDidMount() {
    handleAndroidBackButton(exitAlert);
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        this.showUpdateVersion();
      }
    });
    this.cekUpdateVersion();
  }

  cekUpdateVersion = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "New version available",
          "Please, update app to new version",
          [
            {
              text: "Ok"
            }
          ]
        );
        // ... notify user of update ...
        Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  };

  validate = () => {
    const { CompanyCode, Username, Password } = this.state.Login;
    let isError = false;
    const REQUIRED = "This field is required";
    const errors = {
      errorCompanyCode: "",
      errorUsername: "",
      errorPassword: ""
    };

    if (CompanyCode.length < 1) {
      isError = true;
      errors.errorCompanyCode = REQUIRED;
    }
    if (Username.length < 1) {
      isError = true;
      errors.errorUsername = REQUIRED;
    }
    if (Password.length < 1) {
      isError = true;
      errors.errorPassword = REQUIRED;
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };

  login = () => {
    const error = this.validate();

    if (!error) {
      // this.setState({ loading: true });
      // const { Login } = this.state;
      let auth = {
        CompanyCode: "30000",
        Username: "admin",
        Password: "123456789Aa~"
      };
      this.props.postLogin(auth);
      // this.props.dispatch(
      //   login_start(
      //     this.state.Login.CompanyCode,
      //     this.state.Login.Username,
      //     this.state.Login.Password
      //   )
      // );
    }
  };

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.isLogin !== this.props.isLogin) {
  //     if (nextProps.isLogin) {
  //       this.setState({ loading: false });
  //       this.handlePressHome();
  //       this.props.resetLoginStatus();
  //       return false;
  //     } else if (!nextProps.isLogin) {
  //       Alert.alert("Failed", nextProps.messages, [{ text: "OK" }]);
  //       this.setState({ loading: false });
  //       this.props.resetLoginStatus();
  //       return false;
  //     }
  //   } else return true;
  // }

  test = async () => {
    const { token, expiredToken } = this.props;
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("expiredToken", expiredToken);
  };
  componentDidUpdate() {
    if (this.props.loginStatus) {
      this.test();
      this.handlePressHome();
      this.props.resetLoginStatus();
    } else if (this.props.loginStatus !== null) {
      Alert.alert("Failed", this.props.messages, [{ text: "OK" }]);
      this.props.resetLoginStatus();
    }

    // if (this.props.loginStatus) {
    //   this.setState({ loading: false });
    //   this.handlePressHome();
    //   this.props.resetLoginStatus();
    // }
    // if (this.props.loginStatus) {
    //   Alert.alert("Failed", this.props.messages, [{ text: "OK" }]);
    //   this.setState({ loading: false });
    //   this.props.resetLoginStatus();
    // }
  }

  showUpdateVersion = () => {
    Alert.alert("New version available", "Please, update app to new version", [
      {
        text: "Update",
        onPress: () => this.updateVersion()
      },
      { text: "Cancel" }
    ]);
  };

  updateVersion = async () => {
    Linking.openURL(await VersionCheck.getStoreUrl());
  };

  handlePressRegister = () => {
    this.props.navigation.navigate("RegisterAgent");
  };

  handlePressForgot = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  handlePressHome = () => {
    // const userToken = AsyncStorage.getItem("token");
    // Alert.alert("Masuk localstor", userToken, [{ text: "OK" }]);
    this.props.navigation.navigate("Home");

    // Alert.alert("Masuk Home", "Homeypad", [
    //   {
    //     text: "Update"
    //     // onPress: () => this.updateVersion()
    //   },
    //   { text: "Cancel" }
    // ]);
  };

  render() {
    const { loading } = this.props;
    return (
      <Container>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        {loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}
        <ImageBackground
          source={IMG_BG}
          resizeMode="cover"
          style={styles.imageBG}
        >
          <KeyboardAvoid>
            {() => (
              <ScrollView>
                <View style={[stylesGlobal.width100, stylesGlobal.center]}>
                  <View style={styles.containerImageLogo}>
                    <Image
                      source={IMG_ICON}
                      resizeMode="contain"
                      style={styles.imgLogo}
                    />
                  </View>
                  <View style={stylesGlobal.width90}>
                    <View style={stylesGlobal.padding20}>
                      <RoundedTextInput
                        marginBottom={10}
                        label="ID Company"
                        textColor="black"
                        containerWidth="100%"
                        containerHeight={45}
                        animated="hidden"
                        placeholder="Enter Company ID"
                        value={this.state.Login.CompanyCode}
                        onChangeText={text =>
                          this.setState({
                            Login: { ...this.state.Login, CompanyCode: text }
                          })
                        }
                        keyboardType="numeric"
                        error={this.state.errorCompanyCode}
                        required={true}
                      />
                      <RoundedTextInput
                        label="Username"
                        textColor="black"
                        containerWidth="100%"
                        containerHeight={45}
                        animated="hidden"
                        placeholder="Enter Username"
                        marginBottom={10}
                        value={this.state.Login.Username}
                        onChangeText={text =>
                          this.setState({
                            Login: { ...this.state.Login, Username: text }
                          })
                        }
                        error={this.state.errorUsername}
                        required={true}
                      />

                      <View style={stylesGlobal.width100}>
                        <View
                          style={{
                            position: "absolute",
                            right: 0,
                            zIndex: 99
                          }}
                        >
                          <TextWarning
                            show={true}
                            textwarning={this.state.errorPassword}
                          />
                        </View>

                        <FloatingLabelInputPass
                          label="Password"
                          textColor="black"
                          containerWidth="100%"
                          containerHeight={45}
                          placeholder="Enter Password"
                          value={this.state.Login.Password}
                          onChangeText={text =>
                            this.setState({
                              Login: { ...this.state.Login, Password: text }
                            })
                          }
                          required={true}
                        />
                      </View>
                      <View
                        style={[
                          stylesGlobal.row100,
                          stylesGlobal.justifyContentCenter
                        ]}
                      >
                        <NormalButton
                          text="LOG IN"
                          buttonWidth="40%"
                          bold
                          buttonHeight={45}
                          buttonColor={styles.$goldcolor}
                          textColor="white"
                          onPress={this.login}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
          </KeyboardAvoid>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.authReducer.loginStatus,
  messages: state.authReducer.descriptionLogin,
  loading: state.authReducer.loading,
  expiredToken: state.authReducer.expiredToken,
  token: state.authReducer.token
});
export default connect(mapStateToProps, {
  postLogin,
  resetLoginStatus
})(login);
