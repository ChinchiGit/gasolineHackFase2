import React from "react";

const ProvinciaForm = ({setEleccionUsuario}) => {


    const handleSubmit = (e) => {
      e.preventDefault();
      const objetoEleccion ={
        provinciaElegida: e.target.provincia.value,
        combustibleElegido: e.target.combustible.value
      };
  
      // Imprime los valores seleccionados en la consola
      console.log(objetoEleccion);
      setEleccionUsuario(objetoEleccion);
  
      // Resto de la lógica del envío del formulario
    };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="provincia">Selecciona una provincia:</label>
        <select name="provincia" id="provincia" required>
          <option value="ARABA/ÁLAVA">Álava</option>
          <option value="ALBACETE">Albacete</option>
          <option value="ALICANTE">Alicante</option>
          <option value="ALMERÍA">Almería</option>
          <option value="ASTURIAS">Asturias</option>
          <option value="ÁVILA">Ávila</option>
          <option value="BADAJOZ">Badajoz</option>
          <option value="BALEARS (ILLES)">Baleares</option>
          <option value="BARCELONA">Barcelona</option>
          <option value="BURGOS">Burgos</option>
          <option value="CÁCERES">Cáceres</option>
          <option value="CÁDIZ">Cádiz</option>
          <option value="CANTABRIA">Cantabria</option>
          <option value="CASTELLÓN / CASTELLÓ">Castellón</option>
          <option value="CEUTA">Ceuta</option>
          <option value="CIUDAD REAL">Ciudad Real</option>
          <option value="CÓRDOBA">Córdoba</option>
          <option value="CORUÑA (A)">La Coruña</option>
          <option value="CUENCA">Cuenca</option>
          <option value="GIRONA">Girona</option>
          <option value="GRANADA">Granada</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="GIPUZKOA">Guipúzcoa</option>
          <option value="HUELVA">Huelva</option>
          <option value="HUESCA">Huesca</option>
          <option value="JAÉN">Jaén</option>
          <option value="LEÓN">León</option>
          <option value="LLEIDA">Lleida</option>
          <option value="RIOJA (LA)">La Rioja</option>
          <option value="LUGO">Lugo</option>
          <option value="MADRID">Madrid</option>
          <option value="MÁLAGA">Málaga</option>
          <option value="MURCIA">Murcia</option>
          <option value="NAVARRA">Navarra</option>
          <option value="OURENSE">Ourense</option>
          <option value="PALENCIA">Palencia</option>
          <option value="PALMAS (LAS)">Las Palmas</option>
          <option value="PONTEVEDRA">Pontevedra</option>
          <option value="SALAMANCA">Salamanca</option>
          <option value="SANTA CRUZ DE TENERIFE">Santa Cruz de Tenerife</option>
          <option value="SEGOVIA">Segovia</option>
          <option value="SEVILLA">Sevilla</option>
          <option value="SORIA">Soria</option>
          <option value="TARRAGONA">Tarragona</option>
          <option value="TERUEL">Teruel</option>
          <option value="TOLEDO">Toledo</option>
          <option value="VALENCIA / VALÈNCIA">Valencia</option>
          <option value="VALLADOLID">Valladolid</option>
          <option value="BIZKAIA">Vizcaya</option>
          <option value="ZAMORA">Zamora</option>
          <option value="ZARAGOZA">Zaragoza</option>
        </select>

        <label htmlFor="combustible">Elige tu combustible:</label>
        <select name="combustible" id="combustible" required>
          <option value="Precio Gasoleo A">Diesel</option>
          <option value="Precio Gasolina 95 E5">Gasolina</option>
        </select>

        <button id="buscar" type="submit" value="Buscar">BUSCAR</button>
      </form>

   

    </>
  );
};

export default ProvinciaForm;
