/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import * as Styles from './SingleInput.style';

export interface typeRef {
  focus: () => void;
  shake: () => void;
  clear: () => void;
};

enum InputType { underlined, outlined, contained };

export interface InputStyle {
  inputType?: InputType,
  containerStyle?: StyleSheet.styles,
  inputStyle?: StyleSheet.styles,
  inputContainerStyle?: StyleSheet.styles,
  disabledInputStyle?: StyleSheet.styles,
  placeHolderTextColor?: StyleSheet.styles
}

export interface SingleInputProps extends InputStyle {
  value: string,
  placeHolder: string,
  show: boolean,
  keyboardType: any,
  index: number,
  onChange: Function,
  setRef: Function,
  onKeyPress: Function
}

const SingleInput: React.FunctionComponent<SingleInputProps> = (props) => {

  const getStyles = (type: InputType): StyleSheet.styles => {
    switch (type) {
      case InputType.outlined: return Styles.outlinedStyles;
      case InputType.contained: return Styles.containedStyles;
      default: return Styles.underlinedStyles;
    }
  }

  const styles: StyleSheet.styles = getStyles(props.inputType!);

  return (
    <Input
      value={props.value}
      placeholder={props.placeHolder}
      placeholderTextColor={props.placeHolderTextColor ? props.placeHolderTextColor: "grey"}
      containerStyle={[ styles.containerStyle, props.containerStyle ]}
      inputStyle={[ styles.inputStyle, props.inputStyle ]}
      inputContainerStyle={[ 
        styles.inputContainerStyle,
        props.inputContainerStyle,
        props.show ? styles.hide : {},
      ]}
      disabledInputStyle={[ styles.disabledInputStyle, props.disabledInputStyle ]}
      
      onChangeText={(text: string) => props.onChange(props.index, text)}
      disabled={!props.show}
      ref={(ref: any) => props.setRef(props.index, ref)}
      maxLength={1}
      keyboardType={props.keyboardType}
      onKeyPress={(nativeEvent: any) => props.onKeyPress(props.index, nativeEvent)}
    />
  );
};

SingleInput.defaultProps = {
  keyboardType: 'default',
  inputType: InputType.underlined,
  containerStyle: {},
  inputStyle: {},
  inputContainerStyle: {},
  disabledInputStyle: {}
}


export default SingleInput;
