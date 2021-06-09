import React, { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useViewport } from "../utilities";
import { small_screen_width, LINKS } from "./index";
import "./styles.scss";

const Navbar: FC = () => {
  const [nav, setNav] = useState(false);

  useEffect(() => {
    if (nav) {
      document.getElementById("myNav")!.style.width = "100%";
    } else {
      document.getElementById("myNav")!.style.width = "0%";
    }
  }, [nav]);

  const { width } = useViewport();

  return (
    <div>
      <div id="myNav" className="overlay">
        <div className="overlay-content">
          {LINKS.map((data) => {
            const { className, title, path } = data;
            return (
              <NavLink
                key={title}
                id="link"
                to={path}
                onClick={() => setNav(!nav)}
                activeClassName={className}
              >
                <div key={title} className="menu-content">
                  {title}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="nav">
        <div className="flex-between">
          <Link id="link" to="/">
            <div className="logo">iPoll</div>
          </Link>
          <div className="menus">
            {LINKS.map((data, index) => {
              const { className, title, path } = data;
              return (
                <NavLink
                  key={index}
                  id="link"
                  to={path}
                  activeClassName={className}
                >
                  <div key={index} className="menu">
                    {title}
                  </div>
                </NavLink>
              );
            })}
            <div
              className={
                width < small_screen_width ? "menu-icon" : "menu-hidden"
              }
              onClick={() => setNav(!nav)}
            >
              {nav ? <span>&#10006;</span> : <span>&#9776;</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
