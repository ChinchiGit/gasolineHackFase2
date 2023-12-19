import React, { useState } from "react";

const RadioForm = ({setEleccionUsuario}) => {

  //ESTADO PARA MOSTRAR RADIO EN PANTALLA MIENTRAS EL USUARIO SELECCIONA
  const [rangeValue, setRangeValue] = useState(10);
  const [fuelType, setFuelType] = useState('Precio Gasoleo A');

  const handleRangeChange = (e) => {
    setRangeValue(parseInt(e.target.value, 10));
  };

  const handleFuelChange = (e) => {
    setFuelType(e.target.value);
  };
    
  //MANDAR ELECCION DEL USUARIO AL ESTADO DE RADIOCONTAINER
  const handleSubmit = (e) => {
    e.preventDefault();
    const objetoEleccion = {
      radio: rangeValue, 
      combustible:fuelType}

    // Imprime los valores seleccionados en la consola
    console.log(objetoEleccion);
    setEleccionUsuario(objetoEleccion);

    // Resto de la lógica del envío del formulario
  };


  return (
    <>
      <label>
        Radio de búsqueda: 
        
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={rangeValue}
          onChange={handleRangeChange}
        />
      </label>
      <span>{rangeValue} Km. </span>

      <label>
        Tipo de combustible:   
        <select name="combustibleElegido" onChange={handleFuelChange} required>
          <option value="Precio Gasoleo A">Diesel</option>
          <option value="Precio Gasolina 95 E5">Gasolina</option>
        </select>
      </label>

      <button type="submit" onClick={handleSubmit}>
        Enviar
      </button>
    </>

        );
};

export default RadioForm;
