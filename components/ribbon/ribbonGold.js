import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const ribbonGold = ({
  heightlabel,
  widthlabel,
  colorlabel,
  label,
  leftposition,
  topposition,
  sizefont,
  color,
  color1,
  color2,
  color3,
  colorFont,
  packageList
}) => {
  const labelstyle = [styles.labelcontainer];
  if (heightlabel) {
    labelstyle.push({ height: heightlabel });
  }
  if (widthlabel) {
    labelstyle.push({ width: widthlabel });
  }
  if (colorlabel) {
    labelstyle.push({ backgroundColor: colorlabel });
  }
  if (leftposition) {
    labelstyle.push({ left: leftposition });
  }
  if (topposition) {
    labelstyle.push({ top: topposition });
  }

  const triangleStyle = [styles.labelcontainerParallelogram];
  if (color) {
    triangleStyle.push({ borderRightColor: color });
    triangleStyle.push({ borderTopColor: color });
  }

  const textstyle = [styles.text];
  if (sizefont) {
    textstyle.push({ fontSize: sizefont });
  }
  if (colorFont) {
    textstyle.push({ color: colorFont });
  }
  return (
    <LinearGradient
      colors={[color1, color2, color3]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={packageList ? styles.ribbonPackageList : styles.ribbonBooking}
    >
      <Text style={textstyle}>{label}</Text>
    </LinearGradient>
  );
};

ribbonGold.propTypes = {
  heightlabel: PropTypes.number,
  widthlabel: PropTypes.number,
  colorlabel: PropTypes.string,
  label: PropTypes.string,
  sizefont: PropTypes.number,
  leftposition: PropTypes.number,
  topposition: PropTypes.number,
  color: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
  color3: PropTypes.string,
  colorFont: PropTypes.string
};

export default ribbonGold;

// <View>
// <View style={stylesGlobal.rowNoPadding}>
//   <View style={labelstyle}>
//     <LinearGradient
//       colors={[color1, color2, color3]}
//       style={styles.linerContainer}
//       start={{ x: 0, y: 1 }}
//       end={{ x: 1, y: 1 }}
//     />
//     <Text style={textstyle}> {label}</Text>
//   </View>
// </View>
// <View style={[styles.top20, stylesGlobal.rowNoPadding]}>
//   <View style={triangleStyle} />
// </View>
// </View>
