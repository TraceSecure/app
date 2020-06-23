import React, {useState} from 'react';
import {View, Alert, Image, TextInput} from 'react-native';
import tailwind from 'tailwind-rn';
import CustomButton from '../Components/Elements/CustomButton';
import CustomText from '../Components/Elements/CustomText';

export default ({navigation}) => {
  const [value, onChangeText] = useState('');

  const submitForm = () => {
    if (value.length) {
      navigation.navigate('AddPeople', {firstTime: true, name: value});
      return;
    }

    Alert.alert('Error', 'Please enter your name before moving on');
  };

  return (
    <View style={tailwind('flex-1 justify-center p-8')}>
      <Image
        style={[tailwind('mb-5'), {width: 220, height: 70}]}
        source={require('../../assets/logo.png')}
      />
      <CustomText
        text="The point of this app is to give you a completely and utterly private place to track your encounters with other people to help aid in contact tracing should the need arise."
        extraClasses="pb-4"
      />
      <CustomText
        text="All data entered in this app will only ever live in an encrypted database on your phone."
        extraClasses="pb-4"
      />
      <CustomText
        text="Let's get you started, what's your name?"
        extraClasses="pb-4"
      />
      <TextInput
        style={tailwind('border-b p-4 mb-4')}
        onChangeText={text => onChangeText(text)}
        placeholder="Name"
        value={value}
      />
      <CustomButton text="Next" action={() => submitForm()} />
    </View>
  );
};
