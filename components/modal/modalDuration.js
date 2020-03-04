import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import stylesGlobal from '../styles';
import { NormalButton } from '../button';
import { CardWithInputDuration } from '../card';
import { RoundedTextInput } from '../textInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const modalDuration = ({
  onPressClose,
  onPressTime,
  DateTime,
  isTimePickerVisible,
  handleTimePicked,
  Duration,
  Dec,
  Inc,
  hideDateTimePicked,
  onChangeText,
  onPressCancel,
  onPressSave,
  Note,
  IsSolidStartTime,
  IsSolidDuration,
  HiddenNote = false,
  isEdit = false,
  activityName,
  isEat,
}) => (
  <View style={styles.modalDuration}>
    <View
      style={[
        stylesGlobal.row100,
        { backgroundColor: '#e6ca6b', alignItems: 'center' },
      ]}
    >
      <View style={[stylesGlobal.width90, stylesGlobal.padding20]}>
        <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
          Set Time and Duration
        </Text>
      </View>
      <TouchableOpacity
        style={[stylesGlobal.width10, stylesGlobal.justifyContentEnd]}
        onPress={onPressClose}
      >
        <Ionicons name="ios-close" size={32} color={stylesGlobal.colorRed} />
      </TouchableOpacity>
    </View>
    <View style={[stylesGlobal.padding20]}>
      {isEdit ? (
        <TouchableWithoutFeedback style={stylesGlobal.width100}>
          <RoundedTextInput
            marginBottom={20}
            label={isEat ? 'Restaurant' : 'Excrusion'}
            textColor="black"
            containerWidth="100%"
            value={activityName}
            disable={false}
          />
        </TouchableWithoutFeedback>
      ) : null}
      <TouchableOpacity
        style={stylesGlobal.width100}
        onPress={!IsSolidStartTime ? onPressTime : null}
      >
        <RoundedTextInput
          marginBottom={20}
          label="Start Time"
          textColor="black"
          containerWidth="100%"
          value={DateTime}
          disable={false}
        />
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isTimePickerVisible}
        onConfirm={handleTimePicked}
        onCancel={hideDateTimePicked}
        is24Hour={true}
        mode="time"
      />
      {!IsSolidDuration ? (
        <CardWithInputDuration
          Title={'Duration?'}
          type="time"
          sizeIcon={15}
          textSize={15}
          value={Duration}
          Decrement={!IsSolidDuration ? Dec : null}
          Increment={!IsSolidDuration ? Inc : null}
        />
      ) : (
        <View style={[stylesGlobal.row100, stylesGlobal.marginBottom20]}>
          <View style={[stylesGlobal.width50, stylesGlobal.rowStart]}>
            <Text>Duration</Text>
          </View>
          <View
            style={[
              stylesGlobal.width50,
              stylesGlobal.row,
              stylesGlobal.rowEnd,
            ]}
          >
            {Math.floor(Duration / 3600) != 0 ? (
              <Text style={stylesGlobal.text15}>
                {Math.floor(Duration / 3600)} h
              </Text>
            ) : null}
            {Math.round(Duration % 3600) != 0 ? (
              <Text style={stylesGlobal.text15}>
                {' '}
                {Math.round(Duration % 3600)} m
              </Text>
            ) : null}
          </View>
        </View>
      )}
      {HiddenNote ? null : (
        <RoundedTextInput
          marginBottom={20}
          label="Note"
          textColor="black"
          containerWidth="100%"
          value={Note}
          onChangeText={onChangeText}
        />
      )}
      <View style={stylesGlobal.row100}>
        <View style={stylesGlobal.width50}>
          <NormalButton
            buttonHeight={30}
            buttonWidth="90%"
            text="CANCEL"
            buttonColor="white"
            textColor={styles.$goldcolor}
            colorBorder={styles.$goldcolor}
            onPress={onPressCancel}
          />
        </View>
        <View style={stylesGlobal.width50}>
          <NormalButton
            text="SAVE"
            buttonHeight={30}
            buttonWidth="90%"
            textColor="black"
            buttonColor={styles.$goldcolor}
            onPress={onPressSave}
          />
        </View>
      </View>
    </View>
  </View>
);

modalDuration.propTypes = {
  onPressClose: PropTypes.func,
  onPressTime: PropTypes.func,
  DateTime: PropTypes.string,
  isTimePickerVisible: PropTypes.bool,
  handleTimePicked: PropTypes.func,
  Duration: PropTypes.number,
  Dec: PropTypes.func,
  Inc: PropTypes.func,
  hideDateTimePicked: PropTypes.func,
  onChangeText: PropTypes.func,
  onPressCancel: PropTypes.func,
  onPressSave: PropTypes.func,
  Note: PropTypes.string,
  IsSolidStartTime: PropTypes.bool,
  IsSolidDuration: PropTypes.bool,
  type: PropTypes.string,
  Name: PropTypes.string,
  HiddenNote: PropTypes.bool,
  isEdit: PropTypes.bool,
  activityName: PropTypes.string,
  isEat: PropTypes.string,
};

export default modalDuration;
