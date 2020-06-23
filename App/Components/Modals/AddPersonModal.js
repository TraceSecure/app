import React, {useState} from 'react';
import {View, Modal, SafeAreaView} from 'react-native';
import tailwind from 'tailwind-rn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import CheckBox from '@react-native-community/checkbox';
import {addPerson} from '../../../realmQueries';
import CustomTextInput from '../FormElements/CustomTextInput';
import CustomText from '../Elements/CustomText';
import CustomButton from '../Elements/CustomButton';

export default ({visible, toggle, refetch, switchModals}) => {
  const [contactName, updateContactName] = useState('');
  const [contactPhone, updateContactPhone] = useState('');
  const [atRisk, updateAtRisk] = useState(false);

  const refresh = () => {
    updateAtRisk(false);
    updateContactName('');
    updateContactPhone('');
    refetch();
    toggle(false);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={tailwind('m-8 justify-center h-full')}>
        <View>
          <CustomText text="Add a Contact:" big extraClasses="pt-8 pb-4" />
          <CustomTextInput
            onChangeText={text => updateContactName(text)}
            value={contactName}
            placeholder="Name"
          />
          <CustomTextInput
            style={tailwind('border-b p-4 mb-4')}
            onChangeText={text => updateContactPhone(text)}
            value={contactPhone}
            placeholder="Phone (Optional)"
          />
          <View style={tailwind('py-4 flex-row justify-between')}>
            <View style={tailwind('flex-row items-center')}>
              <CheckBox
                disabled={false}
                value={atRisk}
                onValueChange={() => updateAtRisk(!atRisk)}
              />
              <CustomText
                text='Is this person considered "at risk"?'
                extraClasses="pl-4"
              />
              <FontAwesomeIcon
                style={tailwind('ml-4')}
                icon={faQuestionCircle}
                onPress={() => switchModals()}
                size={24}
              />
            </View>
          </View>
          <CustomButton
            text="Add"
            action={() => {
              addPerson(contactName, contactPhone, atRisk);
              refresh();
            }}
            extraClasses={'mt-4 mb-4'}
          />
          <CustomButton
            text="Cancel"
            action={() => {
              refresh();
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
