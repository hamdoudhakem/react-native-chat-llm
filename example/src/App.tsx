import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatLlm } from 'react-native-chat-llm';
// import { styles } from './styles';

const App = () => {
  const [msg, setMsg] = useState('');
  // const [msgs, setMsgs] = useState(['Hu', 'By', 'Yp', '**ffdfd**']);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatLlm
        msg={msg}
        setMsg={setMsg}
        msgs={[]}
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
