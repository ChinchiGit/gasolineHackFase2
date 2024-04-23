import React, { useState, useEffect, useRef  } from "react";
import { Link } from 'react-router-dom';
import { UserAuth } from "../../../context/AuthContext";
import "./Nav.css"


const Nav = () => {
  const { user } = UserAuth();
  const [isChecked, setIsChecked] = useState(false);
  const timerRef = useRef();

  const handleInputChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      timerRef.current = setTimeout(() => {
        setIsChecked(false);
      }, 6000);
    } else {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current); // Limpiar el temporizador al desmontar el componente
  }, []);

  return (
    <>
      <nav onMouseEnter={handleMouseEnter}>

        <div>
          <Link to='/login'><img id="canIcon" src="/assets/img/nav_icon01.png" alt="Logo GasolineHack" /></Link>
        </div>
        <div id="desplegable">
          <input type="checkbox" id="menu" checked={isChecked} onChange={handleInputChange}/>
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

