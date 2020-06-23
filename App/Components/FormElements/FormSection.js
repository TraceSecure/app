import React from 'react';
import {View} from 'react-native';
import tailwind from 'tailwind-rn';
import CustomText from '../Elements/CustomText';

export default ({title, children, inline}) => (
  <View
    style={[
      {borderBottomColor: 'tomato'},
      tailwind('p-4 bg-white mx-8 my-2 border-b'),
    ]}>
    <View
      style={tailwind(inline && 'flex-row-reverse justify-end items-center')}>
      {title && (
        <CustomText
          text={title}
          medium
          extraClasses={`${inline ? 'pl-4' : 'pb-4'}`}
        />
      )}
      {children}
    </View>
  </View>
);
