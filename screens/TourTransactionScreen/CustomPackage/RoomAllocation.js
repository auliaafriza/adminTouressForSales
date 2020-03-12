import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  ScrollView,
  BackHandler,
  Platform,
  Alert,
  TouchableOpacity
} from "react-native";
import { Container } from "../../../components/container";
import styles from "./styles";
import stylesGlobal from "../../../components/styles";
import { CardWithInputDuration, Card } from "../../../components/card";
import { NormalButton } from "../../../components/button";
import { SeperatorRepeat } from "../../../components/list";
import { connect } from "react-redux";
import { stringAllocation } from "../../../helper/helper";
import { LinearGradient } from "expo-linear-gradient";
export default class roomAllocation extends Component {
  constructor(props) {
    super(props);
    let RoomAlloc = this.props.route.params.RoomAlloc;
    this.state = {
      Allocation: {
        SharingRoomQty: RoomAlloc.SharingRoomQty,
        ChildSharingRoomQty: RoomAlloc.ChildSharingRoomQty,
        SingleRoomQty: RoomAlloc.SingleRoomQty,
        ChildSingleRoomQty: RoomAlloc.ChildSingleRoomQty,
        ExtraBedQty: RoomAlloc.ExtraBedQty,
        ChildExtraBedQty: RoomAlloc.ChildExtraBedQty,
        SharingBedQty: RoomAlloc.SharingBedQty,
        BabyCrib: RoomAlloc.BabyCrib,
        NoBed: RoomAlloc.NoBed,
        StringAlloc: null,
        Qty: RoomAlloc.Qty,
        Description: RoomAlloc.Description
      },
      Guest: this.props.route.params.Guest,
      Travel: this.props.route.params.Travel
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
  }

  guestAlloc = () => {
    return (
      this.state.Allocation.SharingRoomQty +
      this.state.Allocation.ChildSharingRoomQty +
      this.state.Allocation.SingleRoomQty +
      this.state.Allocation.ChildSingleRoomQty +
      this.state.Allocation.ExtraBedQty +
      this.state.Allocation.ChildExtraBedQty +
      this.state.Allocation.SharingBedQty +
      this.state.Allocation.BabyCrib +
      this.state.Allocation.NoBed
    );
  };

  guestRemaining = () => {
    return (
      this.state.Guest.Adult +
      this.state.Guest.Child +
      this.state.Guest.Infant -
      this.guestAlloc()
    );
  };

  adultRemaining = () => {
    return (
      this.state.Guest.Adult -
      (this.state.Allocation.SingleRoomQty +
        this.state.Allocation.SharingRoomQty +
        this.state.Allocation.ExtraBedQty)
    );
  };

  focRemaining = () => {
    return this.state.Guest.Adult - this.state.Allocation.Qty;
  };

  childRemaining = () => {
    return (
      this.state.Guest.Child -
      (this.state.Allocation.ChildExtraBedQty +
        this.state.Allocation.ChildSharingRoomQty +
        this.state.Allocation.ChildSingleRoomQty +
        this.state.Allocation.SharingBedQty)
    );
  };

  infantRemaining = () => {
    return (
      this.state.Guest.Infant -
      (this.state.Allocation.NoBed + this.state.Allocation.BabyCrib)
    );
  };

  handleResult = data => {
    let guest =
      this.state.Guest.Adult +
      this.state.Guest.Child +
      this.state.Guest.Infant -
      this.guestAlloc();
    if (guest == 0) {
      this.setState(
        {
          Allocation: {
            ...this.state.Allocation,
            StringAlloc: stringAllocation(data)
          }
        },
        () => {
          if (this.guestRemaining() == 0) {
            this.props.navigation.pop();
            this.props.route.params.onSelect(this.state.Allocation);
          }
        }
      );
    } else {
      let textGuest = guest + " guests";
      Alert.alert("You have allocated", textGuest, [{ text: "OK" }]);
    }
  };

  render() {
    return (
      <Container>
        <ScrollView style={[styles.containerScroll, styles.paddingTop20]}>
          <Container color={styles.$whitelightcolor}>
            <Card widthCard="90%">
              <Text
                style={[
                  styles.colPadding20,
                  styles.bold20,
                  styles.paddingTop15
                ]}
              >
                Adult {this.props.route.params.otherParams}
              </Text>
              <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                <SeperatorRepeat
                  repeat={31}
                  widthsepar={8}
                  heightSepar={1}
                  colorSepar="#777"
                />
              </View>
              <View style={styles.padding}>
                <CardWithInputDuration
                  Title="Sharing Room"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.SharingRoomQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.adultRemaining())
                      text = this.adultRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        SharingRoomQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.SharingRoomQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          SharingRoomQty:
                            this.state.Allocation.SharingRoomQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.adultRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          SharingRoomQty:
                            this.state.Allocation.SharingRoomQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                <CardWithInputDuration
                  Title="Single Room"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.SingleRoomQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.adultRemaining())
                      text = this.adultRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        SingleRoomQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.SingleRoomQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          SingleRoomQty: this.state.Allocation.SingleRoomQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.adultRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          SingleRoomQty: this.state.Allocation.SingleRoomQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                <CardWithInputDuration
                  Title="Extra Bed"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.ExtraBedQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.adultRemaining())
                      text = this.adultRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        ExtraBedQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.ExtraBedQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ExtraBedQty: this.state.Allocation.ExtraBedQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.adultRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ExtraBedQty: this.state.Allocation.ExtraBedQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                {this.state.Travel == "LARGE" ? (
                  <CardWithInputDuration
                    Title="Free of charge"
                    sizeIcon={18}
                    textSize={16}
                    value={this.state.Allocation.Qty}
                    onChangeText={text => {
                      if (isNaN(parseInt(text))) text = 0;
                      if (text > this.state.Guest.Adult)
                        text = this.state.Guest.Adult - 1;
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          Qty: parseInt(text)
                        }
                      });
                    }}
                    Decrement={() => {
                      if (this.state.Allocation.Qty != 0)
                        this.setState({
                          Allocation: {
                            ...this.state.Allocation,
                            Qty: this.state.Allocation.Qty - 1
                          }
                        });
                    }}
                    Increment={() => {
                      if (this.focRemaining() > 1)
                        this.setState({
                          Allocation: {
                            ...this.state.Allocation,
                            Qty: this.state.Allocation.Qty + 1
                          }
                        });
                    }}
                    widthCard="100%"
                    heightCard="30%"
                  />
                ) : null}
              </View>
            </Card>
            <Card widthCard="90%">
              <Text
                style={[
                  styles.colPadding20,
                  styles.bold20,
                  styles.paddingTop15
                ]}
              >
                Child
              </Text>
              <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                <SeperatorRepeat
                  repeat={31}
                  widthsepar={8}
                  heightSepar={1}
                  colorSepar="#777"
                />
              </View>
              <View style={styles.padding}>
                <CardWithInputDuration
                  Title="Sharing Room"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.ChildSharingRoomQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.childRemaining())
                      text = this.childRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        ChildSharingRoomQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.ChildSharingRoomQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ChildSharingRoomQty:
                            this.state.Allocation.ChildSharingRoomQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.childRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ChildSharingRoomQty:
                            this.state.Allocation.ChildSharingRoomQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                <CardWithInputDuration
                  Title="Single Room"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.ChildSingleRoomQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.childRemaining())
                      text = this.childRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        ChildSingleRoomQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.ChildSingleRoomQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ChildSingleRoomQty:
                            this.state.Allocation.ChildSingleRoomQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.childRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ChildSingleRoomQty:
                            this.state.Allocation.ChildSingleRoomQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                <CardWithInputDuration
                  Title="Extra Bed"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.ChildExtraBedQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.childRemaining())
                      text = this.childRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        ChildExtraBedQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.ChildExtraBedQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ChildExtraBedQty:
                            this.state.Allocation.ChildExtraBedQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.childRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          ChildExtraBedQty:
                            this.state.Allocation.ChildExtraBedQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                <CardWithInputDuration
                  Title="Sharing Bed"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.SharingBedQty}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.childRemaining())
                      text = this.childRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        SharingBedQty: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.SharingBedQty != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          SharingBedQty: this.state.Allocation.SharingBedQty - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.childRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          SharingBedQty: this.state.Allocation.SharingBedQty + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
              </View>
            </Card>
            <Card widthCard="90%">
              <Text
                style={[
                  styles.colPadding20,
                  styles.bold20,
                  styles.paddingTop15
                ]}
              >
                Infant
              </Text>
              <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                <SeperatorRepeat
                  repeat={31}
                  widthsepar={8}
                  heightSepar={1}
                  colorSepar="#777"
                />
              </View>
              <View style={styles.padding}>
                <CardWithInputDuration
                  Title="Baby Crib"
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.BabyCrib}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.infantRemaining())
                      text = this.infantRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        BabyCrib: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.BabyCrib != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          BabyCrib: this.state.Allocation.BabyCrib - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.infantRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          BabyCrib: this.state.Allocation.BabyCrib + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
                <CardWithInputDuration
                  Title="No Bed "
                  sizeIcon={18}
                  textSize={16}
                  value={this.state.Allocation.NoBed}
                  onChangeText={text => {
                    if (isNaN(parseInt(text))) text = 0;
                    if (text > this.infantRemaining())
                      text = this.infantRemaining();
                    this.setState({
                      Allocation: {
                        ...this.state.Allocation,
                        NoBed: parseInt(text)
                      }
                    });
                  }}
                  Decrement={() => {
                    if (this.state.Allocation.NoBed != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          NoBed: this.state.Allocation.NoBed - 1
                        }
                      });
                  }}
                  Increment={() => {
                    if (this.infantRemaining() != 0)
                      this.setState({
                        Allocation: {
                          ...this.state.Allocation,
                          NoBed: this.state.Allocation.NoBed + 1
                        }
                      });
                  }}
                  widthCard="100%"
                  heightCard="30%"
                />
              </View>
            </Card>
            <View style={[styles.padding, styles.marginBottom20]}>
              <View style={stylesGlobal.row100}>
                <Text style={styles.textblack15}>You have allocated </Text>
                <Text style={[styles.textblack15, stylesGlobal.textBold]}>
                  {this.guestAlloc()}{" "}
                </Text>
                <Text style={styles.textblack15}>guest out of </Text>
                <Text style={[styles.textblack15, stylesGlobal.textBold]}>
                  {this.guestRemaining()}
                </Text>
                <Text style={styles.textblack15}> from </Text>
              </View>
              <View style={stylesGlobal.row100}>
                <Text style={styles.textblack15}>
                  {this.state.Guest.Adult} adult(s), {this.state.Guest.Child}{" "}
                  children(s) and {this.state.Guest.Infant} infant(s)
                </Text>
              </View>
            </View>
          </Container>
        </ScrollView>

        <TouchableOpacity
          style={[styles.footer, styles.bottom0]}
          onPress={() => this.handleResult(this.state.Allocation)}
        >
          <LinearGradient
            colors={[styles.$goldcolor, styles.$goldlightcolor]}
            style={[styles.footer, styles.bottom0]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="DONE"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={() => this.handleResult(this.state.Allocation)}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

// const mapStateToProps = () => ({});

// export default connect(mapStateToProps)(roomAllocation);
// import * as React from "react";
// import { View, Text, Button } from "react-native";

// function DetailsScreen({ route, navigation }) {
//   /* 2. Get the param */
//   const { itemId } = route.params;
//   const { otherParam } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Text>itemId: {JSON.stringify(itemId)}</Text>
//       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() =>
//           navigation.push("Details", {
//             itemId: Math.floor(Math.random() * 100)
//           })
//         }
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }
// export default DetailsScreen;

// import React, { Component } from "react";
// import { View, Text, Button } from "react-native";

// export default class guestList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       itemId: this.props.route.params.itemId,
//       otherParam: this.props.route.params.otherParam
//     };
//   }

//   render() {
//     const { itemId, otherParam } = this.state;
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Details Screen</Text>
//         <Text>itemId: {JSON.stringify(itemId)}</Text>
//         <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//         <Button
//           title="Go to Details... again"
//           onPress={() =>
//             navigation.push("Details", {
//               itemId: Math.floor(Math.random() * 100)
//             })
//           }
//         />
//         <Button
//           title="Go to Home"
//           onPress={() => navigation.navigate("Home")}
//         />
//         <Button title="Go back" onPress={() => navigation.goBack()} />
//       </View>
//     );
//   }
// }
