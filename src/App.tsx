import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Input from './components/Input';
import GuessList from './components/GuessList';

function App() {
  return (
    <main className='center'>
      <Input />
      <GuessList />
    </main>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;