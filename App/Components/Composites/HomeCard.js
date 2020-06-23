import React from 'react';
import {View} from 'react-native';
import tailwind from 'tailwind-rn';
import CustomText from '../Elements/CustomText';
import CustomButton from '../Elements/CustomButton';

export default ({title, children, ctaText, ctaAction, copilot}) => (
  <View
    {...copilot}
    style={[
      {borderColor: 'tomato'},
      tailwind('bg-white my-2 mx-8 p-4 border-b rounded'),
    ]}>
    {title && <CustomText text={title} big extraClasses="text-center pb-4" />}
    {children && children}
    {ctaText && ctaAction && <CustomButton text={ctaText} action={ctaAction} />}
  </View>
);
