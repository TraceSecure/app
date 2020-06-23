import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {getTimelines} from '../../realmQueries';
import tailwind from 'tailwind-rn';
import CustomText from '../Components/Elements/CustomText';
import CustomButton from '../Components/Elements/CustomButton';
import TimelineRow from '../Components/Composites/TimelineRow';
import ViewTimelineModal from '../Components/Modals/ViewTimelineModal';
import AddTimelineModal from '../Components/Modals/AddTimelineModal';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import useTutorialLogic from '../Hooks/useTutorialLogic';

const CopilotView = walkthroughable(View);

const Timelines = ({navigation, route, start, copilotEvents}) => {
  const [timelines, updateTimelines] = useState([]);
  const [formVisible, updateFormVisible] = useState(false);
  const [detailVisible, updateDetailVisible] = useState(false);
  const [currentDetail, updateCurrentDetail] = useState({});

  async function fetchTimelines() {
    const response = await getTimelines();
    updateTimelines(response);
  }

  useTutorialLogic('reports', start, copilotEvents, navigation);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTimelines();
      if (route.params?.person || route.params?.adding) {
        updateFormVisible(true);
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
  }, [navigation, route, route.params]);

  const toggleDetail = item => {
    if (detailVisible) {
      return updateDetailVisible(false);
    }

    item.folksAtRisk = extractPeopleAtRisk(item.events);
    updateCurrentDetail(item);
    updateDetailVisible(true);
  };

  const extractPeopleAtRisk = events => {
    let atRiskFolks = [];

    events.forEach(event => {
      event.attendees.forEach(attendee => {
        if (atRiskFolks.find(atRiskPerson => atRiskPerson.id === attendee.id)) {
          return;
        }

        atRiskFolks.push(attendee);
      });
    });

    atRiskFolks.sort((a, b) => (b.atRisk ? 1 : -1));

    return atRiskFolks;
  };

  return (
    <SafeAreaView style={tailwind('h-full m-8 justify-between')}>
      <AddTimelineModal
        navigation={navigation}
        route={route}
        visible={formVisible}
        toggle={updateFormVisible}
        refetch={fetchTimelines}
      />
      <ViewTimelineModal
        current={currentDetail}
        visible={detailVisible}
        toggle={updateDetailVisible}
      />
      <CopilotStep
        text={
          'Here is where your reports will show up (if you have to add any, hopefully not!). Tap on one and you can see the events the target of the report attended as well as all the people who were at those events.'
        }
        order={8}
        name="Eight">
        <CopilotView>
          {timelines.length > 0 ? (
            <View style={tailwind('flex-auto')}>
              <CustomText
                text="Your Reports:"
                title
                centered
                dark
                extraClasses="mt-4 mb-4"
              />
              <View style={tailwind('flex-row pb-4 px-4')}>
                <CustomText
                  extraClasses="flex-1 justify-start"
                  dark
                  text="Name"
                />
                <CustomText
                  extraClasses="flex-1 justify-start"
                  dark
                  text="Date"
                />
              </View>
              <FlatList
                style={tailwind('mb-4')}
                data={timelines}
                renderItem={({item}) => (
                  <TimelineRow
                    timeline={item}
                    action={() => toggleDetail(item)}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          ) : (
            <CustomText
              text="No Timelines Yet!"
              dark
              centered
              medium
              extraClasses="my-3 pb-4"
            />
          )}
        </CopilotView>
      </CopilotStep>
      <CopilotStep
        text={
          "You guessed it, if you have to add a report you can tap here to do it. That's it! We hope you find this app helpful. Good luck and stay safe!"
        }
        order={9}
        name="Nine">
        <CopilotView style={tailwind('mb-12 mt-4')}>
          <CustomButton
            text="Add a Report"
            action={() => updateFormVisible(true)}
          />
        </CopilotView>
      </CopilotStep>
    </SafeAreaView>
  );
};

export default copilot()(Timelines);
