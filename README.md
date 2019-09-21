# react-native-character-input

## Getting started

`$ npm install react-native-character-input --save`

### Mostly automatic installation

`$ react-native link react-native-character-input`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-character-input` and add `CharacterInput.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libCharacterInput.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.CharacterInputPackage;` to the imports at the top of the file
  - Add `new CharacterInputPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-character-input'
  	project(':react-native-character-input').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-character-input/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-character-input')
  	```


## Usage
```javascript
import CharacterInput from 'react-native-character-input';

// TODO: What to do with the module?
CharacterInput;
```
