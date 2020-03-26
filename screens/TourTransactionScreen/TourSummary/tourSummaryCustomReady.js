import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  BackHandler,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Picker,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container } from '../../../components/container/index';
import { NormalButton } from '../../../components/button/index';
import { RoundedTextInput } from '../../../components/textInput';
import { SeperatorRepeat } from '../../../components/list/index';
import { Card, CardMediaNew } from ',,/../../components/card';
import { CheckBox } from 'react-native-elements';
import styles from './styles';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { copyObject } from '../../../helper/dailyProgram';
import {
  postCreateCustomOnBeHalfAction,
  resetPostCreateCustomAction,
  postEditQuotationAction,
  getTourSummaryByIdAction,
  resetPostQuotationAction,
  setSpecialAdjusmentAction,
  resetTransactionAction,
  sendEmailConfirmation,
} from '../../../actions/Transactions/TransactionAction';
// import { get_history_created_booking } from '../../actions/historyAction';
// import {
//   post_create_custom,
//   post_create_custom_onbehalf,
//   reset_post_create_custom,
//   post_edit_quotation,
//   reset_additional_service,
// } from '../../actions/transactionAction';
import { isSales } from '../../../helper/checkingHelper';
import { convertRoundPrice } from '../../../helper/helper';
// import {
//   reset_qoutation,
//   get_my_qoutation,
// } from '../../actions/myQoutationAction';
import stylesGlobal from '../../../components/styles';
import imageicon from '../../../assets/Icon/user.png';
import IconAdd from '../../../assets/Icon/add.png';
import IconClose from '../../../assets/Icon/close.png';
import PicSuccess from '../../../assets/images/layer_660.png';
// import { findAdditionalService } from '../../helper/additionalService';
import { ModalBottom } from '../../../components/modal';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import AutoHeightWebView from 'react-native-autoheight-webview';
import CardOrderedItem from './components/orderedItem';
// import SegmentGuestList from './components/segmentGuestList';
import {
  generateOrderedItem,
  // generateGuestList,
} from '../../../helper/transactionHelper';
import SegmentTourNote from './components/segmentTourNote';
import dummayDemo from './components/orderedItemDetail/demoPrice';
import SegmentSpecialAdjusment from './components/segmentSpecialAdjusment';
import { Loading } from '../../../components/loading';
import IOSPicker from 'react-native-ios-picker';
import { TextWarning } from '../../../components/text';

class summaryCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Company: { Name: '', Code: null, Id: '' },
      // ItemTransaction: this.props.ItemTransaction,
      ItemTransaction: dummayDemo,
      DemoPrice: this.props.ItemTransaction,
      TourNote: '',
      isNote: false,
      loading: false,
      CompanyBeHalf: '',
      errorCompanyBeHalf: '',
      idBook: '',
      modalVisible: false,
      modalNoteVisible: false,
      modalQuotationSaved: false,
      isQuotationSave: false,
      specialAdjusment: this.props.specialAdjusment
        ? this.props.specialAdjusment
        : [],
      modalSendEmailConfirmation: false,
      isSendEmailConfirmation: null,
      LabelSendEmail: null,
      errorSendEmail: '',
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    ItemTransaction: PropTypes.object,
    DemoPrice: PropTypes.object,
    companyProfile: PropTypes.string,
    userRole: PropTypes.object,
    isCreateTour: PropTypes.string,
    isQuotationPost: PropTypes.string,
    dataUserIdCompany: PropTypes.array,
    DetailCustom: PropTypes.object,
    CreateTour: PropTypes.object,
    CreateTourError: PropTypes.string,
    additionalService: PropTypes.array,
  };

  componentDidMount() {
    // if (this.props.DetailCustom.Status == 'edit') {
    //   this.setState({
    //     Company: this.props.DetailCustom.Company,
    //   });
    // }
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    const id = this.props.route.params.id;
    const type = this.props.route.params.type
      ? this.props.route.params.type
      : '';
    if (type === 'myBooking') {
      this.props.getTourSummaryByIdAction(id);
    } else {
      this.props.setSpecialAdjusmentAction(dummayDemo.AdditionalItems);
    }
  }

  handleGuest = () => {
    this.props.navigation.navigate('Guest', { screen: 'GuestList' });
  };

  handleOpenNoteModal = () => {
    this.setState({ modalNoteVisible: true });
  };

  handleSaveNote = () => {
    this.state.TourNote != ''
      ? this.setState({ isNote: true })
      : this.setState({ isNote: false });

    this.setState({ modalNoteVisible: false });
  };

  handleCreate = () => {
    const error = this.validate();
    if (!error) {
      this.setState({ loading: true, modalSendEmailConfirmation: false });
      let item = copyObject(this.state.ItemTransaction);
      item.TourNote = this.state.TourNote;

      if (this.state.Company.Code == null) {
        this.setState({ loading: false });
        Alert.alert('Failed', 'Please select company', [{ text: 'OK' }]);
      } else {
        this.setState({ loading: false });
        item.CompanyCode = this.state.Company.Code;
        item.UserProfileId = this.state.Company.Id;
        this.props.postCreateCustomOnBeHalfAction(item);
      }
    }
  };

  handleQuotation = () => {
    this.setState({ loading: true });
    let item = copyObject(this.state.ItemTransaction);
    item.TourNote = this.state.TourNote;
    if (this.props.DetailCustom.Status != 'edit') {
      if (this.state.Company.Code == null) {
        this.setState({ loading: false });
        Alert.alert('Failed', 'Please select company', [{ text: 'OK' }]);
      } else {
        let item = copyObject(this.state.ItemTransaction);
        item.IsQuotation = true;
        item.CompanyCode = this.state.Company.Code;
        this.props.postCreateCustomOnBeHalfAction(item);
        this.setState({ isQuotationSave: true });
      }
    } else {
      item.TourTransactionId = this.props.DetailCustom.IdTour;
      if (this.state.Company.Code == null) {
        this.setState({ loading: false });
        Alert.alert('Failed', 'Please select company', [{ text: 'OK' }]);
      } else {
        item.CompanyCode = this.state.Company.Code;
        this.props.postEditQuotationAction(item);
        this.setState({ isQuotationSave: true });
      }
    }
  };

  handleAcceptQuotation = () => {
    this.setState({ loading: true });
    let item = copyObject(this.state.ItemTransaction);
    item.TourNote = this.state.TourNote;
    item.AcceptQuotationAtOnce = true;
    item.TourTransactionId = this.props.DetailCustom.IdTour;
    if (this.state.Company.Code == null) {
      this.setState({ loading: false });
      Alert.alert('Failed', 'Please select company', [{ text: 'OK' }]);
    } else {
      item.CompanyCode = this.state.Company.Code;
      this.props.postEditQuotationAction(item);
    }
  };

  validate = () => {
    const { isSendEmailConfirmation } = this.state;
    let isError = false;
    const errors = {
      errorSendEmail: '',
    };

    if (isSendEmailConfirmation == null) {
      isError = true;
      errors.errorSendEmail = 'Please select send email notification';
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.packageByIdStatus) {
  //     // this.props.setSpecialAdjusmentAction(this.props.specialAdjusment);
  //     this.props.resetTransactionAction();
  //     return false;
  //   } else if (this.props.packageByIdStatus !== null) {
  //     // Alert.alert('Failed', this.props.messages, [{ text: 'OK' }]);
  //     this.props.resetTransactionAction();
  //     return false;
  //   }

  //   if (nextProps.isCreateTour === 'success') {
  //     this.setState({ loading: false });
  //     this.props.resetPostCreateCustomAction();
  //     //   this.props.dispatch(reset_additional_service());
  //     //   this.props.dispatch(get_history_created_booking());
  //     let iD = nextProps.CreateTour
  //       ? nextProps.CreateTour.BookingDetailSum.Id
  //       : '';
  //     this.state.isQuotationSave
  //       ? this.setState({ modalQuotationSaved: true })
  //       : this.openModal(iD);
  //     return false;
  //   } else if (nextProps.isCreateTour === 'failed') {
  //     this.setState({ loading: false });
  //     Alert.alert('Failed', nextProps.CreateTourError, [{ text: 'OK' }]);
  //     this.props.resetPostCreateCustomAction();
  //     return false;
  //   }

  //   if (nextProps.isQuotationPost === 'success') {
  //     this.setState({ loading: false });
  //     this.setState({ modalQuotationSaved: true });
  //     //   this.props.dispatch(reset_qoutation());
  //     //   this.props.dispatch(reset_additional_service());
  //     //   this.props.dispatch(get_my_qoutation());
  //     this.props.navigation.navigate('ListMyQoutation');
  //     return false;
  //   } else if (nextProps.isQuotationPost === 'failed') {
  //     this.setState({ loading: false });
  //     Alert.alert('Failed', 'Please check again', [{ text: 'OK' }]);
  //     //   this.props.dispatch(reset_qoutation());
  //     return false;
  //   } else return true;
  // }

  componentDidUpdate() {
    if (this.props.packageByIdStatus) {
      this.props.resetTransactionAction();
      // this.props.dispatch(reset_additional_service());
      let iD = this.props.CreateTour
        ? this.props.CreateTour.BookingDetailSum.Id
        : '';
      this.handleSendEmailAfterCreateBooking(iD);
      return false;
    } else if (this.props.packageByIdStatus !== null) {
      this.setState({ loading: false });
      // this.props.CreateTourError
      Alert.alert('Failed', 'Please try Again', [{ text: 'OK' }]);
      this.props.resetTransactionAction();
      return false;
    } else return true;
  }

  handleSendEmailAfterCreateBooking = IdBook => {
    const data = {
      Id: IdBook,
      emailSendConfirmed: this.state.isSendEmailConfirmation,
    };
    this.props.sendEmailConfirmation(data);
  };

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.isSendEmailConfirmation === 'success') {
  //     this.setState({ loading: false });
  //     this.props.dispatch(reset_send_email_confirmation());
  //     this.props.dispatch(get_history_created_booking());
  //     let iD = this.props.CreateTour
  //       ? this.props.CreateTour.BookingDetailSum.Id
  //       : '';
  //     this.state.isQuotationSave
  //       ? this.setState({ modalQuotationSaved: true })
  //       : this.openModal(iD);
  //     return false;
  //   } else if (nextProps.isSendEmailConfirmation === 'failed') {
  //     this.setState({ loading: false });
  //     Alert.alert('Failed', nextProps.sendEmailConfirmation, [{ text: 'OK' }]);
  //     this.props.dispatch(reset_send_email_confirmation());
  //     return false;
  //   }

  //   if (nextProps.isQuotationPost === 'success') {
  //     this.setState({ loading: false });
  //     this.setState({ modalQuotationSaved: true });
  //     this.props.dispatch(reset_qoutation());
  //     this.props.dispatch(reset_additional_service());
  //     this.props.dispatch(get_my_qoutation());
  //     this.props.navigation.navigate('ListMyQoutation');
  //     return false;
  //   } else if (nextProps.isQuotationPost === 'failed') {
  //     this.setState({ loading: false });
  //     Alert.alert('Failed', 'Please check again', [{ text: 'OK' }]);
  //     this.props.dispatch(reset_qoutation());
  //     return false;
  //   } else return true;
  // }

  openModal = id => {
    this.setState({ modalVisible: true, idBook: id });
  };

  handleCompany = async () => {
    this.props.navigation.navigate('masterData', {
      screen: 'ListCustomer',
      params: {
        onSelect: await this.onSelectCustomer,
      },
    });

    // this.props.navigation.navigate('General', {
    //   screen: 'ListCustomer',
    //   params: {
    //     onSelect: await this.onSelectCustomer,
    //   },
    // });
  };

  handleOpenNoteModal = () => {
    this.setState({ modalNoteVisible: true });
  };

  handleSaveNote = () => {
    this.state.TourNote != ''
      ? this.setState({ isNote: true })
      : this.setState({ isNote: false });

    this.setState({ modalNoteVisible: false });
  };

  handleMyBooking = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('CreatedBooking');
  };

  handleMyQuotation = () => {
    this.setState({ modalQuotationSaved: false });
    this.props.navigation.navigate('ListMyQoutation');
  };

  onSelectCustomer = async data => {
    await this.setState({
      Company: data,
    });
  };

  handlePressItinerary = (data, index, PackageType) => {
    this.props.navigation.navigate('TourSummary', {
      screen: 'TourScheduleSummary',
      params: {
        data: data,
        type: 'custom',
        Id: index,
        PackageType: PackageType,
      },
    });
  };

  handlePressOrderedItem = (typeOrdered, PackageType) => {
    this.props.navigation.navigate('DetailOrderedItem', {
      PackageType: PackageType,
      TypeOrdered: typeOrdered.toLowerCase(),
      //   data: this.props.DemoPrice
      data: dummayDemo,
    });
  };

  handlePressSpecialAdjusmentDetail = async () => {
    this.props.navigation.navigate('Summary', {
      screen: 'SpecialAdjusmentDetail',
      params: {
        data: this.state.specialAdjusment,
        onUpdate: await this.handleSetSpecialAdjusment,
      },
    });
  };

  handleSetSpecialAdjusment = async specialAdjusment => {
    await this.setState({
      specialAdjusment,
    });
  };

  closeModal = () => {
    this.setState({ modalSendEmailConfirmation: false });
  };

  handleCheckSendEmail = () => {
    this.setState({
      isSendEmailConfirmation: !this.state.isSendEmailConfirmation,
    });
  };

  openModalSendEmail = () => {
    this.setState({ modalSendEmailConfirmation: true });
  };

  render() {
    // const Data = this.props.DemoPrice ? this.props.DemoPrice : "";
    const Data =
      this.props.route.params.type === 'myBooking'
        ? this.props.packageByIdStatus
          ? this.props.packageById
          : dummayDemo
        : dummayDemo;
    const modalNoteHeight = Dimensions.get('window').height * 0.7;
    const generateOrderItemData = generateOrderedItem(Data.DailyPrograms);
    const type = this.props.route.params.type;
    // const generateGuestData = generateGuestList(Data.TourGuestSum);
    return (
      <Container>
        <ModalBottom height="50%" visible={this.state.loading} isCenter={true}>
          <Text style={stylesGlobal.text18}>Booking your package</Text>
          <AnimatedEllipsis style={stylesGlobal.text24} />
        </ModalBottom>
        <ModalBottom
          height="80%"
          visible={this.state.modalVisible}
          isCenter={true}
        >
          <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
            Booking Success
          </Text>
          <View style={styles.containerImageModal}>
            <Image
              source={PicSuccess}
              style={stylesGlobal.imageIcon}
              resizeMode="contain"
            />
          </View>
          <Text
            style={[
              stylesGlobal.textAlignCenter,
              stylesGlobal.paddingBottom20,
              stylesGlobal.paddingLeft10,
              stylesGlobal.paddingRight10,
            ]}
          >
            Booking Number {this.state.idBook ? this.state.idBook : ''}{' '}
            successfully created. check your booking in my booking
          </Text>
          <NormalButton
            text="Go to my booking"
            buttonHeight={40}
            buttonWidth="80%"
            buttonColor={styles.$goldcolor}
            textColor="black"
            textSize={16}
            onPress={this.handleMyBooking}
          />
        </ModalBottom>
        <ModalBottom
          height="80%"
          visible={this.state.modalQuotationSaved}
          isCenter={true}
        >
          <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
            Success
          </Text>
          <View style={styles.containerImageModal}>
            <Image
              source={PicSuccess}
              style={stylesGlobal.imageIcon}
              resizeMode="contain"
            />
          </View>
          <Text
            style={[
              stylesGlobal.textAlignCenter,
              stylesGlobal.paddingBottom20,
              stylesGlobal.paddingLeft10,
              stylesGlobal.paddingRight10,
            ]}
          >
            Your quotation was saved
          </Text>
          <NormalButton
            text="Go to my quotation"
            buttonHeight={40}
            buttonWidth="80%"
            buttonColor={styles.$goldcolor}
            textColor="black"
            textSize={16}
            onPress={this.handleMyQuotation}
          />
        </ModalBottom>
        <ModalBottom
          height={modalNoteHeight}
          visible={this.state.modalNoteVisible}
          isCenter={false}
        >
          <View style={stylesGlobal.paddingHorizontal20}>
            <View
              style={[
                stylesGlobal.row100,
                stylesGlobal.marginBottom20,
                stylesGlobal.marginTop20,
              ]}
            >
              <View style={stylesGlobal.width90}>
                <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
                  {this.state.isNote == ''
                    ? 'Add notes (optional)'
                    : 'Edit notes '}
                </Text>
              </View>
              <View style={stylesGlobal.width10}>
                <TouchableOpacity
                  onPress={() => this.setState({ modalNoteVisible: false })}
                  style={stylesGlobal.containerIcon20}
                >
                  <Image
                    source={IconClose}
                    style={[stylesGlobal.imageIcon, styles.tintColorRed]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
              <SeperatorRepeat
                repeat={31}
                widthsepar={8}
                heightSepar={1}
                colorSepar="#777"
              />
            </View>
            <View style={stylesGlobal.width100}>
              <RoundedTextInput
                marginBottom={20}
                multiline={true}
                textColor="black"
                containerWidth="100%"
                containerHeight={100}
                animated="hidden"
                placeholder="Have intruction or request about this tour for us?"
                value={this.state.TourNote}
                onChangeText={text =>
                  this.setState({
                    ...this.state,
                    TourNote: text,
                  })
                }
              />
            </View>
            <View style={stylesGlobal.row100}>
              <View style={[stylesGlobal.width50, stylesGlobal.center]}>
                <NormalButton
                  text="Save"
                  buttonHeight={40}
                  buttonWidth="95%"
                  buttonColor={styles.$goldcolor}
                  textColor="black"
                  textSize={16}
                  onPress={() => this.handleSaveNote()}
                />
              </View>
              <View style={[stylesGlobal.width50, stylesGlobal.center]}>
                <NormalButton
                  text="Cancel"
                  buttonHeight={40}
                  buttonWidth="95%"
                  buttonColor="#fff"
                  colorBorder={styles.$goldcolor}
                  textColor={styles.$goldcolor}
                  textSize={16}
                  onPress={() => this.setState({ modalNoteVisible: false })}
                />
              </View>
            </View>
          </View>
        </ModalBottom>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalSendEmailConfirmation}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalSendEmailConfirmation);
          }}
        >
          <View style={styles.modalContainer}>
            {this.state.modalSendEmailConfirmation ? (
              <View style={styles.innerContainerSort}>
                <Text
                  style={[
                    stylesGlobal.text20,
                    stylesGlobal.textBold,
                    stylesGlobal.paddingBottom10,
                  ]}
                >
                  Confirmation
                </Text>
                <Text
                  style={[stylesGlobal.textBold, stylesGlobal.paddingBottom5]}
                >
                  Make sure the data that is filled in is correct. transaction
                  will be create
                </Text>
                <Text
                  style={[stylesGlobal.colorBlackLight, styles.marginBottom10]}
                >
                  Want to send email notification to travel agent?
                </Text>
                <View
                  style={[
                    stylesGlobal.row100,
                    stylesDropDown.containerDropDown,
                  ]}
                >
                  {Platform.OS === 'ios' ? (
                    <IOSPicker
                      mode="modal"
                      textStyle={stylesDropDown.textPicker}
                      style={stylesDropDown.dropdownIos}
                      selectedValue={
                        this.state.isSendEmailConfirmation ? (
                          this.state.LabelSendEmail == 0 ? (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2,
                              ]}
                            >
                              Choose...
                            </Text>
                          ) : (
                            dataDropDown[this.state.LabelSendEmail - 1].label
                          )
                        ) : (
                          <Text
                            style={[
                              stylesGlobal.text14,
                              stylesDropDown.colorgreylight2,
                            ]}
                          >
                            Choose...
                          </Text>
                        )
                      }
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                          isSendEmailConfirmation: itemValue,
                          LabelSendEmail: itemIndex,
                        });
                      }}
                    >
                      <Picker.Item
                        label="Choose..."
                        value=""
                        color={stylesDropDown.$greylight2color}
                        style={stylesGlobal.text14}
                      />
                      {dataDropDown.map((data, i) => {
                        return (
                          <Picker.Item
                            label={data.label}
                            value={data.value}
                            key={i}
                          />
                        );
                      })}
                    </IOSPicker>
                  ) : (
                    <Picker
                      mode="dialog"
                      textStyle={stylesDropDown.textPicker}
                      style={stylesDropDown.containerDropDownAndroid}
                      selectedValue={
                        this.state.isSendEmailConfirmation ? (
                          this.state.isSendEmailConfirmation
                        ) : (
                          <Text
                            style={[
                              stylesDropDown.colorgreylight2,
                              stylesGlobal.text14,
                            ]}
                          >
                            Choose...
                          </Text>
                        )
                      }
                      onValueChange={itemValue => {
                        this.setState({
                          isSendEmailConfirmation: itemValue,
                        });
                      }}
                    >
                      <Picker.Item
                        label="Choose..."
                        value=""
                        color={stylesDropDown.$greylight2color}
                        style={stylesGlobal.text14}
                      />
                      {dataDropDown
                        ? dataDropDown.map((data, i) => {
                            return (
                              <Picker.Item
                                label={data.label}
                                value={data.value}
                                key={i}
                              />
                            );
                          })
                        : null}
                    </Picker>
                  )}
                </View>

                <View style={[styles.colNoPaddingLeft, styles.marginBottom20]}>
                  <TextWarning
                    show={true}
                    textwarning={this.state.errorSendEmail}
                    alignSelfText="flex-start"
                  />
                </View>
                {/* <CheckBox
                  onPress={this.handleCheckSendEmail}
                  checked={this.state.isSendEmailConfirmation}
                  center
                  title="Send email manual"
                  containerStyle={styles.checkBoxStyle}
                  textStyle={[
                    stylesGlobal.text14,
                    stylesGlobal.center,
                    stylesGlobal.colorBlackLight,
                  ]}
                /> */}

                <View style={[stylesGlobal.row, stylesGlobal.width100]}>
                  <View style={stylesGlobal.width50}>
                    <NormalButton
                      textSize={14}
                      text="Yes"
                      buttonWidth="90%"
                      buttonHeight={40}
                      radiusBorder={10}
                      buttonColor={styles.$goldcolor}
                      textColor="black"
                      onPress={this.handleCreate}
                    />
                  </View>
                  <View style={stylesGlobal.width50}>
                    <NormalButton
                      textSize={14}
                      text="Cancel"
                      buttonWidth="90%"
                      buttonHeight={40}
                      radiusBorder={10}
                      colorBorder={styles.$goldcolor}
                      buttonColor={'white'}
                      textColor="black"
                      onPress={this.closeModal}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </Modal>
        {this.props.loading ? (
          // <View style={stylesGlobal.marginTop50}>
          //   <RoundedLoading
          //     width={stylesGlobal.width90}
          //     height={200}
          //     line={10}
          //   />
          // </View>
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : (
          <ScrollView
            style={[
              styles.containerScroll,
              stylesGlobal.paddingTop20,
              styles.paddingBottom120,
            ]}
          >
            <Container>
              <View style={[styles.colNoPadding, stylesGlobal.alignItemsStart]}>
                <Text
                  style={[
                    styles.text16Gold,
                    styles.colPadding20,
                    stylesGlobal.marginBottom10,
                  ]}
                >
                  Please recheck your order before payment
                </Text>
                <Text
                  style={[
                    styles.colPadding20,
                    styles.bold16,
                    stylesGlobal.marginBottom10,
                  ]}
                >
                  {Data.BookingDetailSum
                    ? Data.BookingDetailSum.TourOperatorProfile
                      ? Data.BookingDetailSum.TourOperatorProfile.Name
                      : ''
                    : ''}
                </Text>
                <Text style={[styles.colPadding20, styles.bold14]}>
                  Total Payable
                </Text>
              </View>
              <View style={[styles.rowNoPadding, styles.marginTopnegatif10]}>
                <View style={styles.col70}>
                  <Text
                    style={[
                      styles.colPadding20,
                      stylesGlobal.alignContentStart,
                    ]}
                  >
                    <Text
                      style={[
                        stylesGlobal.textBold,
                        stylesGlobal.text20,
                        stylesGlobal.paddingLeft5,
                      ]}
                    >
                      {Data.BookingDetailSum
                        ? Data.BookingDetailSum.CurrencyId
                        : ''}
                    </Text>
                    <Text style={styles.text40Bold}>
                      {Data.BookingDetailSum
                        ? convertRoundPrice(
                            Data.BookingDetailSum.TourTotalPrice,
                            Data.BookingDetailSum.CurrencyId
                          )
                        : ''}
                    </Text>
                  </Text>
                </View>
                <View style={styles.col30}>
                  <Text
                    style={[
                      styles.colPadding20,
                      stylesGlobal.borderRadius10,
                      stylesGlobal.backgroundColorGold,
                      styles.paddingHorizontal15,
                      stylesGlobal.hidden,
                    ]}
                  >
                    UNPAID
                  </Text>
                </View>
              </View>
              <View style={[styles.colNoPadding, styles.containerDataTour]}>
                <Text style={[styles.text16, stylesGlobal.textAlignCenter]}>
                  This Booking will be expired on
                </Text>
                <Text style={[styles.bold16, stylesGlobal.textAlignCenter]}>
                  {moment(Data.BookingDetailSum.PaymentTerms[0].DueDate).format(
                    'DD MMM YYYY'
                  )}
                </Text>
              </View>
              <View
                style={[styles.colNoPadding, stylesGlobal.alignItemsCenter]}
              >
                <Card widthCard="90%">
                  <Text
                    style={[
                      stylesGlobal.paddingHorizontal20,
                      styles.bold20,
                      stylesGlobal.paddingTop20,
                    ]}
                  >
                    Tour Detail
                  </Text>
                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={31}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  {/* <View
                  style={[
                    styles.row100,
                    stylesGlobal.paddingHorizontal20,
                    stylesGlobal.marginBottom10,
                  ]}
                >
                  <View style={styles.col30}>
                    <Text style={styles.text16}>Booking Code </Text>
                  </View>
                  <View style={styles.col5}>
                    <Text style={styles.text16}>:</Text>
                  </View>
                  <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                    <Text style={styles.text16}>
                      {Data.BookingDetailSum ? Data.BookingDetailSum.Id : ''}
                    </Text>
                  </View>
                </View> */}
                  <View
                    style={[
                      styles.row100,
                      stylesGlobal.paddingHorizontal20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col30}>
                      <Text style={styles.text16}>Tour Name </Text>
                    </View>
                    <View style={styles.col5}>
                      <Text style={styles.text16}>:</Text>
                    </View>
                    <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.text16}>
                        {Data.BookingDetailSum
                          ? Data.BookingDetailSum.Title
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col30}>
                      <Text style={styles.text16}>Date </Text>
                    </View>
                    <View style={styles.col5}>
                      <Text style={styles.text16}>:</Text>
                    </View>
                    <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.text16}>
                        {Data.BookingDetailSum
                          ? moment(Data.BookingDetailSum.StartDate).format(
                              'DD MMM'
                            )
                          : ''}
                        -{' '}
                        {Data.BookingDetailSum
                          ? moment(Data.BookingDetailSum.EndDate).format(
                              'DD MMM YYYY'
                            )
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col30}>
                      <Text style={styles.text16}>Destination</Text>
                    </View>
                    <View style={styles.col5}>
                      <Text style={styles.text16}>:</Text>
                    </View>
                    <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.text16}>
                        {Data.BookingDetailSum
                          ? Data.BookingDetailSum.City
                            ? Data.BookingDetailSum.City.Name
                            : ''
                          : ''}
                        ,
                        {Data.BookingDetailSum
                          ? Data.BookingDetailSum.Country
                            ? Data.BookingDetailSum.Country.Name
                            : ''
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col30}>
                      <Text style={styles.text16}>Total Guest</Text>
                    </View>
                    <View style={styles.col5}>
                      <Text style={styles.text16}>:</Text>
                    </View>
                    <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.text16}>
                        {Data.BookingDetailSum
                          ? Data.BookingDetailSum.TotalGuest
                          : ''}{' '}
                        Guest
                      </Text>
                    </View>
                  </View>
                </Card>
                <Card widthCard="90%">
                  <Text
                    style={[
                      styles.colPadding20,
                      styles.bold20,
                      stylesGlobal.paddingTop20,
                    ]}
                  >
                    Payment
                  </Text>
                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={31}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  {Data.BookingDetailSum
                    ? Data.BookingDetailSum.PaymentTerms
                      ? Data.BookingDetailSum.PaymentTerms.map((pay, i) => {
                          return (
                            <View
                              style={[
                                styles.rowNoPadding,
                                styles.colPadding20,
                                stylesGlobal.marginBottom10,
                              ]}
                              key={i}
                            >
                              <View style={stylesGlobal.width70}>
                                <Text style={styles.text16}>
                                  {i + 1}. {pay.Description} (
                                  {pay.PaymentPercentage}%)
                                </Text>
                                <Text style={styles.text14Red}>
                                  Expired date:{' '}
                                  {moment(pay.DueDate).format('DD MMM YYYY')}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.col30,
                                  stylesGlobal.alignItemsEnd,
                                ]}
                              >
                                <Text style={styles.bold16}>
                                  {pay.CurrencyId}{' '}
                                  {convertRoundPrice(
                                    pay.PaymentValue,
                                    pay.CurrencyId
                                  )}
                                </Text>
                              </View>
                            </View>
                          );
                        })
                      : null
                    : null}
                </Card>
                <Card widthCard="90%">
                  <Text
                    style={[
                      styles.colPadding20,
                      styles.bold20,
                      stylesGlobal.paddingTop20,
                    ]}
                  >
                    Price Detail
                  </Text>
                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={31}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.SharingRoomSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Sharing Room</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.SharingRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.SharingRoomSum.PricePerPax,
                              Data.TourPriceSum.SharingRoomSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.SharingRoomSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.SharingRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.SharingRoomSum.TotalPrice,
                              Data.TourPriceSum.SharingRoomSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.SingleRoomSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Single Room</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.SingleRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.SingleRoomSum.PricePerPax,
                              Data.TourPriceSum.SingleRoomSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.SingleRoomSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.SingleRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.SingleRoomSum.TotalPrice,
                              Data.TourPriceSum.SingleRoomSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.ChildExtraBedSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Sharing Room</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.ChildExtraBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ChildExtraBedSum.PricePerPax,
                              Data.TourPriceSum.ChildExtraBedSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ChildExtraBedSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ChildExtraBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ChildExtraBedSum.TotalPrice,
                              Data.TourPriceSum.ChildExtraBedSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.ChildSharingRoomSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text>Child Sharing Room</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.ChildSharingRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ChildSharingRoomSum.PricePerPax,
                              Data.TourPriceSum.ChildSharingRoomSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ChildSharingRoomSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ChildSharingRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ChildSharingRoomSum.TotalPrice,
                              Data.TourPriceSum.ChildSharingRoomSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.ChildSingleRoomSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Child Single Room</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.ChildSingleRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ChildSingleRoomSum.PricePerPax,
                              Data.TourPriceSum.ChildSingleRoomSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ChildSingleRoomSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ChildSingleRoomSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ChildSingleRoomSum.TotalPrice,
                              Data.TourPriceSum.ChildSingleRoomSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.ExtraBedSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Extra Bed</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.ExtraBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ExtraBedSum.PricePerPax,
                              Data.TourPriceSum.ExtraBedSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ExtraBedSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.ExtraBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.ExtraBedSum.TotalPrice,
                              Data.TourPriceSum.ExtraBedSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.NoBedSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Baby Crib</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.NoBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.NoBedSum.PricePerPax,
                              Data.TourPriceSum.NoBedSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.NoBedSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.NoBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.NoBedSum.TotalPrice,
                              Data.TourPriceSum.NoBedSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  {Data.TourPriceSum ? (
                    Data.TourPriceSum.SharingBedSum.Pax != 0 ? (
                      <View
                        style={[
                          styles.rowNoPadding,
                          styles.colPadding20,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        <View style={styles.col45}>
                          <Text style={styles.text16}>Sharing Bed</Text>
                          <Text style={styles.text14Red}>
                            {Data.TourPriceSum.SharingBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.SharingBedSum.PricePerPax,
                              Data.TourPriceSum.SharingBedSum.Currency
                            )}
                            /Pax
                          </Text>
                        </View>
                        <View style={styles.col15}>
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.SharingBedSum.Pax} Pax
                          </Text>
                        </View>
                        <View
                          style={[styles.col40, stylesGlobal.alignItemsEnd]}
                        >
                          <Text style={styles.bold16}>
                            {Data.TourPriceSum.SharingBedSum.Currency}{' '}
                            {convertRoundPrice(
                              Data.TourPriceSum.SharingBedSum.TotalPrice,
                              Data.TourPriceSum.SharingBedSum.Currency
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}
                  {Data.BookingDetailSum ? (
                    Data.BookingDetailSum.FoC ? (
                      Data.BookingDetailSum.FoC.Qty == 0 ||
                      Data.AdditionalServices.length == 0 ? null : (
                        <View
                          style={[
                            styles.rowNoPadding,
                            styles.colPadding20,
                            stylesGlobal.marginBottom10,
                          ]}
                        >
                          <Text style={styles.bold18}>Additionals</Text>
                        </View>
                      )
                    ) : Data.AdditionalServices ? (
                      Data.AdditionalServices.length != 0 ? (
                        <View
                          style={[
                            styles.rowNoPadding,
                            styles.colPadding20,
                            stylesGlobal.marginBottom10,
                          ]}
                        >
                          <Text style={styles.bold18}>Additionals</Text>
                        </View>
                      ) : null
                    ) : null
                  ) : null}

                  <View style={styles.center}>
                    {Data.AdditionalServices
                      ? Data.AdditionalServices.length != 0
                        ? Data.AdditionalServices.map((add, i) => {
                            return (
                              <View
                                style={[
                                  styles.rowNoPadding,
                                  styles.colPadding20,
                                  stylesGlobal.marginBottom10,
                                ]}
                                key={i}
                              >
                                <View style={styles.col45}>
                                  <Text>{add.AdditionalServicesName}</Text>
                                  <Text style={styles.text12Red}>
                                    {add.OriginalCountries[0].Currency}{' '}
                                    {convertRoundPrice(
                                      add.OriginalCountries[0].Amount,
                                      add.OriginalCountries[0].Currency
                                    )}
                                    / unit
                                  </Text>
                                </View>
                                <View style={styles.col15}>
                                  <Text style={styles.bold16}>
                                    {add.Quantity} unit
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.col40,
                                    stylesGlobal.alignItemsEnd,
                                  ]}
                                >
                                  <Text style={styles.bold16}>
                                    {add.OriginalCountries[0].Currency}{' '}
                                    {convertRoundPrice(
                                      add.Quantity *
                                        add.OriginalCountries[0].Amount,
                                      add.OriginalCountries[0].Currency
                                    )}
                                  </Text>
                                </View>
                              </View>
                            );
                          })
                        : null
                      : null}
                    {Data.BookingDetailSum ? (
                      Data.BookingDetailSum.FoC ? (
                        Data.BookingDetailSum.FoC.Qty == 0 ? null : (
                          <View
                            style={[
                              styles.rowNoPadding,
                              styles.colPadding20,
                              stylesGlobal.marginBottom10,
                            ]}
                          >
                            <View style={styles.col45}>
                              <Text>Free of Charge (FOC)</Text>
                            </View>
                            <View style={styles.col15}>
                              <Text style={styles.bold16}>
                                {Data.BookingDetailSum.FoC.Qty} Pax
                              </Text>
                            </View>
                            <View
                              style={[styles.col40, stylesGlobal.alignItemsEnd]}
                            >
                              <Text style={styles.bold16}>
                                {Data.BookingDetailSum.CurrencyId}{' '}
                                {convertRoundPrice(
                                  0,
                                  Data.BookingDetailSum.CurrencyId
                                )}
                              </Text>
                            </View>
                          </View>
                        )
                      ) : null
                    ) : null}
                  </View>

                  <View
                    style={[
                      stylesGlobal.row100,
                      stylesGlobal.padding20,
                      styles.cardRadiusBottomTotalPrice,
                    ]}
                  >
                    <View style={styles.rowNoPadding}>
                      <View style={styles.col60}>
                        <Text style={styles.bold18}>Total Price</Text>
                      </View>
                      <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                        <Text style={styles.bold18}>
                          {Data.BookingDetailSum
                            ? Data.BookingDetailSum.CurrencyId
                            : ''}{' '}
                          {Data.BookingDetailSum
                            ? convertRoundPrice(
                                Data.BookingDetailSum.TourTotalPrice,
                                Data.BookingDetailSum.CurrencyId
                              )
                            : ''}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
                <SegmentSpecialAdjusment
                  handlePressSpecialAdjusmentDetail={() =>
                    this.handlePressSpecialAdjusmentDetail()
                  }
                  specialAdjusmentList={this.state.specialAdjusment}
                />

                <View style={[styles.row100, styles.colPadding20]}>
                  <View style={stylesGlobal.width50}>
                    <Text
                      style={[
                        stylesGlobal.marginBottom20,
                        stylesGlobal.text18,
                        stylesGlobal.textBold,
                      ]}
                    >
                      What we'll do
                    </Text>
                  </View>
                </View>
                <View
                  style={[styles.rowNoPadding, stylesGlobal.paddingBottom20]}
                >
                  <ScrollView horizontal={true}>
                    {Data.DailyPrograms
                      ? Data.DailyPrograms.map((move, i) => {
                          return (
                            <CardMediaNew
                              type="daily"
                              title={
                                move.TourDestinations.length != 0
                                  ? move.TourDestinations[0].Destination
                                  : ''
                              }
                              subtitle={`${move.Day}`}
                              duration={moment(move.Date).format('DD MMM YYYY')}
                              image={
                                move.TourDestinations.length != 0
                                  ? move.TourDestinations[0].ImageUrl
                                  : null
                              }
                              key={i}
                              onPress={() =>
                                this.handlePressItinerary(
                                  Data.DailyPrograms,
                                  i,
                                  Data.BookingDetailSum.PackageType
                                )
                              }
                            />
                          );
                        })
                      : null}
                  </ScrollView>
                </View>
                {/* Segment Ordered Item List */}
                <CardOrderedItem
                  orderedItemData={generateOrderItemData}
                  onPress={this.handlePressOrderedItem}
                  packageType={Data.BookingDetailSum.PackageType}
                />

                {/* END Segment Ordered Item */}
                {/* Guest List */}
                {/* <SegmentGuestList
                guestListData={generateGuestData}
                totalPax={Data.BookingDetailSum.TotalGuest}
              /> */}
                {/* END Guest List */}

                {/* Tour Note */}
                <SegmentTourNote
                  onChangeText={text =>
                    this.setState({
                      ...this.state,
                      TourNote: text,
                    })
                  }
                  tourNote={
                    type === 'myBooking' ? Data.TourNote : this.state.TourNote
                  }
                />
                {/* Tour Note */}
                <Card widthCard="90%">
                  <Text
                    style={[
                      styles.colPadding20,
                      styles.bold20,
                      stylesGlobal.paddingTop20,
                    ]}
                  >
                    Customer on Behalf
                  </Text>

                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={31}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  <View
                    style={[
                      styles.colNoPadding1,
                      styles.containerDataTour1,
                      stylesGlobal.row100,
                    ]}
                  >
                    <View style={[stylesGlobal.width25, stylesGlobal.center]}>
                      <Image
                        style={[
                          stylesGlobal.containerIcon30,
                          stylesGlobal.tintColorGrey,
                        ]}
                        source={imageicon}
                      />
                    </View>
                    <View style={stylesGlobal.width50}>
                      <Text
                        style={[stylesGlobal.textd16, stylesGlobal.colorGrey]}
                      >
                        {type === 'myBooking'
                          ? Data.BookingDetailSum
                            ? Data.BookingDetailSum.Company
                              ? Data.BookingDetailSum.Company.Name
                              : ''
                            : ''
                          : this.state.Company.Name
                          ? this.state.Company.Name
                          : 'Add your customer account'}
                      </Text>
                      {this.state.Company.Name ? (
                        this.state.Company.FirstName ? (
                          <Text
                            style={[
                              stylesGlobal.textd16,
                              stylesGlobal.colorGrey,
                            ]}
                          >
                            {this.state.Company.FirstName}{' '}
                            {this.state.Company.LastName}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              stylesGlobal.textd16,
                              stylesGlobal.colorGrey,
                            ]}
                          >
                            {this.state.Company.Username}
                          </Text>
                        )
                      ) : null}
                    </View>
                    <View style={[stylesGlobal.width25, stylesGlobal.center]}>
                      {type !== 'myBooking' && (
                        <TouchableOpacity
                          style={
                            this.state.Company.Name
                              ? stylesGlobal.width100
                              : styles.iconFrameAdd
                          }
                          onPress={this.handleCompany}
                        >
                          {this.state.Company.Name ? (
                            <Text
                              style={[
                                stylesGlobal.text12,
                                stylesGlobal.textGold,
                                stylesGlobal.textBold,
                                styles.colPadding20,
                              ]}
                            >
                              Change
                            </Text>
                          ) : (
                            <Image
                              style={[
                                stylesGlobal.imageIcon,
                                styles.tintColorWhite,
                              ]}
                              source={IconAdd}
                              resizeMode="contain"
                            />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </Card>
                {this.props.DemoPrice ? (
                  this.props.DemoPrice
                    .BookingTemplateDescriptionBindingModels ? (
                    this.props.DemoPrice.BookingTemplateDescriptionBindingModels
                      .length != 0 ? (
                      <Card widthCard="90%">
                        <Text
                          style={[
                            stylesGlobal.paddingHorizontal20,
                            stylesGlobal.paddingTop20,
                            styles.bold20,
                          ]}
                        >
                          Additional Informations
                        </Text>
                        <View
                          style={[stylesGlobal.width100, stylesGlobal.hidden]}
                        >
                          <SeperatorRepeat
                            repeat={31}
                            widthsepar={8}
                            heightSepar={1}
                            colorSepar="#777"
                          />
                        </View>
                        {this.props.DemoPrice.BookingTemplateDescriptionBindingModels.map(
                          (Desc, i) => {
                            return (
                              <View
                                key={i}
                                style={[
                                  styles.bottom,
                                  styles.marginBottom20,
                                  stylesGlobal.paddingHorizontal20,
                                ]}
                              >
                                <Text style={stylesGlobal.text16}>
                                  {Desc.Subtitle}
                                </Text>

                                <AutoHeightWebView
                                  customScript={`document.body.style.background = 'transparent';`}
                                  customStyle={`* {font-family: 'Roboto'; text-align: justify;  padding-left: 5px; 
                  padding-right: 5px; text-justify: auto; overflow-wrap: break-word; padding-bottom: 5px} 
                  p { font-size: 14px; padding-bottom: 5px}
                  `}
                                  heightOffset={5}
                                  files={[
                                    {
                                      href: 'cssfileaddress',
                                      type: 'text/css',
                                      rel: 'stylesheet',
                                    },
                                  ]}
                                  scalesPageToFit={
                                    Platform.OS == 'android' ? true : false
                                  }
                                  style={[
                                    stylesGlobal.width100,
                                    styles.marginBottom20,
                                  ]}
                                  source={{ html: Desc.Content }}
                                />
                              </View>
                            );
                          }
                        )}
                      </Card>
                    ) : null
                  ) : null
                ) : null}
              </View>
            </Container>
          </ScrollView>
        )}

        {type !== 'myBooking' ? (
          <TouchableOpacity style={[styles.footer, stylesGlobal.center]}>
            <LinearGradient
              colors={['#353535', '#252525']}
              style={[styles.footer, stylesGlobal.center]}
              start={[0, 0]}
              end={[1, 0]}
            >
              <View style={stylesGlobal.row100}>
                <View style={stylesGlobal.width50}>
                  <NormalButton
                    textSize={14}
                    text="Create as Quotation"
                    buttonWidth="98%"
                    buttonHeight={40}
                    textColor={styles.$goldcolor}
                    buttonColor="transparent"
                    colorBorder={styles.$goldcolor}
                    onPress={this.handleQuotation}
                  />
                </View>
                <View style={stylesGlobal.width50}>
                  {this.props.DetailCustom.Status == 'edit' ? (
                    <NormalButton
                      textSize={14}
                      buttonWidth="98%"
                      buttonHeight={40}
                      text="Accept Quotation"
                      textColor={styles.$goldcolor}
                      buttonColor="transparent"
                      colorBorder={styles.$goldcolor}
                      onPress={this.handleAcceptQuotation}
                    />
                  ) : (
                    <NormalButton
                      textSize={16}
                      buttonWidth="98%"
                      buttonHeight={40}
                      text="Book Now"
                      buttonColor={styles.$goldcolor}
                      colorBorder={styles.$goldcolor}
                      textColor="#252525"
                      onPress={this.openModalSendEmail}
                    />
                  )}
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.footer, stylesGlobal.center]}>
            <LinearGradient
              colors={['#353535', '#252525']}
              style={[styles.footer, stylesGlobal.center]}
              start={[0, 0]}
              end={[1, 0]}
            >
              <View style={stylesGlobal.center}>
                <NormalButton
                  textSize={14}
                  text="Save Special Adjusment"
                  buttonWidth="90%"
                  buttonHeight={40}
                  textColor={styles.$goldcolor}
                  buttonColor="transparent"
                  colorBorder={styles.$goldcolor}
                  onPress={this.handleQuotation}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  //   ItemTransaction: state.transactionReducer.ItemTransaction,
  //   DemoPrice: state.transactionReducer.DemoPrice,
  //   companyProfile: state.companyProfileReducer.companyProfile.Code,
  //   userRole: state.accountReducer.userRole,
  //   isCreateTour: state.transactionReducer.isCreateTour,
  //   isQuotationPost: state.myQoutationReducer.isQuotationPost,
  //   CreateTour: state.transactionReducer.CreateTour,
  //   CreateTourError: state.transactionReducer.CreateTourError,
  //   dataUserIdCompany: state.companyProfileReducer.dataUserIdCompany,
  //   DetailCustom: state.cusPackagesReducer.CustomDetails,
  //   additionalService: state.additionalServiceReducer.additionalService,
  specialAdjusment: state.transactionReducer.setSpecialAdjusment,
  isUpdateSpecialAdjusment: state.transactionReducer.isUpdateSpecialAdjusment,
  packageById: state.transactionReducer.packageById,
  packageByIdStatus: state.transactionReducer.packageByIdStatus,
  loading: state.transactionReducer.loading,
  DetailCustom: state.transactionReducer.CustomDetails,
});

export default connect(mapStateToProps, {
  postCreateCustomOnBeHalfAction,
  resetPostCreateCustomAction,
  postEditQuotationAction,
  getTourSummaryByIdAction,
  resetPostQuotationAction,
  setSpecialAdjusmentAction,
  resetTransactionAction,
  sendEmailConfirmation,
})(summaryCustom);

const list = [
  {
    Id: 1,
    TourTransactionId: 'sample string 2',
    ActionType: 0,
    Description: 'sample string 3',
    Qty: 4,
    UnitCost: 1000000,
    CurrencyId: 'IDR',
    IsHiddenData: true,
  },
  {
    Id: 1,
    TourTransactionId: 'sample string 2',
    ActionType: 0,
    Description: 'sample string 3',
    Qty: 4,
    UnitCost: -500,
    CurrencyId: 'IDR',
    IsHiddenData: true,
  },
];
