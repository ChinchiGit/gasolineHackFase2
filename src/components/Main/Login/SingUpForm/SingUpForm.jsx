import React from "react";
import { useState } from "react";
import { UserAuth } from "../../../../context/AuthContext";
import "./SingUpForm.css";

const SingUpForm = () => {
  const { emailPasswordSignUp } = UserAuth();
  const [inputs, setInputs] = useState({
    mail: "",
    pass: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);






  const handleInputs = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado con el nuevo valor del input
    setInputs({
      ...inputs,
      [name]: value,
    }

    );
  };

  function validarEmail(email) {
    // Expresión regular para validar el formato de un correo electrónico
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Comprobar si el correo electrónico coincide con la expresión regular
    return regex.test(email);
  };

  function validarPassword(pasword) {
    // Expresión regular para validar la contraseña
    var regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    // Comprobar si la contraseña coincide con la expresión regular
    return regex.test(pasword);
  }

  //Mostrar contraseña y ocultar
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleSubmit() {
    if (validarEmail(inputs.mail) == false) {
      alert("El formato del mail no es correcto");
    } else if (validarPassword(inputs.pass) == false) {
      alert("La contraseña debe contener al menos 6 caracteres, un número y una mayúscula")
    }
    else if (inputs.pass !== inputs.confirm) {
      alert("Las contraseñas no coinciden")
    } else {
      emailPasswordSignUp(inputs.mail, inputs.pass);
      setInputs({
        mail: "",
        pass: "",
        confirm: ""
      });
    }
  }

  return (
    <>
      <article id="singUp">
        <div>
          <input type="email" name="mail" id="log" placeholder="Introduce tu mail" onChange={handleInputs} style={{
            width: '200px',
            height: '25px',
            marginBottom: '10px',
          }} />
        </div>
        <div>
          <input type={showPassword ? "text" : "password"} name="pass" className="log" placeholder="Crea tu contraseña" onChange={handleInputs}  style={{
          width: '200px',
          height: '25px',
          marginBottom: '10px',
        }}/>
        </div>
        <div>
          <input type={showPassword ? "text" : "password"} name="confirm" className="log" placeholder="Confirma tu contraseña" onChange={handleInputs}  style={{
          width: '178px',
          height: '25px',
          marginRight: '5px'
        }}/>
          <span onClick={handleTogglePasswordVisibility} style={{
            cursor: 'pointer'
          }}>👀</span>
        </div>
        <div>
          <button onClick={handleSubmit}>Registrar</button>
        </div>

      </article>
    </>
  );
};

export default SingUpForm;
