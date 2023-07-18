import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {shallow} from 'zustand/shallow';
import {useTVEventHandler} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {useStore} from './src/stores/store';
import Navigation from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App(): JSX.Element {
  const [lastEventType, setLastEventType] = React.useState('');
  const queryClient = new QueryClient();
  enableScreens(true);
  const [initializing, setInitializing] = useState(true);
  const {checkUser} = useStore(
    state => ({
      checkUser: state.checkUser,
    }),
    shallow,
  );

  useEffect(() => {
    (async () => {
      try {
        await checkUser();
        setInitializing(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [checkUser]);

  const myTVEventHandler = (evt: {eventType: React.SetStateAction<string>}) => {
    setLastEventType(evt.eventType);
    console.log(evt, 'EVENT');
  };
  console.log(lastEventType);
  useTVEventHandler(myTVEventHandler);

  if (initializing) {
    return <></>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
