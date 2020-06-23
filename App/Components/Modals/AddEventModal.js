import React, {useState} from 'react';
import tailwind from 'tailwind-rn';
import {Modal, SafeAreaView, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import CustomTextInput from '../FormElements/CustomTextInput';
import CustomButton from '../Elements/CustomButton';
import FormSection from '../FormElements/FormSection';
import {getPeople, addEvent} from '../../../realmQueries';
import CustomChecklist from '../FormElements/CustomChecklist';

export default ({visible, toggle, refetch}) => {
  const [eventName, updateEventName] = useState('');
  const [eventIndoors, updateEventIndoors] = useState(false);
  const [eventMask, updateEventMask] = useState(false);
  const [eventDate, updateEventDate] = useState(new Date());
  const [eventAttendees, updateEventAttendees] = useState([]);

  const reset = () => {
    updateEventName('');
    updateEventIndoors(false);
    updateEventMask(false);
    updateEventAttendees([]);
    updateEventDate(new Date());
    toggle(false);
    refetch();
  };

  const generateEvent = async () => ({
    name: eventName,
    date: eventDate,
    attendees: await retrieveAttendeesFromDB(),
    mask: eventMask,
    indoors: eventIndoors,
  });

  const retrieveAttendeesFromDB = async () => {
    const peopleAtEvent = eventAttendees.map(async attendeeID => {
      const attendee = await getPeople(attendeeID);
      return attendee[0];
    });

    return await Promise.all(peopleAtEvent);
  };

  const updateDate = (evt, selectedDate) => updateEventDate(selectedDate);

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView>
        <ScrollView style={tailwind('pt-12 pb-12 bg-gray-200')}>
          <FormSection title="Give your event a name:">
            <CustomTextInput
              onChangeText={text => updateEventName(text)}
              value={eventName}
              placeholder="Name"
            />
          </FormSection>

          <FormSection title="When was it?">
            <DateTimePicker
              value={eventDate}
              mode={'date'}
              display="default"
              onChange={updateDate}
            />
          </FormSection>

          <FormSection title="Were you wearing a mask?" inline>
            <CheckBox
              disabled={false}
              value={eventMask}
              onValueChange={() => updateEventMask(!eventMask)}
            />
          </FormSection>

          <FormSection title="Was it indoors?" inline>
            <CheckBox
              disabled={false}
              value={eventIndoors}
              onValueChange={() => updateEventIndoors(!eventIndoors)}
            />
          </FormSection>

          <FormSection title="Who was there?">
            <CustomChecklist
              data={eventAttendees}
              updateFunc={updateEventAttendees}
            />
          </FormSection>

          <CustomButton
            text="Submit"
            action={async () => {
              addEvent(await generateEvent());
              reset();
            }}
            extraClasses="mx-8 mt-4 mb-4"
          />
          <CustomButton
            text="Cancel"
            action={async () => toggle(false)}
            extraClasses="mx-8 mb-20"
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
