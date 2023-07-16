import React from 'react';

import {useTVEventHandler} from 'react-native';

import Navigation from './src/navigation';

// const Stack = createStackNavigator();

function App(): JSX.Element {
  const [lastEventType, setLastEventType] = React.useState('');

  const myTVEventHandler = (evt: {eventType: React.SetStateAction<string>}) => {
    setLastEventType(evt.eventType);
  };
  console.log(lastEventType);
  useTVEventHandler(myTVEventHandler);

  return <Navigation />;
}

// const styles = StyleSheet.create({});

export default App;
