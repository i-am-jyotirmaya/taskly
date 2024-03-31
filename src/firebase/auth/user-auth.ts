import { signedInAnonymously } from "@/features/auth/authSlice";
import { store } from "@/redux/store";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(getAuth(), async (user) => {
  if (user) {
    const uid = user.uid;
    if (user.isAnonymous) {
      store.dispatch(signedInAnonymously(uid));
    }
  } else {
    const cred = await signInAnonymously(getAuth());
    console.log("signed in anonymously", cred);
    return;
  }
});
