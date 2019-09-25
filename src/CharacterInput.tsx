import * as React from 'react';
import { View } from 'react-native';

import SingleInput, { typeRef, InputStyle } from './SingleInput';

// reexport in index
export interface CharacterInput extends InputStyle {
  placeHolder: string,
  binary: string,
  length: number,
  handleChange: (raw: string) => void,
  keyboardType?: string
}

// overall I think the impementation of this class could be a lot cleaner and easier to read
// try to make it cleaner.......

const CharacterInput: React.SFC<CharacterInput> = (props: CharacterInput) => {
  // typically you type this as: string[] not Array<string>
  const placeHolderCharArray: Array<string> = props.placeHolder.split('');
  // change these variable names
  const [string, setString] = React.useState<Array<string>>(Array(props.length).fill(''));
  // string[]
  const binary: Array<string> = props.binary.split('');
  // typeRef[]
  const refs: Array<typeRef> = [];

  React.useEffect(() => {
    // change this variable name.... you should never name a variable string...
    props.handleChange(string.join(''));
  }, [string]);

  // not easy to understand what this method does.... very cryptic
  const setChar = (i: number, c: string): void => {
    const temp: Array<string> = [...string];
    temp[i] = c;
    setString(temp);
  };


  //////////////////////

  // need better variable name... i has no context
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

  // goBack and goForward are essentially the same function with a couple of differences
  // you should really try to combine these functions and make the differences between them a parameter
  // Doesnt make sense to duplicate code like this and in the long run makes your stuff way harder to maintain

  /////////////////////

  // really bad parameter names on all of these functions
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
    // there must be a better way to do this??
    // use the keyCode not a string
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
      {/* try to avoid passing c, i as parameters everywhere. No one knows what c and i means except you lol */}
      {string.map((c: string, i: number) => (
        <SingleInput
          {...props}
          // you're never supposed to an index as a key.. doesn't really matter in this case but try to avoid it
          // React Fiber doesn't work well with indices for keys
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