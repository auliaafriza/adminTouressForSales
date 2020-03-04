import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  InteractionManager,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const w = Dimensions.get('window').width;
let scrollValue = 0;
class CarouselImage extends Component {
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let i = 0;
      this.setInterval(i);
    });
  }

  setInterval = i => (
    () => {
      if (w > 0) {
        if (i > 2) {
          i = -1;
        }
        i++;
        scrollValue = w * i;
        this.scroller.scrollTo({ x: scrollValue, y: 0, animated: true });
      }
    },
    5000
  );

  render() {
    const { images } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scroller => {
              this.scroller = scroller;
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            style={styles.imageHeight}
          >
            {images.map((image, i) => (
              <TouchableWithoutFeedback key={i}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${image.ImageUrl}?w=${w.width *
                      2}&buster=${Math.random()}`,
                  }}
                  resizeMode="cover"
                />
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

CarouselImage.propTypes = {
  images: PropTypes.array,
};

export default CarouselImage;
