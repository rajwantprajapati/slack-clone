import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import "./Login.css";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();

  const handleLoginClick = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        dispatch({ 
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  return (
    <div className="login">
        <div className="login__container">
            <img
                src="https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png"
                alt=""
            />
            <h1>Sign in into slack</h1>
            <p>slack-clone.slack.com</p>
            <Button onClick={handleLoginClick}>Sign in with Google</Button>
        </div>
    </div>
  );
};

export default Login;
