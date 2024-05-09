import React from "react";
import "./Spinner.css"

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <img src="../../../assets/img/petrol.gif" alt="Gasoline Spinner" />
        <h4>Cargando datos de más de 10.000 gasolineras...</h4>
        <img src="../../../assets/img/logo_spinner.png" alt="GasolineHack Logo" />
      </div>
    </>
  );
};

export default Spinner;
