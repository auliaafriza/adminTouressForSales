import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  RoundedTextInput,
  RoundedTextInputWithButton
} from "../../../../components/textInput";
import { SeperatorRepeat } from "../../../../components/list";
import { Card } from "../../../../components/card";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { CheckBox } from "react-native-elements";
import {
  NormalButton,
  ClearButtonWithIcon
} from "../../../../components/button";

import PropTypes from "prop-types";
import styles from "../styles";
import stylesGlobal from "../../../../components/styles";

const CardFlight = ({
  serviceItemIdArr,
  serviceItemIdDep,
  departure,
  arrival,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  flightCode,
  onPressDeparture,
  onPressArrival,
  onPickDepartureDate,
  onPickDepartureTime,
  onPickArrivalDate,
  onPickArrivalTime,
  onPressDepartureDate,
  onPressDepartureTime,
  onPressArrivalDate,
  onPressArrivalTime,
  onChangeFlightCode,
  dateMinDeparture,
  dateMaxDeparture,
  hideDateTimePicked,
  isDatePickerDeparture,
  isTimePickerDeparture,
  isDatePickerArrival,
  isTimePickerArrival,
  minDate,
  onPressCheckDeparture,
  onPressCheckArrival,
  checkedDeparture,
  checkedArrival,
  isShowCheckDeparture,
  isShowCheckArrival,
  isBtnDestination,
  isLoadingButton,
  onPressaddMoreDestination,
  isBtnMultiple,
  onPressMultipleDestination,
  onChangeNote,
  note,
  onPressTicket,
  onPressDeleteConnection,
  onPressDiscardTicket,
  isFirstFlight,
  isLastFlight,
  isFlight,
  isChangeButton,
  PNRCodeDeparture,
  PNRCodeArrival,
  isDisable = false
}) => {
  return (
    <View style={[stylesGlobal.width100, stylesGlobal.alignItemsCenter]}>
      <DateTimePicker
        isVisible={isDatePickerArrival}
        onConfirm={onPickArrivalDate}
        onCancel={hideDateTimePicked}
        mode="date"
      />
      <DateTimePicker
        isVisible={isDatePickerDeparture}
        onConfirm={onPickDepartureDate}
        onCancel={hideDateTimePicked}
        minimumDate={new Date()}
        mode="date"
      />
      <DateTimePicker
        isVisible={isTimePickerDeparture}
        onConfirm={onPickDepartureTime}
        onCancel={hideDateTimePicked}
        is24Hour={true}
        mode="time"
      />
      <DateTimePicker
        isVisible={isDatePickerArrival}
        onConfirm={onPickArrivalDate}
        onCancel={hideDateTimePicked}
        minimumDate={new Date()}
        mode="date"
      />
      <DateTimePicker
        isVisible={isTimePickerArrival}
        onConfirm={onPickArrivalTime}
        onCancel={hideDateTimePicked}
        is24Hour={true}
        mode="time"
      />

      {isBtnMultiple ? (
        <View style={stylesGlobal.paddingVertical20}>
          <NormalButton
            isLoading={isLoadingButton}
            text="+ ADD MULTIPLE DESTINATION"
            buttonWidth={300}
            buttonHeight={40}
            bold
            buttonColor={styles.$goldcolor}
            textColor="black"
            onPress={onPressMultipleDestination}
          />
        </View>
      ) : null}

      {isBtnDestination && !isBtnMultiple ? (
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
        {!isFirstFlight &&
        !isLastFlight &&
        !serviceItemIdDep &&
        !serviceItemIdArr ? (
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={onPressDeleteConnection}
          >
            <ClearButtonWithIcon
              text=""
              onPress={onPressDeleteConnection}
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
              stylesGlobal.row100,
              stylesGlobal.justifyContentCenter,
              stylesGlobal.paddingHorizontal20
            ]}
          >
            <View style={stylesGlobal.width30}>
              <Text
                style={[
                  stylesGlobal.row100,
                  styles.bold20,
                  styles.paddingTop20
                ]}
              >
                Flight
              </Text>
            </View>
            <View style={[stylesGlobal.width70, stylesGlobal.marginTop20]}>
              {isShowCheckDeparture && !serviceItemIdDep ? (
                <View style={[stylesGlobal.width100, stylesGlobal.rowEnd]}>
                  <CheckBox
                    iconRight
                    onPress={onPressCheckDeparture}
                    checked={checkedDeparture}
                    title="Next Day Departure"
                    containerStyle={styles.checkBoxStyle}
                    textStyle={[
                      stylesGlobal.text11,
                      stylesGlobal.center,
                      stylesGlobal.colorBlackLight
                    ]}
                  />
                </View>
              ) : null}
              {isShowCheckArrival && !serviceItemIdArr ? (
                <View style={[stylesGlobal.width100, stylesGlobal.rowEnd]}>
                  <CheckBox
                    iconRight
                    onPress={onPressCheckArrival}
                    checked={checkedArrival}
                    title="Next Day Arrival"
                    containerStyle={styles.checkBoxStyle}
                    textStyle={[
                      stylesGlobal.text11,
                      stylesGlobal.center,
                      stylesGlobal.colorBlackLight
                    ]}
                  />
                </View>
              ) : isChangeButton ? (
                <View
                  style={[
                    stylesGlobal.width100,
                    stylesGlobal.rowEnd,
                    stylesGlobal.marginTop20
                  ]}
                >
                  <NormalButton
                    isLoading={isLoadingButton}
                    text="Discard Ticket"
                    buttonWidth={130}
                    buttonHeight={35}
                    bold
                    buttonColor={styles.$redcolor}
                    textColor="white"
                    textSize={11}
                    onPress={onPressDiscardTicket}
                  />
                </View>
              ) : null}
            </View>
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
              label="Departure"
              textColor="black"
              containerWidth="100%"
              containerHeight={50}
              placeholder="Select Departure"
              animated="hidden"
              value={departure}
              disable={true}
              buttonPosition="right"
              disableInput={serviceItemIdDep ? "disable" : null}
              onPress={serviceItemIdDep ? null : onPressDeparture}
            />
            {/* <TouchableOpacity
              onPress={serviceItemIdDep ? null : onPressDeparture}
            >
              <RoundedTextInput
                label="Departure"
                textColor="black"
                containerWidth="100%"
                value={departure}
                placeholder="Select Departure"
                disableInput={serviceItemIdDep ? 'disable' : null}
                disable={true}
              />
            </TouchableOpacity> */}

            <View style={[stylesGlobal.row100, styles.justifySpace]}>
              <TouchableOpacity
                style={stylesGlobal.width55}
                onPress={serviceItemIdDep ? null : onPressDepartureDate}
              >
                <RoundedTextInputWithButton
                  label="Departure Date"
                  textColor="black"
                  containerWidth="95%"
                  value={departureDate}
                  type="date"
                  buttonPosition="left"
                  disableInput={serviceItemIdDep ? "disable" : null}
                  disable={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesGlobal.width40}
                onPress={serviceItemIdDep ? null : onPressDepartureTime}
              >
                <RoundedTextInputWithButton
                  label="Departure Time"
                  textColor="black"
                  containerWidth="100%"
                  value={departureTime}
                  type="time"
                  disableInput={serviceItemIdDep ? "disable" : null}
                  disable={true}
                />
              </TouchableOpacity>
            </View>

            <RoundedTextInputWithButton
              label="Arrival"
              textColor="black"
              containerWidth="100%"
              containerHeight={50}
              placeholder="Select Arrival"
              animated="hidden"
              value={arrival}
              disable={true}
              buttonPosition="right"
              disableInput={serviceItemIdArr ? "disable" : null}
              onPress={serviceItemIdArr ? null : onPressArrival}
            />
            {/* <TouchableOpacity
              onPress={serviceItemIdArr ? null : onPressArrival}
            >
              <RoundedTextInput
                label="Arrival"
                textColor="black"
                containerWidth="100%"
                value={arrival}
                placeholder="Select Arrival"
                disableInput={serviceItemIdArr ? 'disable' : null}
                disable={true}
              />
            </TouchableOpacity> */}
            <View style={[stylesGlobal.row100, styles.justifySpace]}>
              <TouchableOpacity
                style={stylesGlobal.width55}
                onPress={serviceItemIdArr ? null : onPressArrivalDate}
              >
                <RoundedTextInputWithButton
                  label="Arrival Date"
                  textColor="black"
                  containerWidth="95%"
                  value={arrivalDate}
                  type="date"
                  buttonPosition="left"
                  disableInput={serviceItemIdArr ? "disable" : null}
                  disable={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesGlobal.width40}
                onPress={serviceItemIdArr ? null : onPressArrivalTime}
              >
                <RoundedTextInputWithButton
                  label="Arrival Time"
                  textColor="black"
                  containerWidth="100%"
                  value={arrivalTime}
                  type="time"
                  disableInput={serviceItemIdArr ? "disable" : null}
                  disable={true}
                />
              </TouchableOpacity>
            </View>

            {/* {departure && arrival && isFlight ? ( */}
            {serviceItemIdDep && serviceItemIdArr ? (
              isChangeButton ? (
                <View
                  style={[
                    styles.cardWarning,
                    stylesGlobal.row,
                    stylesGlobal.center
                  ]}
                >
                  {/* <Text>PNR : {PNRCodeDeparture ? PNRCodeDeparture : '-'} </Text> */}
                  {isChangeButton ? (
                    <TouchableOpacity
                      onPress={onPressTicket}
                      style={stylesGlobal.textAlignRight}
                    >
                      <Text style={stylesGlobal.blueColor}> Change Ticket</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null
            ) : (
              <View>
                <View
                  style={[
                    isFlight ? styles.cardWarning : styles.cardDisable,
                    stylesGlobal.row,
                    stylesGlobal.center
                  ]}
                >
                  <Text>Looking for flight ticket? </Text>
                  <TouchableOpacity
                    onPress={onPressTicket}
                    disabled={!isFlight}
                  >
                    <Text
                      style={
                        isFlight
                          ? stylesGlobal.blueColor
                          : stylesGlobal.greyColor
                      }
                    >
                      Show me ticket
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <RoundedTextInput
              label="Flight Number"
              textColor="black"
              containerWidth="100%"
              placeholder="Enter Flight Number"
              value={flightCode}
              onChangeText={onChangeFlightCode}
              disable={false}
            />
            <RoundedTextInput
              label="Note"
              textColor="black"
              containerWidth="100%"
              placeholder="Note for your customer"
              value={note}
              onChangeText={onChangeNote}
              disable={false}
            />
            <View style={[styles.cardWarning, stylesGlobal.padding15]}>
              <View style={stylesGlobal.row100}>
                <Icon name="info" size={16} color={styles.$goldcolor} />
                <Text style={styles.textSize14Gold}>Local Time</Text>
              </View>
              <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
                The date and time listed are the date and time at the airport
                location
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

CardFlight.propTypes = {
  departure: PropTypes.string,
  arrival: PropTypes.string,
  departureDate: PropTypes.string,
  departureTime: PropTypes.string,
  arrivalDate: PropTypes.string,
  arrivalTime: PropTypes.string,
  flightCode: PropTypes.string,
  onPressDeparture: PropTypes.func,
  onPressArrival: PropTypes.func,
  onPickDepartureDate: PropTypes.func,
  onPickDepartureTime: PropTypes.func,
  onPickArrivalDate: PropTypes.func,
  onPickArrivalTime: PropTypes.func,
  onPressDepartureDate: PropTypes.func,
  onPressDepartureTime: PropTypes.func,
  onPressArrivalDate: PropTypes.func,
  onPressArrivalTime: PropTypes.func,
  onChangeFlightCode: PropTypes.func,
  dateMinDeparture: PropTypes.string,
  dateMaxDeparture: PropTypes.string,
  hideDateTimePicked: PropTypes.func,
  isDatePickerDeparture: PropTypes.bool,
  isTimePickerDeparture: PropTypes.bool,
  isDatePickerArrival: PropTypes.bool,
  isTimePickerArrival: PropTypes.bool,
  minDate: PropTypes.string,
  onPressCheckDeparture: PropTypes.func,
  onPressCheckArrival: PropTypes.func,
  checkedDeparture: PropTypes.string,
  checkedArrival: PropTypes.string,
  isShowCheckDeparture: PropTypes.bool,
  isShowCheckArrival: PropTypes.bool,
  isBtnDestination: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onPressaddMoreDestination: PropTypes.func,
  isBtnMultiple: PropTypes.bool,
  onPressMultipleDestination: PropTypes.func,
  onChangeNote: PropTypes.func,
  note: PropTypes.string,
  onPressTicket: PropTypes.func,
  onPressDeleteConnection: PropTypes.func,
  isFirstFlight: PropTypes.bool,
  isLastFlight: PropTypes.bool,
  isFlight: PropTypes.bool,
  isChangeButton: PropTypes.bool,
  PNRCodeDeparture: PropTypes.string,
  PNRCodeArrival: PropTypes.string,
  serviceItemIdDep: PropTypes.number,
  serviceItemIdArr: PropTypes.number,
  onPressDiscardTicket: PropTypes.func,
  isDisable: PropTypes.bool
};

export default CardFlight;
