import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, FlatList, View} from 'react-native';
import {getEvents} from '../../realmQueries';
import tailwind from 'tailwind-rn';
import HomeCard from '../Components/Composites/HomeCard';
import EventRow from '../Components/Composites/EventRow';
import CustomText from '../Components/Elements/CustomText';
import {copilot, CopilotStep} from 'react-native-copilot';
import useTutorialLogic from '../Hooks/useTutorialLogic';

const Home = ({navigation, start, copilotEvents}) => {
  const [events, updateEvents] = useState([]);

  useTutorialLogic('home', start, copilotEvents, navigation);

  useEffect(() => {
    async function fetchevents() {
      const response = await getEvents();
      updateEvents(response.slice(0, 3));
    }

    fetchevents();
  }, []);

  const navToEvents = () => {
    navigation.navigate('AddEvent', {adding: true});
  };

  const navToTimelines = () => {
    navigation.navigate('AddTimeline', {adding: true});
  };

  return (
    <SafeAreaView style={tailwind('mt-12')}>
      <ScrollView>
        <CopilotStep
          text={
            'Welcome to TraceSecure! We value your privacy and commit not only to never aggregate or sell your data, but to never handle it at all. Everything you enter into this app will only ever live in an encrypted database right on your phone. Be aware that this means if you delete the app it will delete all of your data.'
          }
          order={1}
          name="One">
          <HomeCard title="Our Promise:">
            <CustomText
              text="All data entered in this app will only ever live in an encrypted
          database on your phone."
              extraClasses="pb-4"
            />
          </HomeCard>
        </CopilotStep>

        <CopilotStep
          text={
            "Here's a quick view of your last three events and a shortcut to add a new event."
          }
          order={2}
          name="Two">
          <HomeCard
            title="Recent Events"
            ctaText="Add an Event"
            ctaAction={navToEvents}>
            {events.length > 0 ? (
              <>
                <View
                  style={tailwind(
                    'flex-row justify-between pb-4 px-4 border-b',
                  )}>
                  <CustomText dark text="Date" />
                  <CustomText dark text="Name" />
                  <CustomText dark text="Mask/Indoors" />
                </View>
                <FlatList
                  style={tailwind('mb-4')}
                  data={events}
                  renderItem={({item}) => <EventRow event={item} />}
                  keyExtractor={item => item.id}
                />
              </>
            ) : (
              <CustomText
                text="No Events Yet!"
                medium
                centered
                extraClasses="pb-6 text-center my-6"
              />
            )}
          </HomeCard>
        </CopilotStep>

        <CopilotStep
          text="You can always start a new report right here from the home screen. Navigate to the People tab to continue the tutorial."
          order={3}
          name="Three">
          <HomeCard
            title="Are you or someone you know symptomatic?"
            ctaText="Start a New Report"
            ctaAction={navToTimelines}
          />
        </CopilotStep>
      </ScrollView>
    </SafeAreaView>
  );
};

export default copilot()(Home);
