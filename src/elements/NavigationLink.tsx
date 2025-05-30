import { NavLink } from "react-router-dom";

type TProps = {
  linkData: {
    title: string,
    to: string,
  },
};

export function NavigationLink({ linkData }: TProps) {
  return (
    <li className="nav-item" key={linkData.title}>
      <NavLink
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        to={linkData.to}
      >{linkData.title}</NavLink>
    </li>
  );
}
