import { useEffect } from "react";
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInAnonymously } from "firebase/auth";
import { useAppDispatch } from "@/redux/hooks";
import { signedInAnonymously } from "@/features/auth/authSlice";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  setPersistence(getAuth(), browserLocalPersistence);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("signed in", uid);
        if (user.isAnonymous) {
          dispatch(signedInAnonymously(uid));
        }
      } else {
        const cred = await signInAnonymously(getAuth());
        console.log("signed in anonymously", cred);
        return;
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
};
