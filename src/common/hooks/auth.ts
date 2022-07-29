import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@modules/auth/firebase/clientApp";
const auth = getAuth(firebaseApp);
export function useIdToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async function (user) {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      }
    });
  });

  return token;
}
