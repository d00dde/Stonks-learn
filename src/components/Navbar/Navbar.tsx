import type { Dispatch } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTractor } from "@fortawesome/free-solid-svg-icons";
import { NavigationLink } from "../../elements/NavigationLink.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser, type UserData } from "../../store/userSlice";
import "./Navbar.css";
import { pages } from "../Router.tsx";


export function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userData.user);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid container">
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faTractor} className="logo"/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {getLinks(user)}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                 aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          {getButtons(dispatch, user)}
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

function getLinks(user: UserData) {
  const baseLinks = [
    <NavigationLink linkData={pages.HOME} key={0}/>,
    <NavigationLink linkData={pages.ABOUT} key={1}/>,
  ];
  if (user) {
    baseLinks.push(<NavigationLink linkData={pages.CABINET} key={3}/>);
  }
  return baseLinks;
}

function getButtons(dispatch: Dispatch<unknown>, user: UserData) {
  if (user) {
    return <button className="btn btn-outline-warning m-2" onClick={() => dispatch(setUser(null))}>Logout</button>;
  }
  return (
    <>
      <button className="btn btn-outline-success m-2" onClick={() => dispatch(setUser({ name: "Andrey"}))}>Login</button>
      <button className="btn btn-outline-info m-2" >Register</button>
    </>
  )
}
