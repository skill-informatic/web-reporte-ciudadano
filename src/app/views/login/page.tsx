"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import LoadingComponent from "@/app/components/LoadingComponent";
import SnackbarComponent from "@/app/components/SnackbarComponent";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Por favor llena todos los campos.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("reponse", response);
      setErrorMsg("");

      //  if (!response) {
      //     showAlert(
      //       "No se encontró información",
      //       "Comunícate con atención al cliente"
      //     );
      //     setIsLoading(false);
      //     return;
      //   }
      // Redirige a otra página o muestra mensaje
      alert("Inicio de sesión exitoso");
      setIsLoading(false);
      return;
    } catch (error: unknown) {
      console.error(error);
      setErrorMsg("Credenciales incorrectas o error de conexión.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.bg_fond}>
      <div className={styles.bg_transparent}>
        <div className={styles.container}>
          <form className={styles.loginBox} onSubmit={handleLogin}>
            <h1 className={styles.title}>
              Reporte <br /> CiudadanoMX
            </h1>
            <h2>Iniciar Sesión</h2>

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLoading ? (
              <LoadingComponent text="Create By Mario Cortez" />
            ) : (
              <button type="submit">Iniciar</button>
            )}
            {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          </form>
          <SnackbarComponent
            text="Error al iniciar sesion"
            type="error"
            open={true}
          />
        </div>
      </div>
    </div>
  );
}
