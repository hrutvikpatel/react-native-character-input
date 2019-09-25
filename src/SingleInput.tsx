/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import * as Styles from './SingleInput.style';

export interface ITypeRef {
  focus: () => void;
  shake: () => void;
  clear: () => void;
};

enum InputType {
  Underlined = 'underlined',
  Outlined = 'outlined',
  Contained = 'contained'
};

export interface IInputStyle {
  inputType?: InputType,
  containerStyle?: StyleSheet.styles,
  inputStyle?: StyleSheet.styles,
  inputContainerStyle?: StyleSheet.styles,
  disabledInputStyle?: StyleSheet.styles,
  placeHolderTextColor?: StyleSheet.styles
}

export interface ISingleInputProps extends IInputStyle {
  value: string,
  placeHolder: string,
  show: boolean,
  keyboardType: any,
  index: number,
  // Specify the actual function signature
  onChange: Function,
  setRef: Function,
  onKeyPress: Function
}

const SingleInput: React.FunctionComponent<ISingleInputProps> = (props: ISingleInputProps) => {
  const getStyles = (type: InputType): StyleSheet.styles => {
    if (type === InputType.Outlined) return Styles.OutlinedStyles;
    else if (type === InputType.Contained) return Styles.ContainedStyles;
    return Styles.UnderlinedStyles;
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
        props.show ? {} : styles.hide
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
  inputType: InputType.Underlined,
  containerStyle: {},
  inputStyle: {},
  inputContainerStyle: {},
  disabledInputStyle: {}
}


export default SingleInput;
