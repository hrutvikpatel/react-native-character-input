import * as React from 'react';
import { View } from 'react-native';

import SingleInput from './SingleInput';

interface CharacterInput {
  placeHolder: string,
  binary: string,
  length: number,
  handleChange: Function,
  keyboardType?: string
}

const CharacterInput: React.SFC<CharacterInput> = (props) => {
  const placeHolderCharArray = props.placeHolder.split('');
  const [string, setString] = React.useState(Array(props.length).fill(''));
  const binary = props.binary.split('');
  const refs: never[] | { 
    focus: () => void;
    shake: () => void;
  }[] = [];

  React.useEffect(() => {
    props.handleChange(string.join(''));
  }, [string]);

  const setChar = (i: number, c: string) => {
    const temp = [...string];
    temp[i] = c;
    setString(temp);
  };

  const goBack = (i: number) => {
    if (i === 0) {
      refs[i].shake();
    } else if (i > 0 && i <= props.length - 1 && binary[i - 1] === '1') {
      refs[i - 1].focus();
    } else if (i - 1 > 0) {
      goBack(i - 1);
    }
  };

  const goForward = (i: number) => {
    if (i === props.length - 1) {
      refs[i].shake();
    } else if (i >= 0 && i < props.length - 1 && binary[i + 1] === '1') {
      refs[i + 1].focus();
    } else if (i + 1 < props.length - 1) {
      goForward(i + 1);
    }
  };

  const onChange = (i: number, c: string) => {
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

  const setRef = (i: number, ref: any) => {
    refs[i] = ref;
  };

  const onKeyPress = (i: number, e: any) => {
    if (i === 0 && e.key === 'Backspace') {
      refs[i].shake();
    }
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

CharacterInput.defaultProps = {
  keyboardType: "default"
}

export default CharacterInput;