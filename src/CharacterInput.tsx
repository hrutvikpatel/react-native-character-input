import * as React from 'react';
import { View } from 'react-native';

import SingleInput, { ITypeRef, IInputStyle } from './SingleInput';


enum MoveType {
  Forward,
  Back
};

// reexport in index
export interface CharacterInput extends IInputStyle {
  placeHolder: string,
  binary: string,
  length: number,
  handleChange: (raw: string) => void,
  keyboardType?: string
}


const CharacterInput: React.FunctionComponent<CharacterInput> = (props: CharacterInput) => {
  const placeHolderCharArray: string[] = props.placeHolder.split('');
  const [value, setValue] = React.useState<string[]>(Array(props.length).fill(''));
  const showChar: string[] = props.binary.split('');
  const singleInputRef: ITypeRef[] = [];

  React.useEffect(() => {
    props.handleChange(value.join(''));
  }, [value]);

  const updateChangedChar = (index: number, char: string): void => {
    const temp: string[] = [...value];
    temp[index] = char;
    setValue(temp);
  };

  const validateIndex = (index: number): boolean => {
    if (index > 0 && index <= props.length - 1) return true;
    return false; 
  }

  const traverseInputs = (moveType: MoveType, charPos: number): void => {
    if (moveType === MoveType.Forward) {
      if (charPos === props.length - 1) {
        singleInputRef[charPos].shake();
      } 
      else if (validateIndex(charPos) && showChar[charPos + 1] === '1') {
        singleInputRef[charPos + 1].focus();
      }
      else if (charPos + 1 < props.length - 1) {
        traverseInputs(MoveType.Forward, charPos + 1);
      }
    }
    else if (moveType === MoveType.Back) {
      if (charPos === 0) {
        singleInputRef[charPos].shake();
      } 
      else if (validateIndex(charPos) && showChar[charPos - 1] === '1') {
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

  const onKeyPress = (inputPos: number, event: any): void => {
    if (event.key !== 'Backspace' && inputPos === 0) singleInputRef[inputPos].shake();
  };

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
        <SingleInput
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
        />
      ))}
    </View>
  );
};

export default CharacterInput;