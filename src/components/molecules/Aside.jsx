import React, { useContext, useState } from "react";
import { AuthContext as Context } from "../../providers/AuthProvider";
import Button from "../atoms/Button.jsx";
import "./Aside.scss";

const avatar =
  "https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png";

const Aside = () => {
  const { onSignOut } = useContext(Context);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => setShowMenu(!showMenu);

  return (
    <aside className="aside">
      <div className="aside__profile">
        <img
          className="aside__profile-image"
          src={avatar}
          alt="avatar"
          onClick={handleShowMenu}
        />
        {showMenu && (
          <div className="aside__profile-menu">
            <Button onClick={() => onSignOut()}>Salir</Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Aside;
