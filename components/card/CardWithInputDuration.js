import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import stylesGlobal from '../styles';

import { ButtonCircleWithIcon } from '../button/';
import { TextWarning } from '../text';

class CardWithInputDuration extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      Title,
      Decrement,
      Increment,
      value,
      subtext,
      textSize,
      subTextColor,
      sizeIcon,
      error,
      type,
      typeButton,
      disable = false,
      ...props
    } = this.props;

    let subTittle;
    const textStyles = [stylesGlobal.text16];
    const subtextStyles = [stylesGlobal.text12];
    if (textSize) {
      textStyles.push({ fontSize: textSize });
    }
    if (subTextColor) {
      subtextStyles.push({ color: subTextColor });
    }
    if (subtext != undefined)
      subTittle = (
        <Text style={[subtextStyles, stylesGlobal.textBold]}>{subtext}</Text>
      );
    let hour = Math.floor(value / 3600);
    let minute = Math.round((value % 3600) / 60);

    return (
      <View style={stylesGlobal.justifyContentCenter}>
        {/* <TextWarning show={true} textwarning={error} /> */}
        {typeButton == 'bottom' ? (
          <View style={[stylesGlobal.width100, styles.bottomMargin]}>
            <Text style={[textStyles, stylesGlobal.paddingBottom10]}>
              {Title}
            </Text>

            <View style={styles.rowAbleNoBorder}>
              {Decrement ? (
                <View style={stylesGlobal.width30}>
                  <ButtonCircleWithIcon
                    iconname="minus"
                    onPress={Decrement}
                    iconcolor={
                      disable
                        ? styles.$blacklightcolor
                        : styles.$blacklightcolor
                    }
                    disable={disable}
                    sizeicon={sizeIcon}
                  />
                </View>
              ) : null}

              <View style={[stylesGlobal.width40, stylesGlobal.center]}>
                <TextInput
                  {...props}
                  keyboardType="number-pad"
                  style={
                    disable
                      ? styles.textinputdurationDisable
                      : styles.textinputduration
                  }
                  value={`${value}`}
                />
              </View>

              {Increment ? (
                <View style={stylesGlobal.width30}>
                  <ButtonCircleWithIcon
                    iconname="plus"
                    onPress={Increment}
                    iconcolor={
                      disable
                        ? styles.$blacklightcolor
                        : styles.$blacklightcolor
                    }
                    disable={disable}
                    sizeicon={sizeIcon}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View
            style={[
              stylesGlobal.row100,
              styles.bottomMargin,
              stylesGlobal.justifyContentCenter,
            ]}
          >
            <View
              style={
                type == 'time' ? stylesGlobal.width30 : stylesGlobal.width50
              }
            >
              <Text style={textStyles}>{Title}</Text>
              {subTittle}
              <TextWarning
                show={true}
                textwarning={error}
                alignSelfText="flex-start"
              />
            </View>
            <View
              style={type == 'time' ? stylesGlobal.row70 : stylesGlobal.row50}
            >
              <View
                style={disable ? styles.rowDisable : styles.rowAbleNoBorder}
              >
                {Decrement ? (
                  <View style={styles.col30}>
                    <ButtonCircleWithIcon
                      iconname="minus"
                      onPress={Decrement}
                      iconcolor={
                        disable
                          ? styles.$blacklightcolor
                          : styles.$blacklightcolor
                      }
                      disable={disable}
                      sizeicon={sizeIcon}
                    />
                  </View>
                ) : null}

                {type == 'time' ? (
                  <View style={[stylesGlobal.width40, stylesGlobal.center]}>
                    <View style={[stylesGlobal.row100, stylesGlobal.center]}>
                      <TextInput
                        {...props}
                        keyboardType="number-pad"
                        style={styles.textinputduration}
                        value={`${hour}`}
                      />
                      <Text style={stylesGlobal.text12}>: </Text>
                      <TextInput
                        {...props}
                        keyboardType="number-pad"
                        style={styles.textinputduration}
                        value={`${minute}`}
                      />
                      <Text style={stylesGlobal.text12}> h</Text>
                    </View>
                  </View>
                ) : (
                  <View style={[stylesGlobal.width40, stylesGlobal.center]}>
                    <TextInput
                      {...props}
                      keyboardType="number-pad"
                      style={
                        disable
                          ? styles.textinputdurationDisable
                          : styles.textinputduration
                      }
                      value={`${value}`}
                    />
                  </View>
                )}

                {Increment ? (
                  <View style={styles.col30}>
                    <ButtonCircleWithIcon
                      iconname="plus"
                      onPress={Increment}
                      iconcolor={
                        disable
                          ? styles.$blacklightcolor
                          : styles.$blacklightcolor
                      }
                      disable={disable}
                      sizeicon={sizeIcon}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

CardWithInputDuration.propTypes = {
  Title: PropTypes.string,
  SubTitle: PropTypes.string,
  Decrement: PropTypes.func,
  Increment: PropTypes.func,
  onPress: PropTypes.func,
  sizeIcon: PropTypes.number,
  value: PropTypes.number,
  subtext: PropTypes.string,
  textSize: PropTypes.number,
  error: PropTypes.string,
  type: PropTypes.string,
  disable: PropTypes.bool,
  subTextColor: PropTypes.string,
  typeButton: PropTypes.string,
};

export default CardWithInputDuration;
