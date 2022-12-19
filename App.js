import 'react-native-gesture-handler';
import { ModalContextProvider } from './context/ModalContext';
import AppStack from './navigation/AppStack';

export default function App() {
  return (   
    <ModalContextProvider>
       <AppStack/>
    </ModalContextProvider>
   
  );
}


