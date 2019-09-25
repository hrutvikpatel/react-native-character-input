/* eslint-disable no-unused-vars */
import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import * as Styles from './SingleInput.style';

// interfaces always should be UpperCamelCase
// another convention that is popular with interfaces is to start their name with a capital I
// e.g. ITypeRef ... this way you know its an interface and not a concrete class in the code simply by reading it
export interface typeRef {
  focus: () => void;
  shake: () => void;
  clear: () => void;
};

// enum types should always be capitalized ... Underlined, Outlined, Contained
enum InputType { underlined, outlined, contained };

// IInputStyle
export interface InputStyle {
  inputType?: InputType,
  // StyleSheet.styles doesn't really mean anything...
  // kind of the equivalent to using "any" but for styles
  // try having a more concrete definition of the styles that you want to include.. a more strongly typed style guide
  // If I were a user using this interface I would have no idea what these variables are actually supposed to be
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
  // Specify the actual function signature
  onChange: Function,
  setRef: Function,
  onKeyPress: Function
}

const SingleInput: React.FunctionComponent<SingleInputProps> = (props: SingleInputProps) => {
  console.log(props);
  const getStyles = (type: InputType): StyleSheet.styles => {
    // no break statements in this switch statement... you can have a fallthrough
    // never use switch statements... it's a very bad programming practice due to fallthrough bugs
    switch (type) {
      case InputType.outlined: return Styles.outlinedStyles;
      case InputType.contained: return Styles.containedStyles;
      default: return Styles.underlinedStyles;
    }
  }

  const styles: StyleSheet.styles = getStyles(props.inputType!);

  console.log(props.inputStyle, props.index, styles);

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
