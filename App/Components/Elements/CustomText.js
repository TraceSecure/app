import React from 'react';
import {Text} from 'react-native';
import tailwind from 'tailwind-rn';

export default ({
  text,
  medium,
  big,
  title,
  light,
  dark,
  extraClasses,
  action,
  centered,
  customStylesObj,
}) => {
  let textStyles = '';
  if (medium) {
    textStyles += 'text-lg ';
  }
  if (big) {
    textStyles += 'text-xl ';
  }
  if (title) {
    textStyles += 'text-2xl ';
  }
  if (light) {
    textStyles += 'text-white ';
  }
  if (dark) {
    textStyles += 'text-gray-700 ';
  }
  if (centered) {
    textStyles += 'text-center ';
  }
  if (extraClasses) {
    textStyles += extraClasses;
  }
  return (
    <Text
      style={[customStylesObj || {}, tailwind(textStyles)]}
      onPress={action ? action : () => {}}>
      {text}
    </Text>
  );
};
