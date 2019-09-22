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
	/>
```
## Available props
| Name              | Type                                                                                  | Default                                    | Description                                                                                 |
|-------------------|---------------------------------------------------------------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------|
| placeHolder       | String                                                                                | required                                   | String of place holder characters.                                                             |
| binary            | String                                                                                | required                                   | String of 1 or 0, indicates if corresponding character should be editable or not                                                         |
| length            | Number                                                                                | required                                   | Length of input (length == placeHolder == binary)                                                                 |
| handleChange      | Function                                                                              | required                                   | Provides raw string value of input field (including characters of uneditable input(s))                                                                   |
| placeholder       | String|Element                                                                        | ''                                         | Placeholder for each cell, can also pass a component                                        |
| mask              | String|Element                                                                        | '*'                                        | Character masking for each cell, can also pass a component. Usable with `password` props    |
| maskDelay         | Number                                                                                | 200                                        | The delay in milliseconds before a character is masked                                      |
| password          | Boolean                                                                               | false                                      | Mask the input value. Each cell masked with `mask` props                                    |
| autoFocus         | Boolean                                                                               | false                                      | If true, focuses the input on `componentDidMount`                                           |
| editable          | Boolean                                                                               | true                                       | If false, makes each cell not editable                                                      |
| restrictToNumbers | Boolean                                                                               | false                                      | Restrict input to numbers only                                                              |
| containerStyle    | React View StyleSheet                                                                 | `{}`                                       | View style for whole cell containers                                                        |
| cellStyle         | React View StyleSheet                                                                 | `{ borderColor: 'gray', borderWidth: 1}`   | View style for each cell                                                                    |
| cellStyleFocused  | React View StyleSheet                                                                 | `{ borderColor: 'black', borderWidth: 2 }` | View style for focused cell                                                                 |
| textStyle         | React Text StyleSheet                                                                 | `{ color: 'gray', fontSize: 24 }`          | Text style for cell value                                                                   |
| textStyleFocused  | React Text StyleSheet                                                                 | `{ color: 'black' }`                       | Text style for focused cell value                                                           |
| onFulfill         | Function                                                                              | null                                       | Callback function that's called when the input is completely filled                         |
| onTextChange      | Function                                                                              | null                                       | Callback function that's called when the text changed                                       |
| onBackspace       | Function                                                                              | null                                       | Callback function that's called when the input is empty and the backspace button is pressed |
| keyboardType      | Enum('default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad') | 'numeric'                                  | Determines which keyboard to open                                                           |
