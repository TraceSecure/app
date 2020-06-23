const TutorialStepSchema = {
  name: 'TutorialStep',
  properties: {
    step: {type: 'int', default: 0},
  },
};

const NameSchema = {
  name: 'Name',
  properties: {
    name: 'string',
  },
};

const PersonSchema = {
  name: 'Person',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    phone: 'string',
    infected: 'bool',
    atRisk: 'bool',
  },
};

const EventSchema = {
  name: 'Event',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    date: 'date',
    attendees: 'Person[]',
    mask: 'bool',
    indoors: 'bool',
  },
};

const TimelineSchema = {
  name: 'Timeline',
  primaryKey: 'id',
  properties: {
    date: 'date',
    id: 'string',
    name: 'string',
    target: 'Person',
    events: 'Event[]',
  },
};

export {
  TutorialStepSchema,
  NameSchema,
  PersonSchema,
  EventSchema,
  TimelineSchema,
};
