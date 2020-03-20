import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";
import PropTypes from "prop-types";
import stylesGlobal from "../../../../components/styles";
import { Card } from "../../../../components/card";
import { RoundedTextInput } from "../../../../components/textInput";
const segmentTourNote = props => {
  const { tourNote, onChangeText } = props;
  return (
    <Card widthCard="90%">
      <Text
        style={[
          stylesGlobal.paddingHorizontal20,
          styles.bold20,
          stylesGlobal.paddingTop20
        ]}
      >
        {`Notes (optional)`}
      </Text>

      <View
        style={[
          stylesGlobal.width100,
          stylesGlobal.paddingLeft10,
          stylesGlobal.paddingRight10,
          stylesGlobal.paddingTop10
        ]}
      >
        <RoundedTextInput
          marginBottom={20}
          multiline={true}
          textColor="black"
          containerWidth="100%"
          containerHeight={80}
          animated="hidden"
          placeholder="Have intruction or request about this tour for us?"
          value={tourNote}
          onChangeText={onChangeText}
        />
      </View>
    </Card>
  );
};

segmentTourNote.propTypes = {
  tourNote: PropTypes.string,
  onChangeText: PropTypes.func
};

export default segmentTourNote;
