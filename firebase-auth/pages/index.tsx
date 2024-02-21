import { app } from "@/clients/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import useUserstack from "@userstack/react";

export default function Home() {
  const { identify } = useUserstack();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential?.idToken) {
          // Set up a Userstack session for the user
          identify(credential.idToken, {});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const registerWithEmail = async () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(async (userCredential): Promise<any> => {
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        identify(idToken, {});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signinWithEmail = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, signinEmail, signinPassword)
      .then(async (userCredential): Promise<any> => {
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        identify(idToken, {});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const testBackendCall = async () => {
    const response = await fetch("/api/test");
    const data = await response.json();
    console.log(data);
  };

  return (
    <main>
      <h1>Userstack Firebase Authentication Sample</h1>

      <div>
        <h2>Google SSO</h2>
        <button onClick={signinWithGoogle}>Sign in with Google</button>
      </div>

      <div>
        <h2>Email/password (register)</h2>
        <input
          type="email"
          onChange={(e) => setRegisterEmail(e.target.value)}
          value={registerEmail}
        />
        <input
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          value={registerPassword}
        />
        <button onClick={registerWithEmail}>Register</button>
      </div>

      <div>
        <h2>Email/password (signin)</h2>
        <input
          type="email"
          onChange={(e) => setSigninEmail(e.target.value)}
          value={signinEmail}
        />
        <input
          type="password"
          onChange={(e) => setSigninPassword(e.target.value)}
          value={signinPassword}
        />
        <button onClick={signinWithEmail}>Sign in</button>
      </div>

      <div>
        <h2>Backend verify</h2>
        <button onClick={testBackendCall}>Test backend call</button>
      </div>
    </main>
  );
}
