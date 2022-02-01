import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }] = useStateValue();

  console.log(user);

  return (
    <div className="app">
      {!user ? ( <Login />): (
        <>
          <Header />

          <div className="app__body">
            <Sidebar />
            {/* Router- Chat screen */}
            <Routes>
              <Route path="/" element={<h1>Welcome</h1>} />
              <Route path="/room/:roomId" element={<Chat />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
