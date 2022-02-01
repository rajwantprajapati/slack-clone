import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "./Chat.css";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../firebase";
import Message from "../Message/Message";
import ChatInput from "./ChatInput/ChatInput";

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    const getDocument = async() => {
        const docRef = doc(db, 'rooms', roomId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            setRoomDetails(docSnap.data());
        }
    }

    const getRoomMessages = () => {
        const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp', 'asc'));

        onSnapshot(q, (querySnapshot) => {
           setRoomMessages(querySnapshot.docs.map(message => message.data()));
        });

    }
      
    getDocument();
    getRoomMessages();
  }, [roomId]);

  console.log(roomDetails);

  return (
    <div className="chat">
        <div className="chat__header">
            <div className="chat__header-left">
                <h2 className="chat__channel-name">
                    <strong>#{roomDetails?.name}</strong>
                    <StarBorderOutlinedIcon />
                </h2>
            </div>
            <div className="chat__header-right">
                <p><InfoOutlinedIcon /> Details</p>
            </div>
        </div>

        <div className="chat__messages">
            {roomMessages.map(({message, timestamp, user, userImage}) => (
                <Message
                    key={timestamp}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                />
            ))}
        </div>

        <ChatInput
            channelName={roomDetails?.name}
            channelId={roomId}
        />
    </div>
  );
};

export default Chat;
