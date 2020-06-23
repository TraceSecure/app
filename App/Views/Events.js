import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {getEvents} from '../../realmQueries';
import tailwind from 'tailwind-rn';
import ViewEventModal from '../Components/Modals/ViewEventModal';
import AddEventModal from '../Components/Modals/AddEventModal';
import EventRow from '../Components/Composites/EventRow';
import CustomText from '../Components/Elements/CustomText';
import CustomButton from '../Components/Elements/CustomButton';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import useTutorialLogic from '../Hooks/useTutorialLogic';

const CopilotView = walkthroughable(View);

const Events = ({navigation, route, start, copilotEvents}) => {
  const [events, updateEvents] = useState([]);
  const [formVisible, updateFormVisible] = useState(false);
  const [detailVisible, updateDetailVisible] = useState(false);
  const [currentDetail, updateCurrentDetail] = useState({});

  async function fetchEvents() {
    const response = await getEvents();
    updateEvents(response);
    updateCurrentDetail(response[0]);
  }

  useTutorialLogic('events', start, copilotEvents, navigation);

  useEffect(() => {
    async function checkIfAdding() {
      if (route.params?.adding) {
        updateFormVisible(true);
      }
    }
    checkIfAdding();
    fetchEvents();
  }, [route.params]);

  const toggleDetail = item => {
    if (detailVisible) {
      return updateDetailVisible(false);
    }

    updateCurrentDetail(item);
    updateDetailVisible(true);
  };

  return (
    <SafeAreaView style={tailwind('m-8 h-full justify-between')}>
      <ViewEventModal
        visible={detailVisible}
        event={currentDetail}
        toggle={updateDetailVisible}
        navigation={navigation}
        action={() =>
          navigation.navigate('AddTimeline', {person: currentDetail.id})
        }
      />
      <AddEventModal
        visible={formVisible}
        toggle={updateFormVisible}
        refetch={fetchEvents}
      />
      <CopilotStep
        text={
          "As you add events you'll see them show up here. Tap on an event to see more details about it."
        }
        order={6}
        name="six">
        <CopilotView>
          {events.length > 0 ? (
            <View style={tailwind('flex-auto')}>
              <CustomText
                text="Your Events:"
                title
                centered
                dark
                extraClasses="mb-4 mt-4"
              />
              <View style={tailwind('flex-row justify-between pb-4 px-4')}>
                <CustomText dark text="Date" />
                <CustomText dark text="Name" />
                <CustomText dark text="Mask/Indoors" />
              </View>
              <FlatList
                style={tailwind('mb-4')}
                data={events}
                renderItem={({item}) => (
                  <EventRow event={item} action={() => toggleDetail(item)} />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          ) : (
            <CustomText
              text="No Events Yet!"
              medium
              centered
              extraClasses="my-3 pb-4"
            />
          )}
        </CopilotView>
      </CopilotStep>
      <CopilotStep
        text={
          "Just like before you can tap here to add a new event. Let's go to the reports tab now."
        }
        order={7}
        name="Seven">
        <CopilotView style={tailwind('mb-12 mt-4')}>
          <CustomButton
            text="Add an Event"
            action={() => updateFormVisible(true)}
          />
        </CopilotView>
      </CopilotStep>
    </SafeAreaView>
  );
};

export default copilot()(Events);
