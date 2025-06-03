import { type Dispatch, useState } from "react";
import { Link } from "react-router-dom";
import { NavigationLink } from "../../elements/NavigationLink.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser, type TUserData, setTheme } from "../../store/appSlice.ts";
import "./Navbar.css";
import { pages } from "../Router.tsx";
import { Modal } from "../Modal/Modal.tsx";
import { Input } from "../../elements/Input.tsx";


export function Navbar() {
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.appData.user);
  const theme = useAppSelector((state) => state.appData.theme);
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/">
            <div className="logo"></div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {getLinks(user)}
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckChecked"
                onInput={() => dispatch(setTheme(theme === "dark"? "light" : "dark"))} />
              <label className="form-check-label" htmlFor="switchCheckChecked">Theme</label>
            </div>
            {getButtons(dispatch, user, setShowRegister)}
          </div>
        </div>
      </nav>
      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <p className="h2 text-center p-2">Register new user</p>
          <div className="form-body p-3">
            <Input type="email" placeholder="name@example.com" title="Email address" />
            <Input type="text" placeholder="Enter your name" title="Name" />
            <Input type="password" placeholder="Type your password..." title="Password" />
          </div>
          <button className="btn btn-success" onClick={() => alert('Нажал в модалке')}>Register</button>
        </Modal>
      )}
    </>
  );
}

function getLinks(user: TUserData) {
  const baseLinks = [
    <NavigationLink linkData={pages.HOME} key={0}/>,
    <NavigationLink linkData={pages.ABOUT} key={1}/>,
  ];
  if (user) {
    baseLinks.push(<NavigationLink linkData={pages.CABINET} key={3}/>);
  }
  return baseLinks;
}

function getButtons(dispatch: Dispatch<unknown>, user: TUserData, setShowRegister: (set: boolean) => void) {
  if (user) {
    return <button className="btn btn-outline-warning m-2" onClick={() => dispatch(setUser(null))}>Logout</button>;
  }
  return (
    <>
      <button className="btn btn-outline-success m-2" onClick={() => dispatch(setUser({ name: "Andrey"}))}>Login</button>
      <button className="btn btn-outline-info m-2" onClick={() => setShowRegister(true)}>Register</button>
    </>
  )
}
