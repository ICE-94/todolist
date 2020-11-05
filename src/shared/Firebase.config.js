import React, { createContext, useState } from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCTRBYgCT1RXbP97b8ap5zEYekUKUscPC0",
  authDomain: "todolist-e11c9.firebaseapp.com",
  databaseURL: "https://todolist-e11c9.firebaseio.com",
  projectId: "todolist-e11c9",
  storageBucket: "todolist-e11c9.appspot.com",
  messagingSenderId: "290029560930",
  appId: "1:290029560930:web:5a35a2901faa65ccc85d3b",
  measurementId: "G-KYGZVVEEM6"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();

export const login = (user) => {
  if (user) {
    return null;
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

  return firebase.auth().signInWithPopup(provider);
}

export const logout = () => {
  return firebase.auth().signOut();
}

export const getFireDB = () => {
  return database.ref('/').once('value');
};

export const setTest = () => {
  database.ref('/test').set({
    0: {test: 'test입니다'},
    1: {test: 'test입니다2'}
  });
};

export const updateTodoElement = (data) => {
  console.log(firebase.auth().currentUser.uid);
  database.ref(`${firebase.auth().currentUser.uid}`).once('value').then((result) => {
    const index = result.val().length;

    database.ref(`${firebase.auth().currentUser.uid}/${index}`).set(data);
  });

  // return database.ref(`/${firebase.auth().currentUser.providerData[0].uid}`).set(data);
}

export const addOnAuthChange = (setUser) => {
  firebase.auth().onAuthStateChanged((connectedUser) => {
    if (connectedUser != null) {
      setUser(connectedUser);
    }
  });
};

export const test = () => {
  console.log(firebase.auth().currentUser);
}





// // console.log(firebase);
// firebase.initializeApp(firebaseConfig);

// // if (!firebase.apps.length) {
// //   firebase.initializeApp(firebaseConfig);
// // }

// //////////////log in
// export const addOnAuthChange = (setUser) => {
//   firebase.auth().onAuthStateChanged((connectedUser) => {
//     if (connectedUser != null) {
//       setUser(connectedUser);
//     }
//   });
// };

// export const logIn = async () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope(
//     'https://www.googleapis.com/auth/contacts.readonly',
//   );
//   //firebase.auth().languageCode = 'pt';
//   provider.setCustomParameters({
//     login_hint: 'user@example.com',
//   });

//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     // const token = result.credential.accessToken;
//     // const user

//     console.log(result);

//     return true;
//   } catch (error) {

//     console.log(error);
//     // Handle Errors here.
//     // var errorCode = error.code;
//     // var errorMessage = error.message;
//     // The email of the user's account used.
//     // var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     // var credential = error.credential;
//     // ...
//     return false;
//   }
// };
// ////////////////////

// //////////////log out
// export const logOut = async (setUser) => {
//   try {
//     await firebase.auth().signOut();
//     setUser(null);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };
// /////////////////////

/////////////////context
export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const context = {
    user,
    setUser,
  };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};
////////////////////////