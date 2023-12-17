import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Cercana from "./Cercana/Cercana";
import ProvinciaContainer from "./ProvinciaContainer/ProvinciaContainer";
import RadioContainer from "./RadioContainer/RadioContainer";
import DetailsContainer from "./DetailsContainer/DetailsContainer";
import MisGasolinerasContainer from "./MisGasolinerasContainer/MisGasolinerasContainer";
import LogOut from "./LogOut/LogOut";


const Main = () => {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/cercana" element={<Cercana/>} />
          <Route path="/provincia" element={<ProvinciaContainer/>} />
          <Route path="/radio" element={<RadioContainer/>} />
          <Route path="/detalles/:id" element={<DetailsContainer/>} />
          <Route path="/misgasolineras" element={<MisGasolinerasContainer/>} />
          <Route path="/logout" element={<LogOut/>} />
          <Route path="/*" element={<Navigate to={"/"} />} />
          
        </Routes>
      </main>
    </>
  );


};

export default Main;
