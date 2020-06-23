import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tailwind from 'tailwind-rn';
import CustomText from '../Elements/CustomText';

export default ({timeline, action}) => (
  <TouchableOpacity onPress={() => action(timeline)}>
    <View
      style={[
        {borderColor: 'tomato'},
        tailwind('border-b p-2 mb-4 bg-white flex-row justify-between rounded'),
      ]}>
      <View style={tailwind('flex py-4 px-2 flex-1 flex-row justify-start')}>
        <CustomText text={timeline.target?.name} dark />
      </View>
      <View style={tailwind('flex py-4 px-2 flex-1 flex-row justify-start')}>
        <CustomText text={timeline.name} dark />
      </View>
    </View>
  </TouchableOpacity>
);
