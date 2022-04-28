// const MessageBox = () => {
//   return <div style={{ marginTop: '10rem' }}>hi</div>;
// };
// export default MessageBox;
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import io from 'socket.io-client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import classes from './MessageBox.module.css';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import ScrollToBottom from 'react-scroll-to-bottom';
import Typography from '@mui/material/Typography';
import UserContext from '../../store/UserContext';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import User from '../Chat/User';
import DeleteChat from './DeleteChat';
import RemoveAchat from './RemoveAchat';
const socket = io.connect('http://192.168.1.241:8000');
const MessageBox = props => {
  const userCtx = useContext(UserContext);

  const imgPath = 'http://192.168.1.241:8000';
  const [currentMessage, setCurrentMessage] = useState('');

  const [messageList, setMessageList] = useState([]);

  const postData = e => {
    if (currentMessage !== '') {
      const sendMessage = {
        senderid: userCtx.userData._id,
        sendername: userCtx.userData.name,
        receiverid: userCtx.receiver._id,
        username: userCtx.receiver.name,
        message: currentMessage,
        time: new Date().getTime(),
        room: [userCtx.userData._id, userCtx.receiver._id]
          .sort()
          .toString()
          .replace(',', '_'),
      };
      socket.emit('sendMessage', sendMessage);

      setMessageList(list => [...list, sendMessage]);

      setCurrentMessage('');
    }
  };
  useEffect(() => {
    socket.on('receiveMessage', receiveMessage => {
      setMessageList(list => [...list, receiveMessage]);
    });
  }, [socket]);

  const getSavedData = data => {
    setMessageList(data);
  };

  const checkMessage = messageContent => {
    if (messageContent.message !== 'This Message was Deleted.') {
      return <RemoveAchat messageContent={messageContent} />;
    }
  };

  useEffect(() => {
    async function fetch() {
      getSavedData();
      socket.emit('leaveChat');
      socket.emit(
        'joinChat',
        [userCtx.userData._id, userCtx.receiver._id]
          .sort()
          .toString()
          .replace(',', '_')
      );
    }
    fetch();
  }, [userCtx.receiver]);

  return (
    <Grid container style={{ width: '100%' }}>
      <Grid item xs={12} sm={6} md={8}>
        <div>
          <AppBar
            position="static"
            color="inherit"
            style={{ marginTop: '5rem' }}
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                {userCtx.receiver ? (
                  <>
                    <Avatar
                      alt={userCtx.receiver.name}
                      src={imgPath + userCtx.receiver.image}
                    />
                    <Typography
                      variant="h6"
                      noWrap
                      padding={'1rem'}
                      sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                      {userCtx.receiver.name}
                    </Typography>

                    <div
                      style={{
                        marginLeft: 'auto',
                        marginRight: 0,
                      }}
                    >
                      <DeleteChat
                        senderid={userCtx.userData._id}
                        receiverid={userCtx.receiver._id}
                        setMessageList={setMessageList}
                      />
                    </div>
                  </>
                ) : (
                  'start your chat here'
                )}
              </Toolbar>
            </Container>
          </AppBar>
          <div>
            <ScrollToBottom>
              <div className={classes.MessageBoxContainer}>
                {messageList
                  ? messageList.map(messageContent => {
                      if (
                        messageContent.senderid === userCtx.userData._id ||
                        messageContent.fromSelf === true
                      ) {
                        return (
                          <div
                            className={classes.MessageRight}
                            key={messageContent.messageId}
                          >
                            <List>
                              <ListItem>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <ListItemText
                                      align="right"
                                      primary={
                                        <>
                                          <span
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'flex-end',
                                            }}
                                          >
                                            <span
                                              style={{
                                                marginTop: '0.5rem',
                                                marginRight: '0.5rem',
                                              }}
                                            >
                                              {messageContent.message}
                                            </span>
                                            <span>
                                              <Avatar
                                                alt={userCtx.receiver.name}
                                                src={
                                                  imgPath +
                                                  userCtx.userData.image
                                                }
                                              />
                                            </span>
                                          </span>
                                        </>
                                      }
                                    ></ListItemText>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <ListItemText
                                      align="right"
                                      secondary={
                                        <>
                                          <span>
                                            {new Date(
                                              messageContent.time
                                            ).toLocaleString('en-us', {
                                              minute: 'numeric',
                                              hour: 'numeric',
                                            })}
                                          </span>
                                          &nbsp;
                                          {/* <span>Me</span> */}
                                        </>
                                      }
                                    ></ListItemText>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            </List>

                            {/* {checkMessage(messageContent)} */}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className={classes.MessageLeft}
                            key={messageContent.messageId}
                          >
                            <List>
                              <ListItem>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <ListItemText
                                      align="left"
                                      primary={
                                        <span
                                          style={{
                                            display: 'flex',
                                          }}
                                        >
                                          <span>
                                            <Avatar
                                              alt={userCtx.receiver.name}
                                              src={
                                                imgPath + userCtx.receiver.image
                                              }
                                            />
                                          </span>
                                          <span
                                            style={{
                                              marginLeft: '0.5rem',
                                              marginTop: '0.5rem',
                                            }}
                                          >
                                            {messageContent.message}
                                          </span>
                                        </span>
                                      }
                                    ></ListItemText>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <ListItemText
                                      align="left"
                                      secondary={
                                        <>
                                          <span>
                                            {new Date(
                                              messageContent.time
                                            ).toLocaleString('en-us', {
                                              minute: 'numeric',
                                              hour: 'numeric',
                                            })}
                                          </span>
                                          &nbsp;
                                          {/* <span>{userCtx.receiver.name}</span> */}
                                        </>
                                      }
                                    ></ListItemText>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            </List>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
            </ScrollToBottom>
          </div>
          {userCtx.receiver ? (
            <div>
              <TextField
                // fullWidth
                label="Start Your Chat Here"
                style={{ height: '1rem', width: '80%' }}
                type="text"
                onChange={e => setCurrentMessage(e.target.value)}
                value={currentMessage}
                autoComplete="off"
                onKeyPress={event => {
                  event.key === 'Enter' && postData();
                }}
              ></TextField>
              <Button
                style={{ width: '20%', height: '3.5rem' }}
                variant="contained"
                onClick={postData}
              >
                Send
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <User getSavedData={getSavedData} />
      </Grid>
    </Grid>
  );
};
export default MessageBox;
