/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from 'react-native-elements';

interface SingleInput {
  value: string,
  placeHolder: string,
  show: boolean,
  keyboardType: any,
  index: number,
  onChange: Function,
  setRef: Function,
  onKeyPress: Function,
  containerStyle?: object,
  inputStyle?: object,
  inputContainerStyle?: object,
  disabledInputStyle?: object
}

const SingleInput: React.SFC<SingleInput> = (props) => {
  return (
    <Input
      value={props.value}
      placeholder={props.placeHolder}
      placeholderTextColor="grey"
      containerStyle={[
          {
            backgroundColor: 'transparent',
            paddingBottom: 10,
            width: 30,
            alignSelf: 'center',
          },
          props.containerStyle
      ]}
      inputStyle={[
        {
          color: 'grey',
          fontSize: 20,
          fontWeight: 'bold',
          width: 24,
          textAlign: 'center',
          alignSelf: 'center',
        },
        props.inputStyle
      ]}
      inputContainerStyle={[
        {
          borderBottomWidth: 2,
          borderBottomColor: 'grey',
          width: 24,
          alignSelf: 'center',
        },
        props.inputContainerStyle,
        !props.show
          ? { borderBottomWidth: 0, paddingTop: 1, paddingBottom: 1 }
          : {},
      ]}
      disabledInputStyle={[
        { color: 'grey', fontWeight: 'bold' },
        props.disabledInputStyle,
      ]}


      onChangeText={(text) => props.onChange(props.index, text)}
      disabled={!props.show}
      ref={(ref) => props.setRef(props.index, ref)}
      selectTextOnFocus
      maxLength={1}
      keyboardType={props.keyboardType}
      onKeyPress={({ nativeEvent }) => props.onKeyPress(props.index, nativeEvent)}
    />
  );
};

SingleInput.defaultProps = {
  containerStyle: {},
  inputStyle: {},
  inputContainerStyle: {},
  disabledInputStyle: {}
}


export default SingleInput;
