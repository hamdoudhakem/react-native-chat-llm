import { useState } from 'react';
import { View } from 'react-native';
import { ChatLlm, type Message, MsgsPlaceholders } from 'react-native-chat-llm';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { styles } from './styles';

const Stack = createNativeStackNavigator();

const Home = () => {
  const [msgPortionIndex, setMsgPortionIndex] = useState(25);

  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState<Message[]>(
    MsgsPlaceholders.slice(msgPortionIndex)
  );
  const [refreshing, setRefreshing] = useState(false);

  const [stopResponse, setStopResponse] = useState(false);

  async function MsgGeneratorTest(func: (token: string) => void) {
    const text = 'Hello, this is a test message from the AI.';
    for (let i = 0; i < text.length; i++) {
      if (stopResponse) {
        console.log('Stopping the response');
        break;
      }
      func(text[i]!);
      console.log('Loaded a letter: ', text[i]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  function cancelResponseTest() {
    setStopResponse(true);
    setTimeout(() => {
      setStopResponse(false);
    }, 1000);
  }

  // console.log(
  //   'Refreshed(App): with last message msgs is equal to ',
  //   msgs?.[msgs.length - 1]
  // );

  return (
    <View style={{ flex: 1 }}>
      <ChatLlm
        msg={msg}
        setMsg={setMsg}
        msgs={msgs}
        setMsgs={setMsgs}
        MsgGenerator={MsgGeneratorTest}
        cancelResponse={cancelResponseTest}
        backgroundImage={require('../assets/background.png')}
        saveOption={'MMKV'}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);

          //An Example on Refreshing the list
          setTimeout(
            () => {
              setMsgs(
                MsgsPlaceholders.slice(
                  msgPortionIndex - 5 <= 0 ? 0 : msgPortionIndex - 5
                )
              );
              setMsgPortionIndex((prev) => {
                if (prev - 5 >= 0) {
                  return prev - 5;
                }
                return 0;
              });
              setRefreshing(false);
            },

            500
          );
        }}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
