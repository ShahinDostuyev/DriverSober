import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatScreen = ({ route }) => {
  const { ride } = route.params;
  const user = useSelector((state) => state.user.user);

  const senderId = user._id;
  const rideId = ride._id;
  console.log("Ride in chat", rideId);

  const [content, setContent] = useState("");
  console.log("Content: ", content);
  const [messages, setMessages] = useState([]);

  console.log("Messages: ", messages);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const fetchMessages = async () => {
    await axios
      .get(`https://soberlift.onrender.com/api/getMessages/${String(rideId)}`)
      .then((response) => {
        console.log("Response data: ", response.data);
        if (response.data.messages) {
          const fetchedMessages = response.data.messages.map((message) => ({
            _id: message._id,
            text: message.content,
            createdAt: new Date(message.timestamp),
            user: {
              _id: message.sender._id,
              name: message.sender.name,
            },
          }));
          setMessages(fetchedMessages);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch messages: ", error.message);
      });
  };

  const sendMessage = async (newMessage) => {
    await axios
      .post(`https://soberlift.onrender.com/api/sendMessage`, {
        sender: {
          _id: senderId,
          name: `${user.name} ${user.surname}`,
        },
        rideId: rideId,
        content: newMessage.text,
      })
      .then((response) => {
        console.log("Message sent: ", response.data.message);
        fetchMessages(); // Refresh messages after sending a new message
      })
      .catch((error) => {
        console.error("Failed to send messages: ", error.message);
      });
  };

  const handleSend = (newMessages = []) => {
    const newMessage = newMessages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    console.log("NewMEssage: ", newMessage);
    sendMessage(newMessage);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: styles.rightBubble,
          left: styles.leftBubble,
        }}
        textStyle={{
          right: styles.rightText,
          left: styles.leftText,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: senderId }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightBubble: {
    backgroundColor: "#dcf8c6",
  },
  leftBubble: {
    backgroundColor: "#ebebeb",
  },
  rightText: {
    color: "#000",
  },
  leftText: {
    color: "#000",
  },
});

export default ChatScreen;
