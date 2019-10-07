import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/loginbg.jpg";
import "./Login.scss";
import Button from "../atoms/Button";
import { AuthContext as Context } from "../../providers/AuthProvider";
import VanillaTilt from "vanilla-tilt";

const Login = () => {
  const { onLogin, error } = useContext(Context);
  const tiltRef = useRef();

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 5,
      speed: 200,
      glare: true,
      "max-glare": 0.25
    });

    return () => tiltRef.current.vanillaTilt.destroy();
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;

    const data = {
      email: form.email.value,
      password: form.password.value
    };

    onLogin(data);
  };

  return (
    <div className="login">
      <div ref={tiltRef} className="login__tilt">
        <img className="login__image" src={image} alt="Login background" />
      </div>
      <div className="login-aside">
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Iniciar sesión</h3>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contrasena"
            required
          />
          <Button type="submit" theme="login__button">
            Entrar
          </Button>
          {error && error.message && (
            <p style={{ color: "red" }}>{error.message}</p>
          )}
        </form>
        <div className="login-comments">
          <h3>Comentarios de visitas</h3>

          <Link to={"/comments"}>Agregar y ver comentarios del servicio</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
