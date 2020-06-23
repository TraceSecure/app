import React from 'react';
import {TextInput} from 'react-native';
import tailwind from 'tailwind-rn';

export default ({onChangeText, value, placeholder}) => (
  <TextInput
    style={[{borderColor: 'tomato'}, tailwind('border-b p-4 mb-4 text-lg')]}
    onChangeText={text => onChangeText(text)}
    value={value}
    placeholder={placeholder}
  />
);
