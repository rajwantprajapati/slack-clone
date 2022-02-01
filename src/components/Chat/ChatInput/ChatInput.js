import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import db from "../../../firebase";
import { useStateValue } from "../../../StateProvider";
import "./ChatInput.css";

const ChatInput = ({ channelName, channelId  }) => {
    const [userInput, setUserInput] = useState('');
    const [{ user }] = useStateValue();

    const sendMessage = async(e) => {
        e.preventDefault();

        if (channelId) {
            const collectionRef = collection(db, 'rooms', channelId, 'messages');
            
            await addDoc(collectionRef, {
                message: userInput,
                timestamp: serverTimestamp(),
                user: user?.displayName,
                userImage: user?.photoURL,
            });

            setUserInput('');
        }
    };

    return (
        <div className='chat-input'>
            <form>
                <input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder={`Message #${channelName}`}
                />
                <button
                    type="submit"
                    onClick={sendMessage}
                >
                    SEND
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
