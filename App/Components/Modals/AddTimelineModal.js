import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addTimeline, getPeople, getEvents} from '../../../realmQueries';
import tailwind from 'tailwind-rn';
import {Picker} from '@react-native-community/picker';
import FormSection from '../FormElements/FormSection';
import CustomButton from '../Elements/CustomButton';

export default ({navigation, route, visible, toggle, refetch}) => {
  const [timelineTarget, updateTimelineTarget] = useState('');
  const [timelineDate, updateTimelineDate] = useState(new Date());
  const [people, updatePeople] = useState([]);
  const [confirmedCase, updateConfirmedCase] = useState(false);
  const [reducedPeople, updateReducedPeople] = useState([]);

  async function fetchPeople() {
    const response = await getPeople();
    const reducedDataSet = response.map(({id, name}) => ({id, name}));
    updateTimelineTarget(response[0].id);
    updatePeople(response);
    updateReducedPeople(reducedDataSet);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchPeople();

      if (route.params?.person) {
        updateTimelineTarget(route.params.person);
      }
    });

    const unsubscribe2 = navigation.addListener('blur', () => {
      navigation.setParams({person: null, adding: null});
    });

    const cleanup = () => {
      unsubscribe();
      unsubscribe2();
    };

    return cleanup;
  }, [navigation, route.params]);

  const reset = () => {
    updateTimelineTarget(reducedPeople[0].id);
    updateTimelineDate(new Date());
    toggle(false);
  };

  const generateTimeline = async () => {
    const year = timelineDate.getFullYear();
    const month = timelineDate.getMonth() + 1;
    const day = timelineDate.getDate();
    const name = `${month}-${day}-${year}`;
    const events = await retrieveTimelineEventsFromDB();
    const target = people.find(person => person.id === timelineTarget);

    return {
      name,
      target,
      events,
    };
  };

  const retrieveTimelineEventsFromDB = async () => {
    const evts = await getEvents(timelineTarget, timelineDate);
    return evts;
  };

  const updateDate = (evt, selectedDate) => updateTimelineDate(selectedDate);

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView>
        <ScrollView style={tailwind('pt-12 pb-12 bg-gray-200')}>
          <FormSection title="Who has COVID19 symptoms?">
            <Picker
              selectedValue={timelineTarget}
              onValueChange={(target, idx) => updateTimelineTarget(target)}>
              {reducedPeople.map(({id, name}) => (
                <Picker.Item key={id} label={name} value={id} />
              ))}
            </Picker>
          </FormSection>

          <FormSection title="When did they start feeling symptomatic?">
            <DateTimePicker
              value={timelineDate}
              mode={'date'}
              display="default"
              onChange={updateDate}
            />
          </FormSection>

          <FormSection title="Have they been tested and diagnosed?">
            <View style={tailwind('flex-row justify-center items-center')}>
              <Text style={tailwind('pr-4')}>No/Unsure</Text>
              <Switch
                trackColor={{false: 'gray', true: 'gray'}}
                thumbColor={confirmedCase ? 'tomato' : '#333'}
                ios_backgroundColor="gray"
                onValueChange={() => updateConfirmedCase(!confirmedCase)}
                value={confirmedCase}
              />
              <Text style={tailwind('pl-4')}>Yes</Text>
            </View>
          </FormSection>

          <CustomButton
            text="Submit"
            action={async () => {
              addTimeline(await generateTimeline());
              reset();
              refetch();
            }}
            extraClasses="mx-8 mt-4 mb-4"
          />
          <CustomButton
            text="Cancel"
            action={() => toggle(false)}
            extraClasses="mx-8 mb-20"
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
