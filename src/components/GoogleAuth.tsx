import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../db/firebbase.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks.ts";
import { setUser } from "../store/appSlice.ts";

export function GoogleLogin() {
  const user = useAppSelector((state) => state.appData.user);
  const dispatch = useDispatch();
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setUser(user));
      console.log("Вошли как:", user.displayName, user.email, user.uid);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
    }
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        console.log("Пользователь вышел");
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.error("Ошибка выхода:", error);
      });
  };

  return user
    ? <button onClick={logOut}>Logout</button>
    : <button onClick={signIn}>Login</button>
}
