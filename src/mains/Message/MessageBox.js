// const MessageBox = () => {
//   return <div style={{ marginTop: '10rem' }}>hi</div>;
// };
// export default MessageBox;

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
import { socket } from '../../components/Socket';
import { useState, useEffect, useContext } from 'react';
import { Button, Grid } from '@mui/material';
import User from '../Chat/User';
import DeleteChat from './DeleteChat';
import RemoveAchat from './RemoveAchat';
import DisplayMessage from './DisplayMessage';
import mongoose from 'mongoose';
import DisplayMessage2 from './DisplayMessage2';
const MessageBox = props => {
  const userCtx = useContext(UserContext);

  const imgPath = 'http://192.168.1.241:8000';
  const [currentMessage, setCurrentMessage] = useState('');

  const [messageList, setMessageList] = useState([]);

  const postData = e => {
    if (currentMessage !== '') {
      const sendMessage = {
        messageId: new mongoose.Types.ObjectId().toHexString(),
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

  // const checkIsMessageDeleted = (item, deletedMessage) => {
  //   if (item.messageId === deletedMessage.messageId) {
  //     console.log('deleted message: ', item);
  //   }
  // };

  useEffect(() => {
    socket.on('deletedMessage', deletedMessage => {
      setMessageList(prev =>
        prev.filter(item => item.messageId !== deletedMessage.messageId)
      );
      // setMessageList(prev =>
      //   prev.filter(item => checkIsMessageDeleted(item, deletedMessage))
      // );
      // userCtx.setDelMsgId(deletedMessage.messageId);
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
        [userCtx.userData?._id, userCtx.receiver?._id]
          .sort()
          .toString()
          .replace(',', '_')
      );
    }
    fetch();
  }, [userCtx.receiver, socket]);

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
                            <DisplayMessage
                              name={userCtx.userData.name}
                              image={imgPath + userCtx.userData.image}
                              messageContent={messageContent}
                              sideData="right"
                              flexSide="flex-end"
                            />

                            {checkMessage(messageContent)}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className={classes.MessageLeft}
                            key={messageContent.messageId}
                          >
                            <DisplayMessage
                              name={userCtx.receiver.name}
                              image={imgPath + userCtx.receiver.image}
                              messageContent={messageContent}
                              sideData="left"
                              flexSide="flex-start"
                            />
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
