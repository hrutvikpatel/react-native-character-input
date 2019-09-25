import CharacterInput from './CharacterInput';

export default CharacterInput;

// usually you are supposed to put all of your exports in this file...
// similar to how you imported that component then immediately exported it
// you are supposed to do this will all entities that your client will need
// in order to run your program (enums, interfaces, classes, etc)


// typically what I see in other projects is that they have the main component as the default export
// and all of the other classes and entities as other exports
// That's how you get stuff like:
// import React, { Component } from 'react' ... because they're both in index