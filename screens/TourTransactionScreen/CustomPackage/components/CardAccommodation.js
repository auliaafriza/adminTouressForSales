import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  RoundedTextInput,
  RoundedTextInputWithButton
} from "../../../../components/textInput";
import { SeperatorRepeat } from "../../../../components/list";
import { Card, CardWithInputDuration } from "../../../../components/card";
import {
  NormalButton,
  ClearButtonWithIcon
} from "../../../../components/button";
import DateTimePicker from "react-native-modal-datetime-picker";

import styles from "../styles";
import stylesGlobal from "../../../../components/styles";

const CardAccommodation = ({
  destination,
  accommodation,
  stayDuration,
  onChangeDuration,
  increment,
  decrement,
  onPressCityDestination,
  onPressAccommodation,
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,

  onPressCheckInDate,
  onPressCheckInTime,
  onPressCheckOutTime,
  isConnection,
  addConnectionFlight,
  minDate,
  maxDate,
  isDateTimePickerVisible,
  isDateTimeOutPickerVisible,
  isTimePickerVisible,
  isTimeOutPickerVisible,
  handleDatePicked,
  hideDateTimePicked,
  handleTimePicked,
  deleteAccomodation,
  index,
  onPressaddMoreDestination,
  isBtnDestination,
  isLoadingButton,
  isChangeDuration
}) => {
  return (
    <View style={[stylesGlobal.alignItemsCenter, stylesGlobal.width100]}>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicked}
        minimumDate={new Date(minDate)}
        maximumDate={new Date(maxDate)}
        mode="date"
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
        minimumDate={new Date(minDate)}
        mode="date"
      />
      <DateTimePicker
        isVisible={isTimeOutPickerVisible}
        onConfirm={handleTimePicked}
        onCancel={hideDateTimePicked}
        is24Hour={true}
        mode="time"
      />
      {isConnection ? (
        <View style={stylesGlobal.marginTop20}>
          <NormalButton
            isLoading={isLoadingButton}
            text="+ ADD CONNECTION FLIGHT"
            buttonWidth={300}
            buttonHeight={40}
            bold
            buttonColor={styles.$goldcolor}
            textColor="black"
            onPress={addConnectionFlight}
          />
        </View>
      ) : null}
      {isBtnDestination ? (
        <View style={stylesGlobal.paddingVertical20}>
          <NormalButton
            isLoading={isLoadingButton}
            text="+ ADD NEW DESTINATION"
            buttonWidth={300}
            buttonHeight={40}
            bold
            buttonColor={styles.$goldcolor}
            textColor="black"
            onPress={onPressaddMoreDestination}
          />
        </View>
      ) : null}

      <View style={[stylesGlobal.width100, stylesGlobal.alignItemsCenter]}>
        {index != 0 ? (
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={deleteAccomodation}
          >
            <ClearButtonWithIcon
              text=""
              onPress={deleteAccomodation}
              textColor={styles.$redcolor}
              textSize={16}
              colorIcon={styles.$whitelightcolor}
              iconSize={20}
              iconName="remove"
              typeIcon="FA"
            />
          </TouchableOpacity>
        ) : null}
        <Card widthCard="90%">
          <View
            style={[
              styles.rowPadding100,
              stylesGlobal.justifyContentCenter,
              stylesGlobal.paddingHorizontal20
            ]}
          >
            <Text
              style={[styles.rowPadding100, styles.bold20, styles.paddingTop20]}
            >
              Accommodation
            </Text>
          </View>
          <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
            <SeperatorRepeat
              colorSepar={styles.$lightGreycolor}
              widthsepar={8}
              repeat={31}
            />
          </View>
          <View
            style={[stylesGlobal.width100, stylesGlobal.paddingHorizontal20]}
          >
            <RoundedTextInputWithButton
              label="City Destination"
              textColor="black"
              containerWidth="100%"
              containerHeight={50}
              placeholder="Select City"
              animated="hidden"
              value={destination}
              disable={true}
              buttonPosition="right"
              onPress={onPressCityDestination}
            />
            {/* <TouchableOpacity onPress={onPressCityDestination}>
              <RoundedTextInput
                label="City Destination"
                textColor="black"
                containerWidth="100%"
                value={destination}
                disable={false}
                placeholder="Select City"
              />
            </TouchableOpacity> */}
            <RoundedTextInputWithButton
              label="Accommodation"
              textColor="black"
              containerWidth="100%"
              containerHeight={50}
              placeholder="Select Accommodation"
              animated="hidden"
              value={accommodation}
              disable={true}
              buttonPosition="right"
              onPress={onPressAccommodation}
            />
            {/* <TouchableOpacity onPress={onPressAccommodation}>
              <RoundedTextInput
                label="Accommodation"
                textColor="black"
                containerWidth="100%"
                value={accommodation}
                disable={false}
                placeholder="Select Accommodation"
              />
            </TouchableOpacity> */}
            <View style={stylesGlobal.row100}>
              <CardWithInputDuration
                Title="Stay Duration"
                sizeIcon={18}
                textSize={16}
                value={stayDuration}
                disable={isChangeDuration}
                onChangeText={onChangeDuration}
                Decrement={decrement}
                Increment={increment}
              />
            </View>
            <View style={[stylesGlobal.row100, styles.justifySpace]}>
              <TouchableOpacity
                style={stylesGlobal.width55}
                onPress={onPressCheckInDate}
              >
                <RoundedTextInputWithButton
                  label="Check-in Date"
                  textColor="black"
                  containerWidth="95%"
                  value={checkInDate}
                  disable={true}
                  type="date"
                  buttonPosition="left"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesGlobal.width40}
                onPress={onPressCheckInTime}
              >
                <RoundedTextInputWithButton
                  label="Check-in Time"
                  textColor="black"
                  containerWidth="100%"
                  value={checkInTime}
                  disable={true}
                  type="time"
                />
              </TouchableOpacity>
            </View>
            <View style={[stylesGlobal.row100, styles.justifySpace]}>
              <TouchableOpacity style={stylesGlobal.width55}>
                <RoundedTextInputWithButton
                  label="Check-out Date"
                  textColor="black"
                  containerWidth="95%"
                  value={checkOutDate}
                  disable={true}
                  type="date"
                  buttonPosition="left"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesGlobal.width40}
                onPress={onPressCheckOutTime}
              >
                <RoundedTextInputWithButton
                  label="Check-out Time"
                  textColor="black"
                  containerWidth="100%"
                  value={checkOutTime}
                  disable={true}
                  type="time"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default CardAccommodation;
