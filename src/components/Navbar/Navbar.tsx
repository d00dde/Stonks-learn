import { Link } from "react-router-dom";
import { NavigationLink } from "../../elements/NavigationLink.tsx";
import { GoogleLogin } from "../GoogleAuth.tsx";
import { pages } from "../Router.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { useDispatch } from "react-redux";
import { setTable } from "../../store/appSlice.ts";
import "./Navbar.css";


export function Navbar() {
  const { user, table } = useAppSelector((state) => state.appData);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container d-flex ms-auto ">
          <Link className="navbar-brand" to="/">
            <div className="logo"></div>
          </Link>
          <div className="collapse navbar-collapse nav-links" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {getLinks(!!user)}
            </ul>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                {table === "words-v2" ? "Dictionary" : "Custom"}
              </button>
              <ul className="dropdown-menu bg-success">
                <li><a className="dropdown-item" href="#" onClick={() => dispatch(setTable("words-v2"))} key="words-v2">Dictionary</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => dispatch(setTable("words"))} key="words">Custom</a></li>
              </ul>
            </div>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <GoogleLogin/>
        </div>
      </nav>
    </>
  );
}

function getLinks(isLogged: boolean) {
  const baseLinks = [
    <NavigationLink linkData={pages.WORDS} key={0}/>,
    <NavigationLink linkData={pages.VERBS} key={2}/>,
  ];
  if (isLogged) {
    baseLinks.push(<NavigationLink linkData={pages.SET_WORDS} key={3}/>);
    baseLinks.push(<NavigationLink linkData={pages.ADD_WORDS} key={4}/>);
    baseLinks.push(<NavigationLink linkData={pages.SET_VERBS} key={5}/>);
  }
  return baseLinks;
}
