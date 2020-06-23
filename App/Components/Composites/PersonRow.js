import React, {useState} from 'react';
import {View, Linking} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faExclamationCircle,
  faPhone,
  faCommentAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../Elements/CustomText';

export default ({person, action, isTimeline}) => {
  const [showInfoBubble, toggleShowInfoBubble] = useState(false);

  const navigation = useNavigation();
  return (
    <View
      style={[
        {borderColor: 'tomato'},
        tailwind('border-b p-4 mb-4 bg-white flex-row justify-between rounded'),
      ]}>
      <View style={tailwind('flex-row items-center')}>
        <CustomText text={person.name} dark />
        {person.atRisk && !showInfoBubble && (
          <View style={tailwind('ml-2')}>
            <FontAwesomeIcon
              size={18}
              icon={faExclamationCircle}
              color="tomato"
              onPress={() => toggleShowInfoBubble(!showInfoBubble)}
            />
          </View>
        )}
      </View>
      {showInfoBubble ? (
        <View
          style={[
            {borderColor: 'tomato'},
            tailwind('border  p-4 rounded pr-8'),
          ]}>
          <CustomText text="This person is considered at risk" dark />
          <FontAwesomeIcon
            style={tailwind('absolute top-0 right-0 mr-2 mt-2')}
            size={18}
            icon={faTimesCircle}
            color="tomato"
            onPress={() => toggleShowInfoBubble(!showInfoBubble)}
          />
        </View>
      ) : (
        <View>
          {isTimeline ? (
            <View style={tailwind('flex-row')}>
              <FontAwesomeIcon
                style={tailwind('ml-2')}
                size={24}
                icon={faPhone}
                color="tomato"
                onPress={() => Linking.openURL(`tel:${person.phone})`)}
              />
              <FontAwesomeIcon
                style={tailwind('ml-6')}
                size={24}
                icon={faCommentAlt}
                color="tomato"
                onPress={() => Linking.openURL(`sms:${person.phone})`)}
              />
            </View>
          ) : (
            <CustomText
              text="Start Report"
              action={() => {
                navigation.navigate('AddTimeline', {person: person.id});
                if (action) {
                  action();
                }
              }}
              customStylesObj={{backgroundColor: 'tomato'}}
              extraClasses="text-white text-sm text-center p-2"
            />
          )}
        </View>
      )}
    </View>
  );
};
