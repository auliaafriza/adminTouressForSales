import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../../../../../components/styles';
import { connect } from 'react-redux';
import { RoundedTextInput } from '../../../../../components/textInput';
import { Seperator } from '../../../../../components/list';
import { convertRoundPrice } from '../../../../../helper/helper';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardWithInputDuration, Card } from '../../../../../components/card';
import { NormalButton } from '../../../../../components/button';
import { setSpecialAdjusmentAction } from '../../../../../actions/Transactions/TransactionAction';
class specialAdjusmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAdjusment: this.props.route.params.data,
    };
  }
  // static propTypes = {
  //   DemoPrice: PropTypes.object,
  //   navigation: PropTypes.object
  // };

  handleRemoveSpecialAdjusment = index => {
    const { listAdjusment } = this.state;
    let data = listAdjusment[index];
    data['ActionType'] = 3;
    listAdjusment[index] = data;
    this.setState(listAdjusment);
    this.props.setSpecialAdjusmentAction(listAdjusment);
  };

  handleAddSpecialAdjusment = () => {
    const { listAdjusment } = this.state;
    let data = {
      Id: 0,
      TourTransactionId: '',
      ActionType: 1,
      Description: '',
      Qty: 0,
      UnitCost: 0,
      CurrencyId: 'IDR',
      IsHiddenData: false,
    };
    listAdjusment.push(data);
    this.setState({ listAdjusment });
    this.props.setSpecialAdjusmentAction(listAdjusment);
  };
  handleEditSpecialAdjusment = (index, value, name) => {
    let { listAdjusment } = this.state;
    let data = listAdjusment[index];
    data[name] = value;
    data['ActionType'] = 2;
    listAdjusment[index] = data;
    this.setState(listAdjusment);
    this.props.setSpecialAdjusmentAction(listAdjusment);
  };

  handleDecrease = index => {
    let { listAdjusment } = this.state;
    let data = listAdjusment[index];
    let total = data.Qty - 1;
    data['Qty'] = total;
    listAdjusment[index] = data;
    this.setState(listAdjusment);
    this.props.setSpecialAdjusmentAction(listAdjusment);
  };
  handleIncrease = index => {
    let { listAdjusment } = this.state;
    let data = listAdjusment[index];
    let total = data.Qty + 1;
    data['Qty'] = total;
    listAdjusment[index] = data;
    this.setState(listAdjusment);
    this.props.setSpecialAdjusmentAction(listAdjusment);
  };
  handleCheckBox = (index, name, value) => {
    let { listAdjusment } = this.state;
    let data = listAdjusment[index];
    if (name === 'IsHiddenData') {
      data['IsHiddenData'] = !data.IsHiddenData;
    } else if (name === 'Deduction') {
      // let unitCost = data.UnitCost
      data['UnitCost'] = data.UnitCost * -1;
      // if (data < 1) {
      //   data['UnitCost'] = data.UnitCost * -1;
      // } else {
      //   data['UnitCost'] = -Math.abs(data.UnitCost);
      // }
    }
    listAdjusment[index] = data;
    this.setState(listAdjusment);
    this.props.setSpecialAdjusmentAction(listAdjusment);
  };

  render() {
    const { listAdjusment } = this.state;
    return (
      <ScrollView style={stylesGlobal.paddingHorizontal20}>
        {listAdjusment
          ? listAdjusment.map((data, i) => {
              return (
                data.ActionType !== 3 && (
                  <View>
                    <View
                      style={[
                        stylesGlobal.alignItemsEnd,
                        ,
                        stylesGlobal.paddingTop10,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => this.handleRemoveSpecialAdjusment(i)}
                      >
                        <Text style={[styles.bold16red]}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={[styles.rowNoPadding, stylesGlobal.paddingTop5]}
                    >
                      <RoundedTextInput
                        label="Name"
                        textColor="black"
                        containerWidth="100%"
                        placeholder="Enter Name"
                        value={data.Description}
                        containerPadding={0}
                        animated="hidden"
                        onChangeText={text =>
                          this.handleEditSpecialAdjusment(
                            i,
                            text,
                            'Description'
                          )
                        }
                      />
                    </View>
                    <View
                      style={[styles.rowNoPadding, stylesGlobal.paddingTop5]}
                    >
                      <View style={styles.col50}>
                        <CardWithInputDuration
                          Title="Quantity"
                          sizeIcon={18}
                          textSize={16}
                          Decrement={() => this.handleDecrease(i)}
                          Increment={() => this.handleIncrease(i)}
                          value={data.Qty}
                          widthCard="100%"
                          heightCard="30%"
                          typeButton="bottom"
                        />
                      </View>
                      <View style={[styles.col50, stylesGlobal.alignItemsEnd]}>
                        <RoundedTextInput
                          label="Currency"
                          textColor="black"
                          containerWidth="90%"
                          value={data.CurrencyId}
                          containerPadding={0}
                          animated="hidden"
                          disableInput="disable"
                          // onChangeText={onChangeTextNote}
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.rowNoPadding, stylesGlobal.paddingTop10]}
                    >
                      <RoundedTextInput
                        label="Unit Cost"
                        textColor="black"
                        containerWidth="100%"
                        placeholder="Enter Unit Cost"
                        value={Math.abs(data.UnitCost).toString()}
                        containerPadding={0}
                        animated="hidden"
                        onChangeText={text =>
                          this.handleEditSpecialAdjusment(i, text, 'UnitCost')
                        }
                      />
                    </View>
                    <View style={[styles.rowNoPadding]}>
                      <View style={styles.col50}>
                        <CheckBox
                          onPress={checkBox =>
                            this.handleCheckBox(i, 'Deduction', checkBox)
                          }
                          checked={
                            Math.sign(data.UnitCost) === -1 ? true : false
                          }
                          title="Deduction cost"
                          containerStyle={styles.checkBoxStyle}
                          textStyle={[
                            stylesGlobal.text11,
                            stylesGlobal.center,
                            stylesGlobal.colorBlackLight,
                          ]}
                        />
                      </View>
                      <View style={[styles.col50, stylesGlobal.alignItemsEnd]}>
                        <CheckBox
                          // iconRight
                          onPress={() => this.handleCheckBox(i, 'IsHiddenData')}
                          checked={data.IsHiddenData}
                          title="Hide this special adjustment"
                          containerStyle={styles.checkBoxStyle}
                          textStyle={[
                            stylesGlobal.text11,
                            stylesGlobal.center,
                            stylesGlobal.colorBlackLight,
                          ]}
                        />
                      </View>
                    </View>
                    <Seperator />
                  </View>
                )
              );
            })
          : null}
        <View
          style={[
            stylesGlobal.alignItemsCenter,
            stylesGlobal.paddingVertical20,
          ]}
        >
          <NormalButton
            text="Add more special adjustment"
            buttonWidth="70%"
            buttonHeight={40}
            bold
            buttonColor={styles.$goldcolor}
            textColor="white"
            onPress={this.handleAddSpecialAdjusment}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  setSpecialAdjusment: state.transactionReducer.setSpecialAdjusment,
});

export default connect(mapStateToProps, { setSpecialAdjusmentAction })(
  specialAdjusmentDetail
);

// export default specialAdjusmentDetail;
