import Realm from 'realm';
import {
  TutorialStepSchema,
  NameSchema,
  PersonSchema,
  EventSchema,
  TimelineSchema,
} from './realmSchemas';
import {Alert} from 'react-native';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const updateTutorialStep = async step => {
  try {
    const realm = await Realm.open({
      schema: [TutorialStepSchema],
    });
    realm.write(() => realm.create('TutorialStep', {step}, true));
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const addName = async name => {
  try {
    const realm = await Realm.open({
      schema: [NameSchema],
    });

    realm.write(() => realm.create('Name', {name}));
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const addPerson = async (name, phone, atRisk, infected) => {
  try {
    const realm = await Realm.open({
      schema: [PersonSchema],
    });

    const isInfected = infected || false;

    realm.write(() =>
      realm.create(
        'Person',
        {
          id: uuidv4(),
          name,
          phone,
          atRisk,
          infected: isInfected,
        },
        true,
      ),
    );

    Alert.alert('Success', 'You added a thing!');
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const addEvent = async ({name, date, attendees, mask, indoors}) => {
  try {
    const realm = await Realm.open({
      schema: [EventSchema, PersonSchema],
    });

    realm.write(() => {
      realm.create(
        'Event',
        {
          id: uuidv4(),
          name: name,
          date: date,
          attendees: attendees,
          mask: mask,
          indoors: indoors,
        },
        true,
      );
    });

    Alert.alert('Success', 'You added a thing!');
    return null;
  } catch (err) {
    console.error(err);
  }
};

const addTimeline = async ({name, target, events}) => {
  try {
    const realm = await Realm.open({
      schema: [EventSchema, PersonSchema, TimelineSchema],
    });

    realm.write(() => {
      realm.create(
        'Timeline',
        {
          id: uuidv4(),
          name,
          target,
          events,
          date: new Date(),
        },
        true,
      );
    });

    Alert.alert('Success', 'You added a thing!');
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getTutorialStep = async () => {
  try {
    const realm = await Realm.open({
      schema: [TutorialStepSchema],
    });

    if (realm.objects('TutorialStep').length > 0) {
      const results = realm.objects('TutorialStep');
      const sortedResults = results.sorted('step', true);
      return sortedResults[0].step;
    }

    return 0;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getName = async () => {
  try {
    const realm = await Realm.open({
      schema: [NameSchema],
    });

    if (realm.objects('Name').length > 0) {
      return realm.objects('Name')[0].name;
    }

    return '';
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getPeople = async id => {
  try {
    const realm = await Realm.open({
      schema: [PersonSchema],
    });

    let persons = realm.objects('Person');

    if (id) {
      return persons.filtered(`id =  "${id}"`);
    }

    return persons;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getEvents = async (id, date) => {
  try {
    const realm = await Realm.open({
      schema: [PersonSchema, EventSchema],
    });
    const events = realm.objects('Event');

    if (id && date) {
      const twoWeeksAgo = new Date(date.getTime() - 12096e5);
      const filtered = events.filtered(
        `attendees.id = "${id}" AND date > $0`,
        twoWeeksAgo,
      );

      return filtered;
    }

    return events;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getTimelines = async () => {
  try {
    const realm = await Realm.open({
      schema: [PersonSchema, EventSchema, TimelineSchema],
    });

    const timelines = realm.objects('Timeline');

    return timelines;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export {
  updateTutorialStep,
  addEvent,
  addName,
  addPerson,
  addTimeline,
  getTutorialStep,
  getName,
  getEvents,
  getPeople,
  getTimelines,
};
