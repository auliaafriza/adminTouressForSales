import React from 'react';
import { View, Text } from 'react-native';
import { TextWithClearButton } from '../text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';

const CardWarning = ({
  heightContainer,
  widthContainer,
  title,
  subtitle,
  isi,
  sizeIcon,
}) => {
  const containerStyle = [styles.card];
  if (heightContainer) {
    containerStyle.push({ height: heightContainer });
  }
  if (widthContainer) {
    containerStyle.push({ width: widthContainer });
  }

  return (
    <View style={containerStyle}>
      <View style={[stylesGlobal.width90, stylesGlobal.rowNoPadding]}>
        {title == '' || title == null ? null : (
          <Icon
            name="info"
            size={sizeIcon ? sizeIcon : 30}
            color={styles.$goldcolor}
          />
        )}
        <Text style={styles.text16withMargin}>{title}</Text>
      </View>
      <View style={[stylesGlobal.width90, stylesGlobal.rowNoPadding]}>
        <Text style={styles.text16withMargin}>{subtitle}</Text>
      </View>
      <View style={[stylesGlobal.width90, stylesGlobal.rowNoPadding]}>
        <Text style={styles.textwrap}>{isi}</Text>
      </View>
      <View style={[stylesGlobal.width90, stylesGlobal.rowNoPadding]}>
        {isi != undefined ? (
          <TextWithClearButton
            text=""
            buttonText="Read More"
            buttonTextColor={styles.$goldcolor}
            bold
          />
        ) : null}
      </View>
    </View>
  );
};

CardWarning.propTypes = {
  heightContainer: PropTypes.number,
  widthContainer: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isi: PropTypes.string,
  sizeIcon: PropTypes.number,
};

export default CardWarning;
