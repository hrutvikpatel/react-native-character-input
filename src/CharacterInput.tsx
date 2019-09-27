import * as React from 'react';
import { View, Text } from 'react-native';

import SingleInput, { ITypeRef, IInputStyle } from './SingleInput';


enum MoveType {
  Forward,
  Back
};

// reexport in index
export interface CharacterInput extends IInputStyle {
  placeHolder: string,
  showCharBinary: string,
  handleChange: (raw: string) => void,
  keyboardType?: string
}


const CharacterInput: React.FunctionComponent<CharacterInput> = (props: CharacterInput) => {
  if (props.placeHolder.length !== props.showCharBinary.length)
    throw 'Length of placeHolder and showCharBinary strings must be the same';

  const inputLength: number = props.placeHolder.length;
  const placeHolderCharArray: string[] = props.placeHolder.split('');
  const [value, setValue] = React.useState<string[]>(Array(inputLength).fill(''));
  const [isLastInputFilled, setIsLastInputFilled] = React.useState<boolean>(false);

  const showChar: string[] = props.showCharBinary.split('');
  const singleInputRef: ITypeRef[] = [];

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
      console.log('forward', {
        charPos,
        showChar: showChar[charPos + 1] === '1',
      })

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
      console.log('back', charPos)
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
    else if (char.length === 0) {
      traverseInputs(MoveType.Back, inputPos);
      updateChangedChar(inputPos, char);
    }
    else if (char.length > 1) {
      singleInputRef[inputPos].shake();
    }
  };

  const setInputRef = (inputPos: number, inputRef: ITypeRef): void => {
    singleInputRef[inputPos] = inputRef;
  };

  const onKeyPress = (inputPos: number, event: any, inputValue: string): void => {
    console.log('onKeyPress')
    if (event.key === 'Backspace') {
      console.log('onKeyPress', {
        inputPos,
        inputValue
      })
      if (inputPos > 0 && inputValue.length === 0) traverseInputs(MoveType.Back, inputPos);
      else if (inputPos === 0) singleInputRef[inputPos].shake();
    }
  };

  const clearInputOnFocus = (inputPos: number) => {
    singleInputRef[inputPos].clear();
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
            show={showChar[currentCharIndex] === '1'}
            setRef={setInputRef}
            keyboardType={props.keyboardType}
            value={value[currentCharIndex]}
            onKeyPress={onKeyPress}
            clearInputOnFocus={clearInputOnFocus}
          />
          : <Text>{placeHolderCharArray[currentCharIndex]}</Text>
      ))}
    </View>
  );
};

export default CharacterInput;