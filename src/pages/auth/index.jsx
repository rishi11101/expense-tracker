import { auth, provider } from "../../config/firebase-config";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import './styles.css'

import { signInWithPopup } from 'firebase/auth'

export const Auth = () => {

    let navigate = useNavigate();

    const { isAuth } = useGetUserInfo();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider)
        // console.log(results)

        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true   //user loggedin or not
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));

        navigate("/expense-tracker");
    }    

    if (isAuth) {
        return <Navigate to="/expense-tracker" />;
      }

      return (
        <div className="login-page">
          <p>Sign In With Google to Continue</p>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign In With Google
          </button>
        </div>
      );
};