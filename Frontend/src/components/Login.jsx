// src/components/Login.jsx
import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { app } from "../firebase-config";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await API.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      // Set localStorage auth flags
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userPhoto", user.photoURL);

      alert("Login successful!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
