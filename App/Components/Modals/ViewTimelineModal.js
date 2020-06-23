import React from 'react';
import {FlatList, Modal, SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';
import CustomText from '../Elements/CustomText';
import EventRow from '../Composites/EventRow';
import PersonRow from '../Composites/PersonRow';

export default ({current, visible, toggle}) => (
  <Modal animationType="slide" transparent={false} visible={visible}>
    <SafeAreaView style={tailwind('m-8')}>
      <FontAwesomeIcon
        style={tailwind('self-end')}
        size={32}
        icon={faTimes}
        onPress={() => toggle(false)}
      />
      <CustomText text={current.name} dark title extraClasses="pb-3" />
      <CustomText
        text={`Person with reported symptoms: ${current.target?.name}`}
        dark
        medium
        extraClasses="pb-10"
      />
      <CustomText
        text="Events they attended while potentially infectious:"
        dark
        big
        extraClasses="pb-4"
      />
      <FlatList
        data={current.events}
        renderItem={({item}) => <EventRow event={item} />}
        keyExtractor={item => item.id}
        style={tailwind('pb-8')}
      />
      <CustomText
        text="People who should be notified:"
        dark
        big
        extraClasses="pb-4"
      />
      <FlatList
        data={current.folksAtRisk}
        renderItem={({item}) => <PersonRow person={item} isTimeline />}
        keyExtractor={item => item.id}
        style={tailwind('pb-8')}
      />
    </SafeAreaView>
  </Modal>
);
