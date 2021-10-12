import "./styles.scss";
import { Icon } from "react-icons-kit";
import { ic_login } from "react-icons-kit/md/ic_login";
import AppLogo from "../AppLogo";

const Login = (props) => {
  return (
    <div className="login-wrapper">
      <div className="app-logo login">
        <AppLogo />
      </div>
      <div className="button login-btn" onClick={props.handleLogin}>
        Login With Spotify <Icon icon={ic_login} />
      </div>
    </div>
  );
};

export default Login;
