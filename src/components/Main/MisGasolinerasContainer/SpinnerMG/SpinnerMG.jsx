import React from "react";
import { UserAuth } from "../../../../context/AuthContext"
import "./SpinnerMG.css"


const SpinnerMG = () => {
  const { user } = UserAuth();
  return (
    <>
      <div className="spinner">
        <img src="../../../../../assets/img/reserva.gif" alt="Gasoline Spinner" />
        <h4>Cargando los datos de las gasolineras favoritas de {user.displayName}...</h4>
        <img src="../../../../../assets/img/logo_spinner.png" alt="GasolineHack Logo" />
      </div>
    </>
  );
};

export default SpinnerMG;
