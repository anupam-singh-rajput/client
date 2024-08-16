import io from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
const apiUrl = process.env.REACT_APP_API_URL;

const socket = io(`${apiUrl}`);

const Chats = React.memo(({ selectedUser }) => {
  const [inpmsg, setinpmsg] = useState(''); // Current input message
  const [roomid, setroomid] = useState(); // Room ID for the selected user
  const [loggedemail, setloggedemail] = useState(''); // Logged-in user's email
  const [postmsgs, setpostmsgs] = useState([]); // Stored messages
  const token = Cookies.get('token'); // JWT token
  const messagesEndRef = useRef(null); // Reference to the end of messages

  useEffect(() => {
    const createRoom = async () => {
      try {
        if (!selectedUser) {
          throw new Error('Selected user is not defined');
        }

        const response = await fetch(`${apiUrl}/api/users/chatroom`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({ email: selectedUser }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setroomid(data.chatRoom._id);
        setloggedemail(data.email);
        setpostmsgs(data.messages);
        console.log(data);

      } catch (error) {
        console.error('Error creating room:', error.message);
      }
    };

    if (selectedUser) {
      createRoom();
    }
  }, [selectedUser, token]);

  useEffect(() => {
    if (roomid) {
      socket.emit('joinRoom', roomid);
    }
  }, [roomid]);

  const sendMessage = () => {
    if (!loggedemail) {
      console.error('Logged email is not defined');
      return;
    }
    socket.emit('email&message&roomid', [selectedUser, inpmsg, roomid, loggedemail]);
    setinpmsg('');
  };

  useEffect(() => {
    const handleMessage = (serverMsg) => {
      if (serverMsg && serverMsg.content) {
        setpostmsgs((prevMsgs) => [...prevMsgs, serverMsg]);
        scrollToBottom();
      } else {
        console.error('Received message is not in expected format:', serverMsg);
      }
    };

    socket.on('message', handleMessage);

    // Cleanup socket listener on component unmount
    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [postmsgs]);

  return (
    <div className="right-container w-[77.8%] h-[90%] bg-white flex flex-col relative overflow-hidden">
      {roomid ? (
        <div className="flex flex-col h-full">
          <div className="messages flex flex-col p-4 overflow-y-auto flex-grow">
            {postmsgs.map((msg) => (
              <div key={msg._id} className="message-container flex flex-col mb-4">
                <div
                  className={`message p-2 rounded-md flex flex-col items-start ${
                    msg.sender === loggedemail ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
                  }`}
                >
                  <div>{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="message-input w-full bg-gray-200 p-2 flex-shrink-0 flex justify-between">
            <input
              type="text"
              value={inpmsg}
              onChange={(e) => setinpmsg(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow p-2 border rounded-md w-[90%]"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-tr from-purple-900 to-indigo-900 text-white px-4 py-2 rounded-md ml-2"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <h1 className="pt-44 opacity-30 text-base">Tap into the any user</h1>
      )}
    </div>
  );
});

export default Chats;
