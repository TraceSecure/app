import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tailwind from 'tailwind-rn';
import extractFormattedDate from '../../utilities/extractFormattedDate';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser, faHeadSideMask} from '@fortawesome/free-solid-svg-icons';

export default ({event, action}) => (
  <TouchableOpacity onPress={action ? () => action() : () => {}}>
    <View
      style={[
        {borderColor: 'tomato'},
        tailwind('border-b p-2 mb-4 bg-white flex-row justify-between rounded'),
      ]}>
      <View style={tailwind('flex p-4 flex-1 flex-row justify-start')}>
        <Text style={tailwind('text-gray-800')}>
          {extractFormattedDate(event.date)}
        </Text>
      </View>
      <View style={tailwind('flex p-4 flex-1 flex-row justify-start')}>
        <Text style={tailwind('text-gray-800')}>{event.name}</Text>
      </View>
      <View style={tailwind('p-4 flex flex-1 flex-row justify-end')}>
        {event.mask && <FontAwesomeIcon icon={faHeadSideMask} />}
        {event.indoors && (
          <FontAwesomeIcon style={tailwind('ml-4')} icon={faHouseUser} />
        )}
      </View>
    </View>
  </TouchableOpacity>
);
