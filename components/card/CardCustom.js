import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import stylesGlobal from '../styles';
import { RoundedTextInput, RoundedTextInputWithButton } from '../textInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { CheckBox } from 'react-native-elements';
import Card from './Card';
import CardWithInputDuration from './CardWithInputDuration';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NormalButton, ClearButtonWithIcon } from '../button';
import { SeperatorRepeat } from '../list';

const ArrivalCard = (
  onPress,
  onPressDate,
  onPressTime,
  DateTime,
  Time,
  Place,
  Note,
  onChangeTextNote
) => (
  <View style={stylesGlobal.width100}>
    <TouchableOpacity onPress={onPress}>
      <RoundedTextInputWithButton
        label="Arrival Destination"
        textColor="black"
        containerWidth="100%"
        containerHeight={50}
        value={Place}
        disable={false}
        animated="hidden"
        buttonPosition="right"
        onPress={onPress}
        showIcon={false}
      />
    </TouchableOpacity>
    <View style={[styles.rowPadding100, styles.justifySpace]}>
      <TouchableOpacity style={stylesGlobal.width55} onPress={onPressDate}>
        <RoundedTextInputWithButton
          label="Arrival Date"
          textColor="black"
          containerWidth="100%"
          value={DateTime}
          containerPadding={0}
          disable={false}
          buttonPosition="left"
          type="date"
        />
      </TouchableOpacity>

      <TouchableOpacity style={stylesGlobal.width40} onPress={onPressTime}>
        <RoundedTextInputWithButton
          label="Arrival Time"
          textColor="black"
          containerWidth="100%"
          value={Time}
          disable={false}
          buttonPosition="left"
          type="time"
        />
      </TouchableOpacity>
    </View>
    <RoundedTextInput
      label="Flight Number"
      textColor="black"
      containerWidth="100%"
      placeholder="Enter Flight Number"
      value={Note}
      containerPadding={0}
      animated="hidden"
      onChangeText={onChangeTextNote}
    />
    <View style={[styles.cardWarningFixPrice, stylesGlobal.padding15]}>
      <View style={styles.rowPadding100}>
        <Icon name="info" size={16} color={styles.$goldcolor} />
        <Text style={styles.textSize14Gold}>Local Time</Text>
      </View>
      <View style={styles.rowPadding100}>
        <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
          The date and time listed are the date and time at the airport location
        </Text>
      </View>
    </View>
  </View>
);

const ArrivalConnection = (
  onPress,
  onPressTime,
  DateTime,
  Time,
  Place,
  Note,
  onChangeTextNote
) => (
  <View style={stylesGlobal.width100}>
    <View style={[styles.paddingLeftRight, styles.center]}>
      <TouchableOpacity onPress={onPress}>
        <RoundedTextInput
          label="Arrival Destination"
          placeholder="Choose Arrival Destination"
          textColor="black"
          containerWidth="100%"
          value={Place}
          containerPadding={0}
          disable={false}
          onPress={onPress}
          button={true}
        />
      </TouchableOpacity>
      <View style={[styles.rowPadding100, styles.justifySpace]}>
        <TouchableOpacity style={stylesGlobal.width55}>
          <RoundedTextInputWithButton
            label="Arrival Date"
            textColor="black"
            containerWidth="100%"
            value={DateTime}
            disable={false}
            buttonPosition="left"
            type="date"
          />
        </TouchableOpacity>

        <TouchableOpacity style={stylesGlobal.width40} onPress={onPressTime}>
          <RoundedTextInputWithButton
            label="Arrival Time"
            textColor="black"
            containerWidth="100%"
            value={Time}
            disable={false}
            buttonPosition="left"
            type="time"
          />
        </TouchableOpacity>
      </View>
      <RoundedTextInput
        label="Flight Number"
        textColor="black"
        containerWidth="100%"
        value={Note}
        onChangeText={onChangeTextNote}
        containerPadding={0}
      />
      <View style={[styles.cardWarningFixPrice, stylesGlobal.padding15]}>
        <View style={styles.rowPadding100}>
          <Icon name="info" size={16} color={styles.$goldcolor} />
          <Text style={styles.textSize14Gold}>Local Time</Text>
        </View>
        <View style={styles.rowPadding100}>
          <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
            The date and time listed are the date and time at the airport
            location
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const Accomodation = (
  onPress,
  onPressDes,
  onPressDate,
  onPressTime,
  onPressTimeOut,
  DateTime,
  Time,
  DateTimeOut,
  TimeOut,
  Destination,
  AccomodationName,
  Duration,
  Dec,
  Inc,
  onChangeText
) => (
  <View style={stylesGlobal.width100}>
    <TouchableOpacity onPress={onPressDes}>
      <RoundedTextInput
        label="City Destination"
        textColor="black"
        containerWidth="100%"
        value={Destination.Name}
        placeholder="Choose Destination"
        disable={false}
        onPress={onPressDes}
        button={true}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress}>
      <RoundedTextInput
        label="Accomodation"
        textColor="black"
        containerWidth="100%"
        value={AccomodationName}
        placeholder="Choose Accomodation"
        disable={false}
        onPress={onPress}
        button={true}
      />
    </TouchableOpacity>
    <View style={styles.rowPadding100}>
      <CardWithInputDuration
        Title="Stay Duration"
        sizeIcon={18}
        textSize={16}
        value={Duration}
        onChangeText={onChangeText}
        Decrement={Dec}
        Increment={Inc}
      />
    </View>
    <View style={[styles.rowPadding100, styles.justifySpace]}>
      <TouchableOpacity style={stylesGlobal.width55} onPress={onPressDate}>
        <RoundedTextInputWithButton
          label="Check-in Date"
          textColor="black"
          containerWidth="95%"
          value={DateTime}
          disable={false}
          buttonPosition="left"
          type="date"
        />
      </TouchableOpacity>
      <TouchableOpacity style={stylesGlobal.width40} onPress={onPressTime}>
        <RoundedTextInputWithButton
          label="Check-in Time"
          textColor="black"
          containerWidth="100%"
          value={Time}
          disable={false}
          type="time"
          buttonPosition="left"
        />
      </TouchableOpacity>
    </View>
    <View style={[styles.rowPadding100, styles.justifySpace]}>
      <TouchableOpacity style={stylesGlobal.width55}>
        <RoundedTextInputWithButton
          label="Check-out Date"
          textColor="black"
          containerWidth="95%"
          value={DateTimeOut}
          disable={false}
          buttonPosition="left"
          type="date"
        />
      </TouchableOpacity>
      <TouchableOpacity style={stylesGlobal.width40} onPress={onPressTimeOut}>
        <RoundedTextInputWithButton
          label="Check-out Time"
          textColor="black"
          containerWidth="100%"
          value={TimeOut}
          disable={false}
          buttonPosition="left"
          type="time"
        />
      </TouchableOpacity>
    </View>
  </View>
);

const Departure = (
  onPress,
  onPressTime,
  DateTime,
  Time,
  Place,
  Note,
  onChangeTextNote
) => (
  <View style={stylesGlobal.width100}>
    <TouchableOpacity onPress={onPress} style={stylesGlobal.width100}>
      <RoundedTextInputWithButton
        label="Departure Destination"
        textColor="black"
        containerWidth="100%"
        value={Place}
        disable={false}
        animated="hidden"
        buttonPosition="right"
        onPress={onPress}
        showIcon={false}
      />
    </TouchableOpacity>
    <View style={[styles.rowPadding100, styles.justifySpace]}>
      <TouchableOpacity style={stylesGlobal.width55}>
        <RoundedTextInputWithButton
          label="Departure Date"
          textColor="black"
          containerWidth="95%"
          value={DateTime}
          disable={false}
          type="date"
          buttonPosition="left"
        />
      </TouchableOpacity>
      <TouchableOpacity style={stylesGlobal.width40} onPress={onPressTime}>
        <RoundedTextInputWithButton
          label="Departure Time"
          textColor="black"
          containerWidth="100%"
          value={Time}
          disable={false}
          type="time"
        />
      </TouchableOpacity>
    </View>
    <RoundedTextInput
      label="Flight Number"
      textColor="black"
      containerWidth="100%"
      placeholder="Enter Flight Number"
      value={Note}
      onChangeText={onChangeTextNote}
    />
    <View style={[styles.cardWarningFixPrice, stylesGlobal.padding15]}>
      <View style={styles.rowPadding100}>
        <Icon name="info" size={16} color={styles.$goldcolor} />
        <Text style={styles.textSize14Gold}>Local Time</Text>
      </View>
      <View style={styles.rowPadding100}>
        <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
          The date and time listed are the date and time at the airport location
        </Text>
      </View>
    </View>
  </View>
);

const DepartureConnection = (
  onPressDestination,
  onPressTime,
  DateTime,
  Time,
  Place,
  Note,
  onChangeTextNote
) => (
  <View style={stylesGlobal.width100}>
    <View style={[styles.paddingLeftRight, styles.center]}>
      <TouchableOpacity onPress={onPressDestination}>
        <RoundedTextInput
          label="Departure Destination"
          textColor="black"
          containerWidth="100%"
          value={Place}
          containerPadding={0}
          disable={false}
        />
      </TouchableOpacity>
      <View style={[styles.rowPadding100, styles.justifySpace]}>
        <TouchableOpacity style={stylesGlobal.width55}>
          <RoundedTextInputWithButton
            label="Departure Date"
            textColor="black"
            containerWidth="95%"
            value={DateTime}
            containerPadding={0}
            disable={false}
            buttonPosition="left"
            type="date"
          />
        </TouchableOpacity>

        <TouchableOpacity style={stylesGlobal.width40} onPress={onPressTime}>
          <RoundedTextInputWithButton
            label="Departure Time"
            textColor="black"
            containerWidth="100%"
            value={Time}
            disable={false}
            buttonPosition="left"
          />
        </TouchableOpacity>
      </View>
      <RoundedTextInput
        label="Flight Number"
        textColor="black"
        containerWidth="100%"
        value={Note}
        onChangeText={onChangeTextNote}
        containerPadding={0}
      />
      <View style={[styles.cardWarningFixPrice, stylesGlobal.padding15]}>
        <View style={styles.rowPadding100}>
          <Icon name="info" size={16} color={styles.$goldcolor} />
          <Text style={styles.textSize14Gold}>Local Time</Text>
        </View>
        <View style={styles.rowPadding100}>
          <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
            The date and time listed are the date and time at the airport
            location
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const CardCustom = props => {
  const {
    Index,
    type, //untuk change Airport dan change accomodation
    onPress,
    onPressDes, //untuk change Date and Time Arrival, Departure, Accomodation In
    onPressDate,
    onPressTime, //untuk change Date and Time Accomodation Out

    onPressTimeOut, //untuk change airport departure connection
    onPressDestination, //untuk change Date and Time Accomodation In
    DateTime,
    Time, //untuk view Date and Time Accomodation Out
    DateTimeOut,
    TimeOut, //untuk view place Arrival dan Departure
    Place, //untuk view Destination Accomodation
    Destination, //untuk view Accomodation name
    AccomodationName, //untuk view Note data Flight number
    Note, //untuk delte connection flight
    deleteAccomodation, //untuk duration accomodation
    Duration,
    Dec,
    Inc,
    onChangeText,
    //untuk departure check next day
    checked,
    onPressCheck,
    isShowChecked, //untuk connection flight
    isDateTimePickerVisible,
    isTimePickerVisible,
    isDateTimeOutPickerVisible,
    isTimeOutPickerVisible,
    handleDatePicked,
    handleTimePicked,
    hideDateTimePicked,
    Dateminum,
    Datemaximum,
    isConnection,
    addConnectionFlight,
    onChangeTextNote,
  } = props;
  return (
    <View>
      <View style={stylesGlobal.center}>
        {type === 'Accomodation' && isConnection ? (
          <NormalButton
            text="+ ADD CONNECTION FLIGHT"
            buttonWidth="70%"
            buttonHeight={40}
            bold
            buttonColor={styles.$goldcolor}
            textColor="black"
            onPress={addConnectionFlight}
          />
        ) : null}
      </View>
      <Card widthCard="90%">
        {type == 'Accomodation' && Index != 0 ? (
          <View
            style={[styles.rowPadding100, stylesGlobal.paddingHorizontal20]}
          >
            <View style={[stylesGlobal.width80, stylesGlobal.rowEnd]}>
              <Text
                style={[
                  styles.rowPadding100,
                  styles.colPadding20,
                  styles.bold20,
                  styles.paddingTop20,
                  styles.alignSelfCenter,
                  stylesGlobal.alignTextCenter,
                ]}
              >
                {type}
              </Text>
            </View>
            <View style={[stylesGlobal.width20, stylesGlobal.rowEnd]}>
              <View
                style={[
                  styles.paddingVerticalAndAlign,
                  stylesGlobal.center,
                  styles.alignSelfCenter,
                ]}
              >
                <ClearButtonWithIcon
                  text=""
                  onPress={deleteAccomodation}
                  textColor={styles.$redcolor}
                  textSize={16}
                  colorIcon={styles.$redcolor}
                  iconSize={20}
                  iconName="remove"
                  typeIcon="FA"
                />
              </View>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.rowPadding100,
              stylesGlobal.justifyContentCenter,
              stylesGlobal.paddingHorizontal20,
            ]}
          >
            <Text
              style={[styles.rowPadding100, styles.bold20, styles.paddingTop20]}
            >
              {type == 'DepartureConnection'
                ? 'Departure'
                : type == 'ArrivalConnection'
                ? 'Arrival'
                : type}
            </Text>
          </View>
        )}
        <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
          <SeperatorRepeat
            repeat={31}
            widthsepar={8}
            heightSepar={1}
            colorSepar="#777"
          />
        </View>
        {(type === 'Departure' ||
          type === 'DepartureConnection' ||
          type === 'ArrivalConnection') &&
        isShowChecked ? (
          <View
            style={[
              styles.rowPadding100,
              stylesGlobal.justifyContentEnd,
              stylesGlobal.paddingHorizontal20,
            ]}
          >
            <CheckBox
              onPress={onPressCheck}
              checked={checked}
              center
              title="Next Day"
              iconRight
              containerStyle={styles.checkBoxStyle}
              textStyle={[
                stylesGlobal.text14,
                stylesGlobal.center,
                stylesGlobal.colorBlackLight,
              ]}
            />
          </View>
        ) : null}
        <View style={[styles.rowPadding100, styles.colPadding20]}>
          {type === 'Arrival'
            ? ArrivalCard(
                onPress,
                onPressDate,
                onPressTime,
                DateTime,
                Time,
                Place,
                Note,
                onChangeTextNote
              )
            : type === 'Accomodation'
            ? Accomodation(
                onPress,
                onPressDes,
                onPressDate,
                onPressTime,
                onPressTimeOut,
                DateTime,
                Time,
                DateTimeOut,
                TimeOut,
                Destination,
                AccomodationName,
                Duration,
                Dec,
                Inc,
                onChangeText
              )
            : type === 'Departure'
            ? Departure(
                onPress,
                onPressTime,
                DateTime,
                Time,
                Place,
                Note,
                onChangeTextNote
              )
            : type === 'ArrivalConnection'
            ? ArrivalConnection(
                onPress,
                onPressTime,
                DateTime,
                Time,
                Place,
                Note,
                onChangeTextNote
              )
            : type === 'DepartureConnection'
            ? DepartureConnection(
                onPressDestination,
                onPressTime,
                DateTime,
                Time,
                Place,
                Note,
                onChangeTextNote
              )
            : null}
        </View>
      </Card>

      <View style={stylesGlobal.center}>
        {type === 'DepartureConnection' ? (
          <NormalButton
            text=" - DELETE CONNECTION FLIGHT"
            buttonHeight={40}
            buttonWidth="80%"
            buttonColor={styles.$goldcolor}
            textColor="black"
            textSize={16}
            onPress={onPress}
          />
        ) : null}
      </View>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicked}
        minimumDate={new Date(Dateminum)}
        maximumDate={new Date(Datemaximum)}
        mode="date"
        //date={new Date(DateTime)}
      />
      <DateTimePicker
        isVisible={isTimePickerVisible}
        onConfirm={handleTimePicked}
        onCancel={hideDateTimePicked}
        is24Hour={true}
        mode="time"
      />
      <DateTimePicker
        isVisible={isDateTimeOutPickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicked}
        minimumDate={new Date(Dateminum)}
        mode="date"
        //date={new Date(DateTimeOut)}
      />
      <DateTimePicker
        isVisible={isTimeOutPickerVisible}
        onConfirm={handleTimePicked}
        onCancel={hideDateTimePicked}
        is24Hour={true}
        mode="time"
      />
    </View>
  );
};

CardCustom.propTypes = {
  Index: PropTypes.number,
  type: PropTypes.string,
  //untuk change Airport dan change accomodation
  onPress: PropTypes.func,
  onPressDes: PropTypes.func,
  //untuk change Date and Time Arrival, Departure, Accomodation DepartureIn
  onPressDate: PropTypes.func,
  onPressTime: PropTypes.func,
  //untuk change Date and Time Accomodation Out

  onPressTimeOut: PropTypes.func,
  //untuk change Date and Time Accomodation In
  DateTime: PropTypes.string,
  Time: PropTypes.string,
  //untuk membaca index ke -0
  index: PropTypes.number,
  //untuk view Date and Time Accomodation Out
  DateTimeOut: PropTypes.string,
  TimeOut: PropTypes.string,
  //untuk view place Arrival dan Departure
  Place: PropTypes.string,
  //untuk view Destination Accomodation
  Destination: PropTypes.object,
  //untuk view Accomodation name
  AccomodationName: PropTypes.string,
  deleteAccomodation: PropTypes.func,
  //untuk view Note data Flight number
  Note: PropTypes.string,

  //untuk duration accomodation
  Duration: PropTypes.number,
  Dec: PropTypes.func,
  Inc: PropTypes.func,
  onChangeText: PropTypes.func,

  // untuk connection flight
  checkDayArrival: PropTypes.bool,
  onPressCheckDayArrival: PropTypes.func,
  checkDayDeparture: PropTypes.bool,
  onPressCheckDayDeparture: PropTypes.func,
  onPressDestination: PropTypes.func,
  //untuk check day in departure
  checked: PropTypes.bool,
  onPressCheck: PropTypes.func,
  isShowChecked: PropTypes.bool,

  isDateTimePickerVisible: PropTypes.bool,
  isTimePickerVisible: PropTypes.bool,
  isDateTimeOutPickerVisible: PropTypes.bool,
  isTimeOutPickerVisible: PropTypes.bool,
  handleDatePicked: PropTypes.func,
  handleTimePicked: PropTypes.func,
  hideDateTimePicked: PropTypes.func,
  Dateminum: PropTypes.string,
  Datemaximum: PropTypes.string,
  isConnection: PropTypes.bool,
  addConnectionFlight: PropTypes.func,
  onChangeTextNote: PropTypes.func,
};

export default CardCustom;
