import classes from './Sidebar.module.css';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import AuthContext from '../../store/AuthContext';
import TotalPost from '../Post/TotalPost';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const Sidebar = props => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const imgPath = 'http://192.168.1.241:8000';

  const logoutHandler = async () => {
    await fetch('http://192.168.1.241:8000/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(),
    });
    authCtx.logout();
  };

  return (
    <Container>
      <div className={classes.sideBarContainer}>
        <div className={classes.profileImg}>
          <Avatar
            alt="Profile"
            src={`${imgPath}${props.userData.image}`}
            sx={{ width: 150, height: 150 }}
            className={classes.profileimg}
          />
        </div>
        <div className={classes.profileHead}>
          <h5>{props.userData.name}</h5>
          <p>{props.userData.email}</p>
        </div>
        <div className={classes.profileDetailsNumber}>
          <span>
            <TotalPost userData={props.userData.name} />
          </span>
          <span>100</span>
          <span>50</span>
        </div>
        <div className={classes.profileDetails}>
          <span>Post</span>
          <span>Followers</span>
          <span>following</span>
        </div>
        <div className={classes.profileIndex}>
          <div>
            <Link to="/home/feed">Feed</Link>
          </div>

          <div>
            <Link to="/home/userpost">Post</Link>
          </div>
          <div>
            <Link to="/home/feed">Notification</Link>
          </div>
          <div>
            <Link to="/home/messagebox">Messages</Link>
          </div>
          <div>
            <Link to="/home/feed">Direct</Link>
          </div>
          <div>
            <Link to="/home/feed">Stats</Link>
          </div>
          <div>
            <Link to="/home/feed">Settings</Link>
          </div>
          {isLoggedIn && <div onClick={logoutHandler}> Logout</div>}
        </div>
      </div>
    </Container>
  );
};
export default Sidebar;
