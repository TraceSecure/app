import {useEffect} from 'react';
import tutsteps from '../utilities/tutsteps';
import {getTutorialStep, updateTutorialStep} from '../../realmQueries';

export default function useTutorialLogic(
  page,
  start,
  copilotEvents,
  navigation,
  firstTime,
) {
  useEffect(() => {
    let cleanup;

    if (!firstTime) {
      copilotEvents.on('stepChange', ({order: step}) => {
        updateTutorialStep(step);
        console.log('change', step);
      });

      copilotEvents.on('stop', evt => {
        console.log('stop', evt);
        updateTutorialStep(tutsteps[page]);
      });

      async function fetchtutstep() {
        const step = await getTutorialStep();
        console.log('hey', step);
        console.log('hey2', tutsteps[page]);
        if (step < tutsteps[page] || step === undefined) {
          console.log('hey3', step);
          setTimeout(() => {
            start();
          }, 1000);
        }
      }

      const unsubscribeFocus = navigation.addListener('focus', () => {
        fetchtutstep();
      });

      const unsubscribeBlur = navigation.addListener('blur', () => {
        navigation.setParams({person: null, adding: null});
      });

      fetchtutstep();

      cleanup = () => {
        unsubscribeFocus();
        unsubscribeBlur();
        copilotEvents.off('stepChange');
        copilotEvents.off('stop');
      };
    }

    return cleanup;
  }, [copilotEvents, firstTime, navigation, page, start]);
}
