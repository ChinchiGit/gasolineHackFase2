import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserAuth } from "../../../context/AuthContext";
import "./Nav.css"


const Nav = () => {
  const { user } = UserAuth();

  return (
    <>
      <nav>

        <div>
          <Link to='/login'><img id="canIcon" src="/assets/img/nav_icon01.png" alt="Logo GasolineHack" /></Link>
        </div>
        <div id="desplegable">
          <input type="checkbox" id="menu" />
          <label htmlFor="menu" id="menu-icon">☰</label>
          <ul>
            <li ><Link to='/home'>HOME</Link></li>
            <li ><Link to='/cercana'>GASOLINERA MAS CERCANA</Link></li>
            <li ><Link to='/provincia'>BUSCAR POR PROVINCIA</Link></li>
            <li ><Link to='/radio'>BUSCAR POR RADIO</Link></li>
            {user &&
              <>
                <li><Link to='/misgasolineras'>MIS GASOLINERAS</Link></li>
                <li><Link to='/logout'>LOGOUT</Link></li>
              </>
            }
          </ul>
        </div>
      </nav>

    </>
  )
};

export default Nav;

