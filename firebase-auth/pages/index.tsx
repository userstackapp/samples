import { app } from "@/clients/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useUserstack from "@userstack/react";

export default function Home() {
  const { identify } = useUserstack();

  const signin = async () => {
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

  const testBackendCall = async () => {
    const response = await fetch("/api/test");
    const data = await response.json();
    console.log(data);
  };

  return (
    <main>
      <h1>Userstack Firebase Authentication Sample</h1>
      <button onClick={signin}>Sign in with Google</button>
      <button onClick={testBackendCall}>Test backend call</button>
    </main>
  );
}
