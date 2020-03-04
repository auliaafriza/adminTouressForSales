import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';
import iconCalender from '../../assets/Icon/calendar.png';
import iconUsers from '../../assets/Icon/users.png';
import PicEx from '../../assets/images/des1.jpg';
import { LinearGradient } from 'expo-linear-gradient';

const CardHeader = ({
  textjadwalstart,
  textjadwalend,
  textkouta,
  images,
  titletour,
  Commission,
  hargapax,
  currencies,
  onPress,
  type,
  textIntroducing,
  widthCard,
  titleIntro,
  descIntro,
}) => {
  const containerStyles = [styles.containerRecomendedCard];

  if (widthCard) {
    containerStyles.push({ width: widthCard });
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyles}>
        {type != 'introducing' ? (
          <Image source={{ uri: images }} style={styles.imageRecomended} />
        ) : (
          <Image source={PicEx} style={styles.imageRecomended} />
        )}

        <LinearGradient
          colors={['#05252525', '#252525', '#252525', '#252525', '#252525']}
          style={styles.overlayTitlemiddle}
        />

        {type != 'introducing' ? (
          <View>
            <View style={styles.containerInsideText}>
              <Text style={styles.text12BoldWhite}>From</Text>
              <Text style={styles.text16BoldGold}>
                {currencies} {hargapax}
              </Text>
            </View>
            <View style={styles.containerCommissionText}>
              <Text>
                <Text style={styles.textbold14white}>Commission</Text>
                <Text style={styles.text12BoldGold}>
                  {'  '}
                  {currencies} {Commission}
                </Text>
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.containerIntroducingText}>
            <Text style={styles.textbold16White}>{textIntroducing}</Text>
          </View>
        )}
      </View>

      <View style={styles.containerTitleText}>
        <Text style={[styles.textTitle]}>
          {type != 'introducing' ? titletour : titleIntro}
        </Text>

        {type != 'introducing' ? (
          <View>
            <View style={styles.containerSubtitleText}>
              <Image
                source={iconCalender}
                style={styles.subIcon}
                resizeMode="contain"
              />
              <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
                {'  '}
                {textjadwalstart} - {textjadwalend}
              </Text>
            </View>

            <View style={styles.containerSubtitleText}>
              <Image
                source={iconUsers}
                style={styles.subIcon}
                resizeMode="contain"
              />
              <Text>
                <Text
                  style={[
                    stylesGlobal.colorRed,
                    stylesGlobal.text16,
                    stylesGlobal.textBold,
                  ]}
                >
                  {'  '}
                  {textkouta}
                  {'  '}
                </Text>
                <Text
                  style={[
                    stylesGlobal.colorBlackLight,
                    stylesGlobal.text12,
                    stylesGlobal.textBold,
                  ]}
                >
                  Pax Left
                </Text>
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.containerTextIntroducing}>
            {descIntro.length > 100 ? (
              <Text style={styles.textIntroducingDesc}>
                {descIntro.slice(0, 100)} ...
              </Text>
            ) : (
              <Text style={styles.textIntroducingDesc}>{descIntro}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

CardHeader.propTypes = {
  textjadwalstart: PropTypes.string,
  textjadwalend: PropTypes.string,
  textkouta: PropTypes.number,
  images: PropTypes.string,
  bold: PropTypes.bool,
  titletour: PropTypes.string,
  hargapax: PropTypes.string,
  currencies: PropTypes.string,
  onPress: PropTypes.func,
  Commission: PropTypes.string,
  type: PropTypes.string,
  textIntroducing: PropTypes.string,
  widthCard: PropTypes.number,
  titleIntro: PropTypes.string,
  descIntro: PropTypes.string,
};

export default CardHeader;
