import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tailwind from 'tailwind-rn';
import {getPeople} from '../../../realmQueries';
import CheckBox from '@react-native-community/checkbox';
import CustomText from '../Elements/CustomText';

export default ({data, updateFunc}) => {
  const [people, updatePeople] = useState([]);

  async function fetchPeople() {
    const response = await getPeople();
    const reducedDataSet = response.map(({id, name}) => ({id, name}));

    updatePeople(reducedDataSet);
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const updateAttendeeList = id => {
    const indexOfID = data.indexOf(id);
    const attendees = [...data];

    if (indexOfID !== -1) {
      attendees.splice(indexOfID, 1);
      updateFunc(attendees);
      return false;
    }

    updateFunc([...data, id]);
  };

  const checkIfChecked = id => data.includes(id);

  return (
    <View>
      {people.map(person => {
        const checked = checkIfChecked(person.id);
        return (
          <View
            key={person.id}
            style={[
              {borderColor: 'tomato'},
              tailwind(
                'p-4 mb-4 flex flex-row justify-between items-center border rounded',
              ),
            ]}>
            <CustomText text={person.name} dark />
            <CheckBox
              disabled={false}
              value={checked}
              onValueChange={() => updateAttendeeList(person.id)}
            />
          </View>
        );
      })}
    </View>
  );
};
