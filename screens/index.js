import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import store from "../config/store";
import { Provider } from "react-redux";
import Navigator from "./HomeScreen/HomeScreen";
// import Navigator from './navigation/index';

EStyleSheet.build({
  //global
  $blacklight: "#252525",
  $blacklight3: "#353535",
  $blacklight4: "#454545",
  $black: "#010101",
  // $gold: "#e6ca6b",
  $gold: "#38AF95",
  $goldlight: "#ffd734",
  $sandlight: "#faf4e1",
  // $background: '#fbfbfb',
  $background: "#ffffff",
  $greylight: "#efefef",
  $greylight2: "#d3d3d3",
  $red: "#f44336",
  $cardoverlay: "rgba(230,202,107,0.3)",
  $cardWarningOverlay: "rgba(255,61,61,0.3)",
  $lightgold: "#fffd9b",
  $darkgold: "#b2993d",
  $blacklight2: "rgba(90, 90, 90, 0.2)",
  $greenpayment: "#4caf50",
  $lightgrey1: "rgba(37, 37, 37, 0.5)",

  //splashscreen:
  $colorTextCard: "rgba(0, 0, 0, 0.87)",
  $overlayColor: "rgba(56,175,149,0.7)",
  $green: "#38af95",

  $lightGrey: "#ccc",
  $darkGrey: "#666",
  $darkGrey1: "#777",
  $lightGrey2: "#b2b2b2",
  $lightGreen: "#2ecc71",

  //card:
  $whitelight: "#fefefe",
  $iosShadow: "#d8d8d8",

  //list separator:
  $layColorList: "#E2E2E2",

  //account:
  $Grey: "#aaa",

  //overlay:
  $coloroverlay: "rgba(0, 0, 0, 0.5)",
  $disabel: "#eee",
  $greenDisabel: "rgba(0,150,136,0.5)",
  $whitelightdark: "rgba(229,229,229,0.45)",
  $redDisabel: "rgba(255,61,61,0.5)",

  $primaryBlue: "#4F6D7A",
  $primaryOrange: "#D57166",
  $primaryGreen: "#00BD9D",
  $primaryPurple: "#9E768F",
  $white: "#fff",
  $inputText: "#797979",
  $border: "#E2E2E2E2",
  $lightGray: "#F0F0F0",
  $darkText: "#343434",
  $textnote: "#d3d3d3",
  $softblue: "#6b82e6",

  //icon:
  $greenFreetime: "#009688",
  $darkBlue: "#3f51b5",
  $bluePrimary: "#2196f3",
  $greenExcrution: "#8bc34a",
  $greenIcon: "#4fff3d",
  $orangeResto: "#ff9800",
  $greyTrip: "#9e9e9e",
  $darkBlue1: "#311b92",
  $yellow: "#ffc107",
  $queueColor: "#b1b37c",

  //tintColor:
  $tintColor: "#777777"
});

const App = () => (
  <Provider store={store}>
    <Navigator onNavigationStateChange={null} />
    {/* <Navigator /> */}
  </Provider>
);

export default App;
