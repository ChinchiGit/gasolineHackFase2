import React from "react";
import "./Footer.css";
"../../../assets/img/logo_footer.png"

const Footer = () => {
  return(
    <>
      <footer>
        <div id="footerSup">
          <img src="../../../assets/img/logo_footer.png" alt="logo footer GasolineHack" />
          <div id="contacto">
            <span><a href="http://www.linkedin.com/in/c-chinchilla" target="blank">Desarrollado por C. Chinchilla</a></span>
            <span>✉️ contacto@gasolinehack.es </span>
          </div>
          
        </div>
        <div id="footerInf">
            <span>Datos provenientes de: <a href="https://www.miteco.gob.es/es.html" target="blank">Min. Transición Ecológica y Reto Demográfico</a></span>         
        </div>
      </footer>
    </>
  );
};

export default Footer;
