import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Card from './Card';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';
import { RibbonGold } from '../ribbon';
import NOPIC from './../../assets/images/NoImage.png';
import { SeperatorRepeat } from '../list';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
const WalkthroughableView = walkthroughable(View);
class CardPackages extends Component {
  state = {
    show: 'other',
  };

  componentDidMount() {
    this.props.start();
  }

  render() {
    const {
      TourTitle,
      Price,
      Destination,
      Pax,
      StartDate,
      EndDate,
      Images,
      onPress,
      widthcontainer,
      heightcontainer,
      show,
      currencies,
      commission,
      label,
      duration,
    } = this.props;

    const containerstyle = [styles.containerCardView, styles.zeroPadding];
    if (heightcontainer) {
      containerstyle.push({ height: heightcontainer });
    }
    if (widthcontainer) {
      containerstyle.push({ width: widthcontainer });
    }

    return (
      <Card>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.row100, stylesGlobal.justifyContentCenter]}>
            {Images != undefined && Images != '' && (
              <View style={styles.containerImageTop}>
                <Image
                  source={{ uri: Images }}
                  resizeMode="cover"
                  style={styles.imageWidth100}
                />
              </View>
            )}
            {Images == undefined && (
              <View style={styles.containerImageTop}>
                <Image
                  source={NOPIC}
                  resizeMode="stretch"
                  style={styles.imageWidth100}
                />
              </View>
            )}
            {Images == '' && (
              <View style={styles.containerImageTop}>
                <Image
                  source={NOPIC}
                  resizeMode="stretch"
                  style={styles.imageWidth100}
                />
              </View>
            )}
            {show == 'Fixed' ? (
              this.props.index === 0 ? (
                <CopilotStep text="Commission for you" order={1} name="first">
                  <WalkthroughableView style={styles.containerCommission}>
                    <Text style={styles.text12White}>
                      Commission: {commission}
                      {this.props.index}
                    </Text>
                  </WalkthroughableView>
                </CopilotStep>
              ) : (
                <View style={styles.containerCommission}>
                  <Text style={styles.text12White}>
                    Commission: {commission}
                  </Text>
                </View>
              )
            ) : /* <View style={styles.containerCommission}>
                <Text style={styles.text12White}>Commission: {commission}</Text>
              </View> */
            null}
          </View>
          {label != '' ? (
            <RibbonGold
              label={label}
              color1="#fffd9b"
              color2={styles.$goldcolor}
              color3="#b2993d"
              color="#b2993d"
              colorFont="black"
              widthlabel={80}
            />
          ) : null}
          <Card type="Flat" topMargin={-30}>
            <View
              style={[
                stylesGlobal.paddingHorizontal20,
                stylesGlobal.paddingTop10,
              ]}
            >
              {show != 'Fixed' ? (
                this.props.index === 0 ? (
                  <CopilotStep text="Tour package name" order={2} name="second">
                    <WalkthroughableView
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom10,
                      ]}
                    >
                      <Text
                        style={[stylesGlobal.text18, stylesGlobal.textBold]}
                      >
                        {TourTitle}
                      </Text>
                    </WalkthroughableView>
                  </CopilotStep>
                ) : (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.paddingBottom10]}
                  >
                    <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
                      {TourTitle}
                    </Text>
                  </View>
                )
              ) : this.props.index === 0 ? (
                <CopilotStep
                  text="Destination and date of departure"
                  order={2}
                  name="second"
                >
                  <WalkthroughableView style={stylesGlobal.row100}>
                    <View style={stylesGlobal.width50}>
                      <Text style={styles.text12Grey}>{Destination}</Text>
                    </View>
                    <View style={styles.colNoPadding50Right}>
                      {show == 'Fixed' ? (
                        <Text style={styles.text12Grey}>
                          {StartDate} - {EndDate}
                        </Text>
                      ) : null}
                    </View>
                  </WalkthroughableView>
                </CopilotStep>
              ) : (
                <View style={stylesGlobal.row100}>
                  <View style={stylesGlobal.width50}>
                    <Text style={styles.text12Grey}>{Destination}</Text>
                  </View>
                  <View style={styles.colNoPadding50Right}>
                    {show == 'Fixed' ? (
                      <Text style={styles.text12Grey}>
                        {StartDate} - {EndDate}
                      </Text>
                    ) : null}
                  </View>
                </View>
              )}
              {show != 'Fixed' ? (
                show == 'Ready' ? (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.paddingBottom10]}
                  >
                    <Text style={[styles.text14Grey, stylesGlobal.textBold]}>
                      Destination :{' '}
                    </Text>
                    <Text style={styles.text14Grey}>{Destination}</Text>
                  </View>
                ) : (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.paddingBottom10]}
                  >
                    <View style={stylesGlobal.width50}>
                      <Text
                        style={[
                          styles.text16Grey,
                          stylesGlobal.textBold,
                          stylesGlobal.paddingBottom5,
                        ]}
                      >
                        Price
                      </Text>
                      <Text
                        style={[
                          styles.text18BoldGold,
                          stylesGlobal.paddingBottom5,
                        ]}
                      >
                        {currencies} {Price}
                      </Text>
                      <Text style={styles.text12Grey}>
                        Per pax on Twin Sharing
                      </Text>
                    </View>
                    <View style={stylesGlobal.width50}>
                      <View
                        style={[
                          stylesGlobal.row100,
                          stylesGlobal.paddingBottom10,
                        ]}
                      >
                        <View style={stylesGlobal.width50}>
                          <Text
                            style={[styles.text14Grey, stylesGlobal.textBold]}
                          >
                            Duration
                          </Text>
                        </View>
                        <View style={styles.colNoPadding50Right}>
                          <Text style={styles.text14Grey}>{duration} days</Text>
                        </View>
                      </View>

                      <Text
                        style={[
                          styles.text14Grey,
                          stylesGlobal.textBold,
                          stylesGlobal.paddingBottom5,
                        ]}
                      >
                        Destination
                      </Text>
                      <Text style={styles.text12Grey}>{Destination}</Text>
                    </View>
                  </View>
                )
              ) : this.props.index === 0 ? (
                <CopilotStep text="Tour package name " order={3} name="third">
                  <WalkthroughableView
                    style={[stylesGlobal.row100, stylesGlobal.paddingBottom10]}
                  >
                    <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
                      {TourTitle}
                    </Text>
                  </WalkthroughableView>
                </CopilotStep>
              ) : (
                <View
                  style={[stylesGlobal.row100, stylesGlobal.paddingBottom10]}
                >
                  <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
                    {TourTitle}
                  </Text>
                </View>
              )}
            </View>
            {show == 'Fixed' ? (
              <View style={stylesGlobal.hidden}>
                <SeperatorRepeat
                  marginNull={true}
                  widthsepar={8}
                  heightsepar={1}
                  colorsepar="#777"
                  repeat={31}
                />
              </View>
            ) : null}
            {show == 'Fixed' ? (
              <View
                style={[
                  stylesGlobal.row100,
                  stylesGlobal.paddingHorizontal20,
                  stylesGlobal.paddingBottom10,
                  stylesGlobal.paddingTop10,
                ]}
              >
                <View style={[styles.row100]}>
                  <View style={stylesGlobal.width50}>
                    <Text style={styles.text10}>From</Text>
                    <Text style={styles.text16BoldGold}>
                      {currencies} {Price}
                    </Text>
                    <Text style={styles.text10}>
                      Per Person on Twin Sharing
                    </Text>
                  </View>
                  <View
                    style={[styles.colNoPadding50Right, stylesGlobal.center]}
                  >
                    <Text>
                      <Text
                        style={[
                          stylesGlobal.colorRed,
                          stylesGlobal.text22,
                          stylesGlobal.textBold,
                        ]}
                      >
                        {Pax}{' '}
                      </Text>
                      <Text style={styles.textbold12}>pax left</Text>
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </Card>
        </TouchableOpacity>
      </Card>
    );
  }
}

CardPackages.propTypes = {
  TourTitle: PropTypes.string,
  TotalDays: PropTypes.number,
  Price: PropTypes.string,
  Destination: PropTypes.string,
  Pax: PropTypes.number,
  StartDate: PropTypes.string,
  EndDate: PropTypes.string,
  Images: PropTypes.string,

  onPress: PropTypes.func,
  widthcontainer: PropTypes.string,
  heightcontainer: PropTypes.number,
  show: PropTypes.string,
  currencies: PropTypes.string,
  commission: PropTypes.string,
  label: PropTypes.string,
  duration: PropTypes.string,
};

export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(CardPackages);
// export default CardPackages;
