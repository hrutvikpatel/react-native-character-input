/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import * as Styles from './assets/styles/SingleInput.style';

export enum InputType {
  Underlined = 'underlined',
  Outlined = 'outlined',
  Contained = 'contained'
};

export interface ITypeRef {
  focus: () => void;
  shake: () => void;
  clear: () => void;
};

export interface IInputStyle {
  inputType?: InputType,
  containerStyle?: StyleSheet.styles,
  inputStyle?: StyleSheet.styles,
  inputContainerStyle?: StyleSheet.styles,
  placeHolderTextColor?: StyleSheet.styles,
  autoFocus: boolean,
};

export interface ISingleInput extends IInputStyle {
  value: string,
  placeHolder: string,
  keyboardType: any,
  index: number,
  onChange: (inputPos: number, char: string) => void,
  setInputRef: (inputPos: number, inputRef: ITypeRef) => void,
  onKeyPress: (inputPos: number, event: any, inputValue: string) => void,
  clearInputOnFocus: (inputPos: number) => void
}

export const SingleInput: React.FunctionComponent<ISingleInput> = (props: ISingleInput) => {
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
      ]}
      onKeyPress={({nativeEvent}: any) => props.onKeyPress(props.index, nativeEvent, props.value)}
      onChangeText={(text: string) => props.onChange(props.index, text)}
      ref={(ref: any) => props.setInputRef(props.index, ref)}
      maxLength={1}
      keyboardType={props.keyboardType}
      onFocus={() => props.clearInputOnFocus(props.index)}
      autoFocus={props.autoFocus}
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
