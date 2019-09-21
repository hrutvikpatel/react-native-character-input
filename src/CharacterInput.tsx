import * as React from 'react';
import { Text } from 'react-native';

interface CharacterInput {
  name: string,
 }

 const CharacterInput: React.SFC<CharacterInput> = (props) => {
  return (
    <Text>{props.name}</Text>
  );
};

export default CharacterInput;