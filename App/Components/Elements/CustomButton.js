import React from 'react';
import tailwind from 'tailwind-rn';
import {View} from 'react-native';
import CustomText from './CustomText';

export default ({text, action, extraClasses = ''}) => (
  <View
    style={[
      {backgroundColor: 'tomato'},
      tailwind('p-3 rounded' + ' ' + extraClasses),
    ]}>
    <CustomText text={text} light action={() => action()} centered medium />
  </View>
);
