import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, provider } from "../db/firebbase.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks.ts";
import { setUser } from "../store/appSlice.ts";
import {Modal} from "./Modal/Modal.tsx";

export function GoogleLogin() {
  const [logoutModal, setLogoutModal] = useState(false);

  const user = useAppSelector((state) => state.appData.user);
  const dispatch = useDispatch();
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setUser(user));
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
    setLogoutModal(false);
  };

  return (
    <>
      {  user
        ? <button
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center bg-danger-subtle m-3 text-dark fs-4"
          style={{width: "48px", height: "48px" }}
          onClick={() => setLogoutModal(true)}
        >
          {user.displayName![0].toUpperCase()}
        </button>
        : <button
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center bg-info-subtle m-3"
          style={{width: "48px", height: "48px" }}
          onClick={signIn}
        >
          <FontAwesomeIcon icon={faGoogle} className="text-success" />
        </button>
      }
      { logoutModal &&
        <Modal onClose={() => setLogoutModal(false)}>
          <div className="text-center m-3 display-6 text-info">{user!.displayName}</div>
          <div className="text-center m-3 display-6 text-success">{user!.email}</div>
          <div className="text-center m-3 display-6 text-warning">{user!.uid}</div>
          <div className="d-flex justify-content-center m-3">
            <div className="btn btn-primary w-25 " onClick={logOut}>Logout</div>
          </div>
        </Modal>}
    </>
  )

}
