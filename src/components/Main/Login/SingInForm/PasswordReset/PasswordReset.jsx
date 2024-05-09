// PasswordReset.jsx

import React, { useState } from 'react';
import { UserAuth } from '../../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import "./PasswordReset.css"


const PasswordReset = () => {
  const { resetPassword} = UserAuth();
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);



  const handleResetPassword = async () => {
    setResetSent(await resetPassword(email))
  };
  

  return (
    <section>
      <h2>Recuperar Contraseña</h2>
      <article id="reset">
        {resetSent ? (
          <>
          <p>Se ha enviado un correo electrónico a <b>{email}</b> con instrucciones para restablecer tu contraseña.</p>
          <button ><Link to ="/" >Volver</Link></button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '200px',
                height: '25px',
                marginBottom: '15px',
              }}
            />
            <button onClick={handleResetPassword}>Enviar correo de recuperación</button>
          </>
        )}
      </article>
    </section>
  );
};

export default PasswordReset;
