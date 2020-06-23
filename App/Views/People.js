import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, SafeAreaView} from 'react-native';
import {addName, getPeople} from '../../realmQueries';
import tailwind from 'tailwind-rn';
import CDCModal from '../Components/Modals/CDCDefinitionModal';
import AddPersonModal from '../Components/Modals/AddPersonModal';
import CustomText from '../Components/Elements/CustomText';
import CustomButton from '../Components/Elements/CustomButton';
import PersonRow from '../Components/Composites/PersonRow';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import useTutorialLogic from '../Hooks/useTutorialLogic';

const CopilotView = walkthroughable(View);

const People = ({start, copilotEvents, navigation, route}) => {
  const [tracrPeople, updateTracrPeople] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const firstTime = route.params?.firstTime;

  async function fetchPeople() {
    const response = await getPeople();
    if (response !== {}) {
      updateTracrPeople(response);
    }
  }

  useTutorialLogic('people', start, copilotEvents, navigation, firstTime);

  useEffect(() => {
    fetchPeople();
  }, []);

  const switchModals = () => {
    setModalVisible(!modalVisible);
    setFormVisible(!formVisible);
  };

  return (
    <SafeAreaView style={tailwind('m-8 h-full justify-between')}>
      <CDCModal visible={modalVisible} switchModals={switchModals} />
      <AddPersonModal
        visible={formVisible}
        toggle={setFormVisible}
        refetch={fetchPeople}
        switchModals={switchModals}
      />
      {firstTime && (
        <>
          <Image
            style={[tailwind('mb-5 mt-5'), {width: 200, height: 49}]}
            source={require('../../assets/logo.png')}
          />
          <View>
            <View>
              <CustomText
                text={`Alright, thanks ${route.params?.name}.`}
                big
                extraClasses="pb-2"
              />
              <CustomText
                text="Now let's add your friends, family and aquaintances."
                medium
                extraClasses="pb-4"
              />
              <CustomText
                text="(Don't worry about adding everyone you know right now, you always
              have the option of adding more people to your list.)"
                extraClasses="pb-4"
              />
            </View>
          </View>
        </>
      )}
      {!tracrPeople.length > 0 && (
        <CustomText
          text="No contacts added yet!"
          centered
          medium
          extraClasses="mt-4"
        />
      )}
      {tracrPeople.length > 0 && (
        <CopilotStep
          text={
            'Here you can see your contacts or start reports based on them.'
          }
          order={4}
          name="Four">
          <CopilotView>
            <View style={tailwind('flex-auto')}>
              <CustomText
                text="Your People"
                title
                centered
                extraClasses="mb-4 mt-4"
              />
              <FlatList
                data={tracrPeople}
                renderItem={({item}) => <PersonRow person={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          </CopilotView>
        </CopilotStep>
      )}
      <View style={tailwind(`${!firstTime ? 'mb-12' : 'mb-4'} mt-4`)}>
        <CopilotStep
          text={
            'You can always add more contacts by tapping here! Go to the events page to learn more.'
          }
          order={5}
          name="Five">
          <CopilotView>
            <CustomButton
              text="Add a New Contact"
              action={() => setFormVisible(true)}
            />
          </CopilotView>
        </CopilotStep>
        {firstTime && (
          <CustomButton
            text="Done for now"
            action={() => addName(route.params?.name)}
            extraClasses="mb-8 mt-4"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default copilot()(People);
