import React from 'react';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';
import CustomText from '../Elements/CustomText';

const CDCText1 =
  'People 65 years and older People who live in a nursing home or long-term care facility People of all ages with underlying medical conditions, particularly if not well controlled, including:';
const CDCText2 =
  'People with chronic lung disease or moderate to severe asthma';
const CDCText3 = 'People who have serious heart conditions';
const CDCText4 = 'People who are immunocompromised';
const CDCText5 = `
Many conditions can cause a person to be immunocompromised, including
cancer treatment, smoking, bone marrow or organ transplantation,
immune deficiencies, poorly controlled HIV or AIDS, and prolonged use
of corticosteroids and other immune weakening medications
`;
const CDCText6 =
  'People with severe obesity (body mass index [BMI] of 40 or higher)';
const CDCText7 =
  'People with diabetes People with chronic kidney disease undergoing dialysis';
const CDCText8 = 'People with liver disease';

export default ({visible, switchModals}) => (
  <Modal animationType="fade" transparent={false} visible={visible}>
    <SafeAreaView>
      <FontAwesomeIcon
        style={tailwind('self-end mr-8 mt-8')}
        icon={faTimes}
        onPress={() => switchModals(false)}
        size={32}
      />
      <ScrollView>
        <View style={tailwind('p-8')}>
          <CustomText
            text="CDC definition of at risk:"
            title
            extraClasses="mb-4"
          />
          <CustomText text={CDCText1} big extraClasses="mb-4" />
          <CustomText text={CDCText2} big extraClasses="mb-4" />
          <CustomText text={CDCText3} big extraClasses="mb-4" />
          <CustomText text={CDCText4} big extraClasses="mb-4" />
          <CustomText text={CDCText5} big extraClasses="mb-4" />
          <CustomText text={CDCText6} big extraClasses="mb-4" />
          <CustomText text={CDCText7} big extraClasses="mb-4" />
          <CustomText text={CDCText8} big extraClasses="mb-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
);
