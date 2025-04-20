import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatLlm, type Message } from 'react-native-chat-llm';
// import { styles } from './styles';

const App = () => {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([]);
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

  //TODO(ME): Add a navigation bar at the top to help get the functionalities right in it's envirnment
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          setTimeout(() => setRefreshing(false), 10000);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
