# react-native-character-input

## Getting started

`$ npm install react-native-character-input --save`

### react-native version < 0.60

`$ react-native link react-native-character-input`

## Usage
```javascript
import CharacterInput from 'react-native-character-input';

	<CharacterInput
		placeHolder='YYYY/MM/DD'
		binary='1111011011'
		length={10}
		handleChange={(text) => setText(text)}
		inputType='contained'
	/>
```
## Available props
| Name              | Type                                                                                  | Default                                    | Description                                                                                 |
|-------------------|---------------------------------------------------------------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------|
| placeHolder       | String                                                                                | required                                   | String of place holder characters.                                                             |
| binary            | String                                                                                | required                                   | String of 1 or 0, indicates if corresponding character should be editable or not                                                         |
| length            | Number                                                                                | required                                   | Length of input (length == placeHolder == binary)                                                                 |
| handleChange      | Function                                                                              | required                                   | Provides raw string value of input field (including characters of uneditable input(s))                                                                   |