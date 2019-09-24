import * as React from 'react';
import { View } from 'react-native';

import SingleInput, { typeRef, InputStyle } from './SingleInput';

export interface CharacterInput extends InputStyle {
  placeHolder: string,
  binary: string,
  length: number,
  handleChange: (raw: string) => void,
  keyboardType?: string
}

const CharacterInput: React.SFC<CharacterInput> = (props: CharacterInput) => {
  const placeHolderCharArray: Array<string> = props.placeHolder.split('');
  const [string, setString] = React.useState<Array<string>>(Array(props.length).fill(''));
  const binary: Array<string> = props.binary.split('');
  const refs: Array<typeRef> = [];

  React.useEffect(() => {
    props.handleChange(string.join(''));
  }, [string]);

  const setChar = (i: number, c: string): void => {
    const temp: Array<string> = [...string];
    temp[i] = c;
    setString(temp);
  };

  const goBack = (i: number): void => {
    if (i === 0) {
      refs[i].shake();
    } else if (i > 0 && i <= props.length - 1 && binary[i - 1] === '1') {
      refs[i - 1].focus();
    } else if (i - 1 > 0) {
      goBack(i - 1);
    }
  };

  const goForward = (i: number): void => {
    if (i === props.length - 1) {
      refs[i].shake();
    } else if (i >= 0 && i < props.length - 1 && binary[i + 1] === '1') {
      refs[i + 1].focus();
    } else if (i + 1 < props.length - 1) {
      goForward(i + 1);
    }
  };

  const onChange = (i: number, c: string): void => {
    if (c.length === 1) {
      goForward(i);
      setChar(i, c);
    } else if (c.length === 0) {
      goBack(i);
      setChar(i, c);
    } else if (c.length > 1) {
      refs[i].shake();
    }
  };

  const setRef = (i: number, ref: typeRef): void => {
    refs[i] = ref;
  };

  const onKeyPress = (i: number, e: any): void => {
    if (e.key !== 'Backspace') return;
    if (i === 0) refs[i].shake();
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
      {string.map((c: string, i: number) => (
        <SingleInput
          {...props}
          key={i}
          placeHolder={placeHolderCharArray[i]}
          onChange={onChange}
          index={i}
          show={binary[i] === '1'}
          setRef={setRef}
          keyboardType={props.keyboardType}
          value={string[i]}
          onKeyPress={onKeyPress}
        />
      ))}
    </View>
  );
};

export default CharacterInput;