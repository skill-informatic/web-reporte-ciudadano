"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Por favor llena todos los campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMsg("");
      // Redirige a otra página o muestra mensaje
      alert("Inicio de sesión exitoso");
    } catch (error: unknown) {
      console.error(error);
      setErrorMsg("Credenciales incorrectas o error de conexión.");
    }
  };

  return (
    <div className={styles.bg_fond}>
      <div className={styles.bg_transparent}>
        <div className={styles.container}>
          <form className={styles.loginBox} onSubmit={handleLogin}>
            <h1>
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

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}

            <button type="submit">Iniciar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
