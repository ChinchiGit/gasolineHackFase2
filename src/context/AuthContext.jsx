import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../src/config/firebaseAuth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const emailPasswordSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log('Usuario ha iniciado sesión:', user);
      })
      .catch((error) => {
        alert("Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña e inténtalo nuevamente.")
        console.error('Error al iniciar sesión con correo/contraseña:', error.message);
      });
  };

  const emailPasswordSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log('Usuario se ha registrado:', user);
      })
      .catch((error) => {

        console.error('Error al registrarse con correo/contraseña:', error.message);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  const resetPassword = async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        return true
      } catch (error) {
        alert(error.message);
        return false
      }
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Usuario', currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, emailPasswordSignIn, emailPasswordSignUp, logOut, resetPassword, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

