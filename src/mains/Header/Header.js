import { useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import classes from './Header.module.css';
import AddProfile from '../profile/AddProfile';
import AddPost from '../Post/AddPost';

const Header = props => {
  const [profileShow, setProfileShow] = useState(false);

  const showProfileHandler = () => {
    setProfileShow(true);
  };
  const hideProfileHandler = () => {
    setProfileShow(false);
  };
  const [postShow, setPostShow] = useState(false);

  const showPostHandler = () => {
    setPostShow(true);
  };
  const hidePostHandler = () => {
    setPostShow(false);
  };

  return (
    <>
      <div className={classes.appHeader}>
        <Row className={classes.appItems}>
          <Col sm={2}>
            <NavLink>ReactApp</NavLink>
          </Col>
          <Col sm={4}>
            <NavLink>Search</NavLink>
          </Col>
          <Col sm={2}>
            <NavLink onClick={showProfileHandler}>Profile</NavLink>
            {profileShow && <AddProfile onClose={hideProfileHandler} />}
          </Col>
          <Col sm={2}>
            <NavLink onClick={showPostHandler}>Post</NavLink>
            {postShow && <AddPost onClose={hidePostHandler} />}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Header;
