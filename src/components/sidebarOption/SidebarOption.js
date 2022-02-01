import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import "./SidebarOption.css";

const SidebarOption = ({ Icon, title, id, addChannelOption }) => {
    const navigate = useNavigate();

    const  addChannel = async() => {
        const channelName = prompt('Please enter the channel name');

        if (channelName) {
            const collectionRef = collection(db, 'rooms');
            
            await addDoc(collectionRef, {name: channelName});
        }
    };

    const selectChannel = () => {
        if (id) {
            navigate(`room/${id}`);
        } else {
            navigate(title);
        }
    };

    return (
        <div className="sidebar-option" onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebar-option__icon"/>}
            {Icon ? (
                <h3>{title}</h3>
            ): (
                <h3 className="sidebar-option__channel">
                    <span className="sidebar-option__hash">#</span>{title}
                </h3>
            )}
        </div>
    )
}

export default SidebarOption;
