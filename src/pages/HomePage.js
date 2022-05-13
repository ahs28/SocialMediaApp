import Sidebar from '../mains/Sidebar/Sidebar';
import Header from '../mains/Header/Header';
import { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import AuthContext from '../store/AuthContext';
import UserContext from '../store/UserContext';
import { Outlet } from 'react-router-dom';

const HomePage = props => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState({
    uid: '',
    name: '',
    email: '',
  });
  const loadData = async () => {
    const response = await fetch('http://192.168.1.241:8000/api/user', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
      },
      body: JSON.stringify(),
    });
    const actualData = await response.json();

    userCtx.setUserData(actualData.data);

    setUser(actualData.data);
  };
  // window.onclose = async () => {
  //   await fetch('http://192.168.1.241:8000/api/logout', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${authCtx.token}`,
  //     },
  //     body: JSON.stringify(),
  //   });
  //   authCtx.logout();
  // };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container style={{ width: '100%' }}>
      <Grid item xs={12} sm={12} md={12}>
        <header>
          <Header userData={userCtx.userData} />
        </header>
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <Sidebar userData={user} />
      </Grid>

      <Grid item xs={12} sm={6} md={10}>
        {/* <Post userData={user.name} /> */}
        <Outlet />
      </Grid>
    </Grid>
  );
};
export default HomePage;
