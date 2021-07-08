import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

// Initialize App 
export const handleInitializeApp = () =>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const{displayName, email, photoURL}= result.user;
            const signedInUser = {
                name:displayName,
                email:email,
                photo: photoURL
            }
            storeAuthToken();
            return signedInUser;

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}

const storeAuthToken = () =>{
    firebase.auth().currentUser.getIdToken(true)
    .then(function (idToken) {
        sessionStorage.setItem('token',idToken);
    }).catch(function (error) {
        console.log(error)
    });
}