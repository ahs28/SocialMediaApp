import { Routes, Route, Navigate } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import HomePage from './pages/HomePage';
import UserPost from './mains/Post/UserPost';
import MessageBox from './mains/Message/MessageBox';
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/home" element={<HomePage />}>
              <Route path="userpost" element={<UserPost />}></Route>
              <Route path="feed" element={<Feed />}></Route>
              <Route path="messagebox" element={<MessageBox />} />
            </Route>
            <Route path="*" element={<Navigate to="/home/feed" replace />} />
          </>
        )}

        {!isLoggedIn && <Route path="/signup" element={<Signup />}></Route>}
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
