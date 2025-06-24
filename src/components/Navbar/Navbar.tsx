import { Link } from "react-router-dom";
import { NavigationLink } from "../../elements/NavigationLink.tsx";
import { GoogleLogin } from "../GoogleAuth.tsx";
import { pages } from "../Router.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import "./Navbar.css";


export function Navbar() {
  const user = useAppSelector((state) => state.appData.user);
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
              {getLinks(!!user)}
            </ul>
          </div>
          <GoogleLogin />
        </div>
      </nav>
    </>
  );
}

function getLinks(isLogged: boolean) {
  const baseLinks = [
    <NavigationLink linkData={pages.WORDS} key={0}/>,
    <NavigationLink linkData={pages.PHRASES} key={1}/>,
  ];
  if(isLogged) {
    baseLinks.push(<NavigationLink linkData={pages.SET_WORDS} key={2}/>);
    baseLinks.push(<NavigationLink linkData={pages.SET_PHRASES} key={3}/>);
  }
  return baseLinks;
}
