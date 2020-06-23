import React from 'react';
import {View, SafeAreaView, Modal, FlatList} from 'react-native';
import tailwind from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import extractFormattedDate from '../../utilities/extractFormattedDate';
import CustomText from '../Elements/CustomText';
import PersonRow from '../Composites/PersonRow';

export default ({visible, toggle, event}) => (
  <Modal animationType="slide" transparent={false} visible={visible}>
    {event && (
      <SafeAreaView style={tailwind('bg-gray-200')}>
        <View style={tailwind('p-8')}>
          <FontAwesomeIcon
            style={tailwind('self-end')}
            size={32}
            icon={faTimes}
            onPress={() => toggle(false)}
          />
          <CustomText text={event.name} dark title extraClasses="pb-1" />
          <CustomText
            text={extractFormattedDate(event.date)}
            dark
            extraClasses="pb-3"
          />
          <CustomText
            text={`Did you wear a mask?: ${event.indoors ? 'Yes' : 'No'}`}
            medium
            dark
            extraClasses="pb-2"
          />
          <CustomText
            text={`Was this event indoors?: ${event.mask ? 'Yes' : 'No'}`}
            medium
            dark
            extraClasses="pb-8"
          />
          <CustomText text="Attendees:" dark big extraClasses="pb-2" />

          <FlatList
            data={event.attendees}
            renderItem={({item}) => (
              <PersonRow person={item} action={() => toggle(false)} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    )}
  </Modal>
);
