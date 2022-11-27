/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Button from '@mui/material/Button';
import { Block } from '@mui/icons-material';
import withAuth from '../lib/withAuth';
import {
  styleNameInput,
  styleMessageBox,
  styleRow,
  styleColumn,
  styleInputs,
  styleInputBox,
} from '../components/SharedStyles';

let socket;

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

// eslint-disable-next-line react/prefer-stateless-function
function Index() {
  const [uname, setUname] = useState('');
  const [chosenUname, setChosenUname] = useState();
  const [mess, setMess] = useState('');
  const [messs, setMesss] = useState([]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      // console.log('connected');
    });
    socket.on('messageToDisplay', (msg) => {
      setMesss((currentMess) => [...currentMess, { author: msg.author, mess: msg.mess }]);
    });
  };
  useEffect(() => {
    socketInitializer();
    return () => {
      // console.log('This will be logged on unmount');
    };
  }, []);

  const sendMessage = async () => {
    socket.emit('messageToPropogate', { author: chosenUname, mess });
    setMesss((currentMsg) => [...currentMsg, { author: chosenUname, mess }]);
    // console.log(message);
    setMess('');
  };

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (mess) {
        sendMessage();
      }
    }
  };

  return (
    <div>
      <main>
        {!chosenUname ? (
          <>
            <div style={styleNameInput}>
              <h1>What is your name?</h1>
              <input
                type="text"
                placeholder="Identity..."
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
              <Button
                onClick={() => {
                  setChosenUname(uname);
                }}
              >
                GO!
              </Button>
            </div>
          </>
        ) : (
          <>
            <div style={styleRow}>
              <div style={styleColumn}>
                <div style={styleMessageBox}>
                  {messs.map((msg, i) => {
                    return (
                      <div key={i}>
                        {msg.author} : {msg.mess} - {new Date().toLocaleString()}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={styleColumn}>
                <div style={styleInputs}>
                  <p>Your username: {uname}</p>
                  <input
                    style={styleInputBox}
                    type="textarea"
                    placeholder="New message..."
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                    onKeyUp={handleKeypress}
                  />
                  <Button
                    style={{ display: 'flex' }}
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send!
                  </Button>
                  <Button
                    style={{ display: 'inline' }}
                    onClick={() => {
                      // eslint-disable-next-line no-alert
                      alert('Fired too many developers, not implemented yet');
                    }}
                  >
                    Tweeter Green
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
