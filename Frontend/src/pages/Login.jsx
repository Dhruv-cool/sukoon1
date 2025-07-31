import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { app } from "../components/firebase-config";

function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get the secure ID token from Firebase
    const idToken = await user.getIdToken();

    // Save token for the axios interceptor to use
    localStorage.setItem("token", idToken);

    // Call the CORRECT backend endpoint
    await API.post("/users/login");

    // Set UI state and navigate
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("userPhoto", user.photoURL);
    setIsAuth(true);
    alert("Login successful!");
    navigate("/");

  } catch (err) {
    // Any error in the process will now be caught and displayed
    console.error("❌ Login or backend sync failed:", err);
    alert("Login failed. Check the developer console for error details.");
  }
};
  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
