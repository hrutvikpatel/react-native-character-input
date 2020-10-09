import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SingleInput, { ITypeRef, IInputStyle } from './SingleInput';

export enum MoveType {
  Forward,
  Back
};

// reexport in index
export interface ICharacterInput extends IInputStyle {
  placeHolder: string,
  showCharBinary: string,
  handleChange: (value: string) => void,
  keyboardType?: string,
  permenantTextStyle?: StyleSheet.styles,
  autoFocus?: boolean,
}


export const CharacterInput: React.FunctionComponent<ICharacterInput> = (props: ICharacterInput) => {
  if (props.placeHolder.length !== props.showCharBinary.length)
    throw 'Length of placeHolder and showCharBinary strings must be the same';

  const inputLength: number = props.placeHolder.length;
  const placeHolderCharArray: string[] = props.placeHolder.split('');
  const [value, setValue] = React.useState<string[]>(Array(inputLength).fill(''));
  const showChar: string[] = props.showCharBinary.split('');
  const singleInputRef: ITypeRef[] = [];

  const findFirstInputIndex = () => {
    for (let i = 0; i < showChar.length; i++) {
      if (showChar[i] === '1') {
        return i;
      }
    }

    return -1;
  };

  React.useEffect(() => {
    props.handleChange(value.join(''));
  }, [value]);

  const updateChangedChar = (index: number, char: string): void => {
    const temp: string[] = [...value];
    temp[index] = char;
    setValue(temp);
  };

  const traverseInputs = (moveType: MoveType, charPos: number): void => {
    if (moveType === MoveType.Forward) {
      if (charPos === inputLength - 1) {
        singleInputRef[charPos].shake();
      }
      else if (charPos >= 0 && charPos < inputLength - 1 && showChar[charPos + 1] === '1') {
        singleInputRef[charPos + 1].focus();
      }
      else if (charPos + 1 < inputLength - 1) {
        traverseInputs(MoveType.Forward, charPos + 1);
      }
    }
    else if (moveType === MoveType.Back) {
      if (charPos === 0) {
        singleInputRef[charPos].shake();
      }
      else if (charPos > 0 && charPos <= inputLength - 1 && showChar[charPos - 1] === '1') {
        singleInputRef[charPos - 1].focus();
      }
      else if (charPos - 1 > 0) {
        traverseInputs(MoveType.Back, charPos - 1);
      }
    }
  };

  const onChange = (inputPos: number, char: string): void => {
    if (char.length === 1) {
      traverseInputs(MoveType.Forward, inputPos);
      updateChangedChar(inputPos, char);
    }
    else if (char.length > 1) {
      singleInputRef[inputPos].shake();
    }
  };

  const setInputRef = (inputPos: number, inputRef: ITypeRef): void => {
    singleInputRef[inputPos] = inputRef;
    
    // if (props.autoFocus) {
    //   for (let i = 0; i < showChar.length; i++) {
    //     const isFirstInput = showChar[i] === '1' && i === inputPos && inputRef;
    //     if (isFirstInput) {
    //       singleInputRef[inputPos].focus();
    //       break;
    //     }
    //   }
    // }
  };

  const onKeyPress = (inputPos: number, event: any, inputValue: string): void => {
    if (event.key === 'Backspace') {
      if (inputPos === 0) {
        singleInputRef[inputPos].shake();
      }
      else if (inputPos === inputLength - 1) {
        if (inputValue.length === 0) {
          traverseInputs(MoveType.Back, inputPos);
        }
        else if (inputValue.length === 1) {
          updateChangedChar(inputPos, ''); // user is trying to clear last input
        }
      }
      else if (inputPos < inputLength - 1 && inputValue.length === 0) {
        traverseInputs(MoveType.Back, inputPos); // user is trying to clear input so move back
      }
    }
  };

  const clearInputOnFocus = (inputPos: number) => {
    singleInputRef[inputPos].clear();
    updateChangedChar(inputPos, '');
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {value.map((char: string, currentCharIndex: number) => (
        showChar[currentCharIndex] === '1'
          ? <SingleInput
            {...props}
            key={currentCharIndex}
            placeHolder={placeHolderCharArray[currentCharIndex]}
            onChange={onChange}
            index={currentCharIndex}
            setInputRef={setInputRef}
            keyboardType={props.keyboardType}
            value={value[currentCharIndex]}
            onKeyPress={onKeyPress}
            clearInputOnFocus={clearInputOnFocus}
            autoFocus={props.autoFocus && currentCharIndex === findFirstInputIndex()}
          />
          : <Text
            style={[
              {
                color: 'grey',
                fontSize: 20,
                fontWeight: 'bold',
                width: 24,
                textAlign: 'center',
                alignSelf: 'center',
                paddingBottom: 2,
              },
              props.permenantTextStyle
            ]}
          >
            {placeHolderCharArray[currentCharIndex]}
          </Text>
      ))}
    </View>
  );
};

export default CharacterInput;