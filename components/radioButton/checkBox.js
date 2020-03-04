import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../styles';
import { Seperator } from '../list';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

class checkBox extends Component {
  render() {
    const {
      Title,
      Desc,
      onPress,
      value,
      targetValue,
      position = 'kiri',
      showCardWarning = false,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.marginBottom30, stylesGlobal.width100]}
        onPress={onPress}
      >
        {position == 'kanan' ? (
          <View
            style={[
              styles.buttonContainerKanan,
              stylesGlobal.width100,
              stylesGlobal.paddingLeftRight10,
            ]}
          >
            <TouchableOpacity
              style={[stylesGlobal.width30, stylesGlobal.center]}
              onPress={onPress}
            >
              {targetValue == value ? (
                <Ionicons
                  name="md-checkbox-outline"
                  size={28}
                  color="#e6ca6b"
                />
              ) : (
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={28}
                  color="#e6ca6b"
                />
              )}
            </TouchableOpacity>
            <View style={[stylesGlobal.width70, styles.paddingLeft10]}>
              <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
                {Title}
              </Text>
              <Text style={[stylesGlobal.text12, stylesGlobal.marginBottom10]}>
                {Desc}
              </Text>
              {showCardWarning ? (
                <View style={styles.cardWarning}>
                  <View
                    style={[stylesGlobal.width100, stylesGlobal.rowPadding]}
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={15}
                      color="#aaa"
                    />
                    <Text
                      style={[
                        stylesGlobal.colorBlackLight,
                        stylesGlobal.text12,
                        stylesGlobal.paddingLeft5,
                      ]}
                    >
                      price of this amenities depends on the number of people
                      participating in it.
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.buttonContainer,
              stylesGlobal.width100,
              stylesGlobal.paddingLeftRight10,
            ]}
          >
            <View style={[stylesGlobal.width70, stylesGlobal.rowStart]}>
              <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
                {Title}
              </Text>
              <Text style={[stylesGlobal.text12, stylesGlobal.marginBottom10]}>
                {Desc}
              </Text>
              {showCardWarning ? (
                <View style={styles.cardWarning}>
                  <View
                    style={[stylesGlobal.width100, stylesGlobal.rowPadding]}
                  >
                    <Ionicons
                      name="md-information-circle-outline"
                      size={18}
                      color="#aaa"
                    />
                    <Text
                      style={[
                        stylesGlobal.colorBlackLight,
                        stylesGlobal.text12,
                        stylesGlobal.paddingLeft5,
                      ]}
                    >
                      price of this amenities depends on the number of people
                      participating in it.
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
            <View style={[stylesGlobal.width30, stylesGlobal.rowEnd]}>
              <TouchableOpacity
                style={[stylesGlobal.width100, stylesGlobal.center]}
                onPress={onPress}
              >
                {targetValue == value ? (
                  <Ionicons
                    name="md-checkbox-outline"
                    size={28}
                    color="#e6ca6b"
                  />
                ) : (
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={28}
                    color="#e6ca6b"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        {position == 'kanan' ? null : (
          <View
            style={[
              stylesGlobal.width100,
              stylesGlobal.paddingLeftRight10,
              stylesGlobal.center,
            ]}
          >
            <Seperator
              colorSepar={styles.$borderColor}
              widthsepar="100%"
              heightSepar={1}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

checkBox.propTypes = {
  Title: PropTypes.string,
  Desc: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.string,
  targetValue: PropTypes.string,
  position: PropTypes.string,
  showCardWarning: PropTypes.bool,
};

export default checkBox;
