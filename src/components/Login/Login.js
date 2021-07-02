import React, { useContext } from 'react';
import { handleGoogleSignIn, handleInitializeApp } from './LoginManager';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();

    const {from} = location.state || {from: {pathName : '/'}}
    // initialize app 
    handleInitializeApp();
    // google sign in 
    const googleSignIn = () =>{
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res);
        })
    }
    // handleResponse
    const handleResponse = (res) => {
        setLoggedInUser(res)
        history.replace(from)
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={googleSignIn}>Sign In by Google</button>
        </div>
    );
};

export default Login;