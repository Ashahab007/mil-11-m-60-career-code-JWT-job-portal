import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../public/firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);

      setUser(currentUser);
      setLoading(false);
      // 4.1 in client side when user is logged in and has the currentUser
      if (currentUser?.email) {
        const userData = { email: currentUser.email }; //as we have send the email from server so we set the current user email from the client side

        // 4.2 now using axios we sent to the email to the server
        axios
          .post("http://localhost:3000/jwt", userData)
          .then((res) => {
            console.log("token after jwt", res.data);
            const token = res.data.token; //just took the token from res.data
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    loading,
    signInUser,
    user,

    userSignOut,
    googleSignIn,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
